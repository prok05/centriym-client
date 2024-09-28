'use client'

import Input from "@/components/ui/Input";
import Image from 'next/image';
import loginIcon from '../../../public/icons/login-icon.svg'
import passIcon from '../../../public/icons/pass-icon.svg'
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import PhoneInput from "react-phone-number-input/input";
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';
import {Alert, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {MuiTelInput} from "mui-tel-input";
import InputLabel from "@mui/material/InputLabel";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import FormControl from "@mui/material/FormControl";
import LockIcon from '@mui/icons-material/Lock';

export default function LoginForm() {
    const router = useRouter();

    const [phone, setPhone] = useState();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handlePhoneChange = (newPhone: any) => {
        setPhone(newPhone)
    }

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`)
            const formData = new FormData(event.currentTarget);

            const formPhone = formData.get("phone")?.toString()
            const phone = formPhone?.replaceAll(" ", "").replace("+", "")

            const data = {
                "phone": phone,
                "password": formData.get("password")
            }

            console.log(data)

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data),
                credentials: "include"
            })

            switch (response.status) {
                case 404:
                    throw new Error("Пользователь не найден.")
                case 403:
                    throw new Error("Неправильный номер телефона или пароль.")
                case 500:
                    throw new Error("Произошла ошибка на сервере. Повторите попытку позже.")
                case 200:
                    console.log('success')
                    router.push("/dashboard")
                    break
            }
        } catch (error) {
            // @ts-ignore
            setError(error?.message)
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
            <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                <LoginRegisterButtons/>
                <div className="mb-4 relative">
                    {/*<PhoneInput*/}
                    {/*    id="telNo"*/}
                    {/*    className="shadow appearance-none rounded-full w-full py-2 px-14 text-[#6B6B6B] leading-tight focus:outline-none focus:shadow-outline text-center"*/}
                    {/*    placeholder="Номер телефона"*/}
                    {/*    name="phone"*/}
                    {/*    value={phone}*/}
                    {/*    onChange={setPhone}*/}
                    {/*    country="RU"*/}
                    {/*    withCountryCallingCode*/}
                    {/*    international/>*/}
                    <MuiTelInput
                        id="phone"
                        label="Телефон"
                        fullWidth
                        name="phone"
                        defaultCountry="RU"
                        disableDropdown
                        onChange={handlePhoneChange}
                        value={phone}
                        sx={{
                            color: "black",
                            backgroundColor: "white",
                            '&.MuiTelInput-TextField': {
                                '&:hover fieldset': {
                                    borderColor: '#702DFF', // <------------------ outline-color on hover
                                },
                                '&.MuiTelInput-TextField fieldset': {
                                    borderColor: '#702DFF', // <------------------ outline-color on focus
                                },
                            },
                        }}
                    />
                </div>
                <div className="mb-4 relative">
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel
                            htmlFor="password"
                            sx={{
                                '&.MuiInputLabel-root': {
                                    color: '#202020', // <------------------ label-color by default
                                },
                                '&.MuiInputLabel-root.Mui-focused': {
                                    color: '#202020', // <------------------ label-color on focus
                                },
                            }}
                        >Пароль</InputLabel>
                        <OutlinedInput
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            id="password"
                            name="password"
                            label="Пароль"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            sx={{
                                backgroundColor: "white",
                                '&.MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: '#702DFF', // <------------------ outline-color on hover
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#702DFF', // <------------------ outline-color on focus
                                    },
                                },
                            }}
                        />
                    </FormControl>
                    {/*<Image className="absolute left-[18px] top-0 bottom-0 my-auto mx-0"*/}
                    {/*       src={passIcon}*/}
                    {/*       alt="Password Icon"*/}
                    {/*       width={16}*/}
                    {/*       height={21}*/}
                    {/*/>*/}
                </div>
                {error && <Alert severity="error">{error}</Alert>}
                <div className="mt-8 flex justify-between">
                    {/*<button className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main f"*/}
                    {/*        type="submit">ВОЙТИ*/}
                    {/*</button>*/}
                    <LoadingButton
                        variant="contained"
                        disableElevation
                        loading={isLoading}
                        loadingIndicator="Загрузка…"
                        size="large"
                        type="submit"
                        sx={{
                            backgroundColor: "#702DFFFF",
                            fontWeight: "bold",
                            '&:hover': {
                                backgroundColor: "#5122b5",
                            },
                        }}
                    >Войти</LoadingButton>
                    <button className="text-xs text-[#6B6B6B] underline">Забыли пароль?</button>
                </div>
            </form>
        </div>
    );
}