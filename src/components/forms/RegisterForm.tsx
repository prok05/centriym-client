'use client'

import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import {SelectRole} from "@/components/forms/SelectRole";
import {FormEvent, useState} from "react";
import Link from "next/link";
import {Alert, Button, FormHelperText, IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { MuiTelInput } from 'mui-tel-input'
import { useRouter } from 'next/navigation'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function RegisterForm() {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);
    const [isRegisterOk, setIsRegisterOk] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const router = useRouter()

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
        if (e.target.value !== passwordConfirm) {
            setPasswordMismatchError(true);
        } else {
            setPasswordMismatchError(false);
        }
    };

    const handleConfirmPasswordChange = (e:any) => {
        setPasswordConfirm(e.target.value);
        if (e.target.value !== password) {
            setPasswordMismatchError(true);
        } else {
            setPasswordMismatchError(false);
        }
    };

    const handlePhoneChange = (newPhone: any) => {
        setPhone(newPhone)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);

            if (passwordMismatchError) {
                return
            }

            const formPhone = formData.get("phone")?.toString()
            const phone = formPhone?.replaceAll(" ", "").replace("+", "")

            const data = {
                "phone": phone,
                "password": password,
                "role": formData.get("role"),
            }
            const dataLOG = {
                "phone": phone,
                "password": password,
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data),
            })


            // const dataResp = await response.json()
            switch (response.status) {
                case 404:
                    throw new Error("В Alpha CRM пользователь с таким номера телефона не был найден. Перепроверьте номер телефона.")
                case 409:
                    throw new Error("Пользователь с таким номера телефона уже зарегистрирован.")
                case 201:
                {
                    setIsLoading(false);
                    setIsRegisterOk(true)
                    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: "POST",
                        body: JSON.stringify(dataLOG),
                        credentials: "include"
                    })
                    router.push("/dashboard")
                }


            }
        } catch (error) {
            // @ts-ignore
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
            {isRegisterOk ?
                <div className="px-6 py-4 mx-auto w-full max-w-sm rounded-3xl flex flex-col items-center">
                    <Alert severity="success">Поздравляем с успешной регистрацией на платформе! Теперь Вы можете авторизироваться.</Alert>
                    <Link className="w-auto mt-4 text-white bg-purple-main rounded-xl py-2 px-9" href="/dashboard">Войти</Link>
                </div>
                :
                <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                    <LoginRegisterButtons/>
                    <div className="mb-4 relative">
                        <MuiTelInput
                            id="phone"
                            label="Телефон"
                            fullWidth
                            name="phone"
                            getFlagElement={(isoCode, { imgProps, countryName, isSelected }) => {
                                return <LocalPhoneIcon />
                            }}
                            disableDropdown
                            onChange={handlePhoneChange}
                            unknownFlagElement={<LocalPhoneIcon />}
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
                                error={passwordMismatchError}
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                id="password"
                                name="password"
                                label="Пароль"
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
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
                            {passwordMismatchError ? <FormHelperText id="component-error-text">Пароли не совпадают</FormHelperText> : ""}

                        </FormControl>
                    </div>
                    <div className="mb-6 relative">
                        {/*<label className="text-center block mb-2 text-sm" htmlFor="password-confirm">Подтвердите*/}
                        {/*    пароль</label>*/}
                        {/*<Input id="password-confirm" name="password-confirm" type="password" placeholder="Пароль"/>*/}
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel
                                htmlFor="password-confirm"
                                sx={{
                                    '&.MuiInputLabel-root': {
                                        color: '#202020', // <------------------ label-color by default
                                    },
                                    '&.MuiInputLabel-root.Mui-focused': {
                                        color: '#202020', // <------------------ label-color on focus
                                    },
                                }}
                            >Подтвердите пароль</InputLabel>
                            <OutlinedInput
                                id="password-confirm"
                                error={passwordMismatchError}
                                label="Подтвердите пароль"
                                name="password-confirm"
                                required
                                onChange={handleConfirmPasswordChange}
                                fullWidth
                                type={showPasswordConfirm ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPasswordConfirm}
                                            edge="end"
                                        >
                                            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                sx={{
                                    backgroundColor: "white",
                                    '&.MuiOutlinedInput-root': {
                                        // '& fieldset': {
                                        //     borderColor: '#702DFF', // <------------------ outline-color by default
                                        // },
                                        '&:hover fieldset': {
                                            borderColor: '#702DFF', // <------------------ outline-color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#702DFF', // <------------------ outline-color on focus
                                        },
                                    },
                                }}
                            />
                            {passwordMismatchError ? <FormHelperText id="component-error-text">Пароли не совпадают</FormHelperText> : ""}
                        </FormControl>
                    </div>
                    <div className="mb-3">
                        <SelectRole/>
                    </div>

                    {error && <Alert severity="error">{error}</Alert>}
                    <div className="mt-6 flex justify-center">
                        {/*<button type="submit"*/}
                        {/*        className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main uppercase">*/}
                        {/*    {isLoading ? 'Подождите...' : 'Регистрация'}*/}
                        {/*</button>*/}
                        <LoadingButton
                            variant="contained"
                            disableElevation
                            loading={isLoading}
                            size="large"
                            fullWidth
                            type="submit"
                            sx={{
                                backgroundColor: "#702DFFFF",
                                fontWeight: "bold",
                                '&:hover': {
                                    backgroundColor: "#5122b5",
                                },
                            }}
                        >Регистрация</LoadingButton>
                    </div>

                </form>
            }

        </div>
    );
}