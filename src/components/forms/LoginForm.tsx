'use client'

import Input from "@/components/ui/Input";
import Image from 'next/image';
import loginIcon from '../../../public/icons/login-icon.svg'
import passIcon from '../../../public/icons/pass-icon.svg'
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import PhoneInput from "react-phone-number-input/input";
import {FormEvent, useState} from "react";

export default function LoginForm() {
    const [phone, setPhone] = useState();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);

            const formPhone = formData.get("phone")?.toString()
            const phone = formPhone?.replaceAll(" ", "").replace("+", "")

            const data = {
                "phone": phone,
                "password": formData.get("password")
            }

            const response = await fetch('http://localhost:8080/api/v1/login', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data),
            })

            switch (response.status) {
                case 404:
                    throw new Error("В Alpha CRM пользователь с таким номера телефона не был найден. Перепроверьте номер телефона.")
                case 409:
                    throw new Error("Пользователь с таким номера телефона уже зарегистрирован.")
                case 201:
                    setIsRegisterOk(true)
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }


    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
            <form className="rounded px-8 pt-6 pb-8 mb-4">
                <LoginRegisterButtons/>
                <div className="mb-4 relative">
                    <PhoneInput
                        id="telNo"
                        className="shadow appearance-none rounded-full w-full py-2 px-14 text-[#6B6B6B] leading-tight focus:outline-none focus:shadow-outline text-center"
                        placeholder="Номер телефона"
                        value={phone}
                        onChange={setPhone}
                        country="RU"
                        withCountryCallingCode
                        international/>
                    <Image className="absolute left-[16px] top-0 bottom-0 my-auto mx-0"
                           src={loginIcon}
                           alt="Logic Icon"
                           width={21}
                           height={21}
                    />
                </div>
                <div className="mb-4 relative">
                    <Input name="password" type="password" placeholder="Пароль"/>
                    <Image className="absolute left-[18px] top-0 bottom-0 my-auto mx-0"
                           src={passIcon}
                           alt="Password Icon"
                           width={16}
                           height={21}
                    />
                </div>
                {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
                <div className="mt-8 flex justify-between">
                    <button className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main f"
                            type="submit">ВОЙТИ
                    </button>
                    <button className="text-xs text-[#6B6B6B] underline">Забыли пароль?</button>
                </div>
            </form>
        </div>
    );
}