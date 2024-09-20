'use client'

import Input from "@/components/ui/Input";
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import {SelectRole} from "@/components/forms/SelectRole";
import PhoneInput from "react-phone-number-input/input";
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation'
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();

    const [phone, setPhone] = useState();
    const [isRegisterOk, setIsRegisterOk] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);

            if (formData.get("password") !== formData.get("password-confirm")) {
                throw new Error("Пароли должны совпадать.")
            }

            const formPhone = formData.get("phone")?.toString()
            const phone = formPhone?.replaceAll(" ", "").replace("+", "")

            const data = {
                "phone": phone,
                "password": formData.get("password"),
                "role": formData.get("role"),
            }

            const response = await fetch('http://localhost:8080/api/v1/register', {
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
            {isRegisterOk ?
                <div className="px-6 py-4 mx-auto w-full max-w-sm rounded-3xl flex flex-col items-center">
                    <p className="text-center font-semibold mb-3">Поздравляем с успешной регистрацией на платформе!</p>
                    <p className="text-center mb-5">Теперь Вы можете авторизироваться.</p>
                    <Link className="w-auto text-white bg-purple-main rounded-xl py-2 px-9" href="/login">Войти</Link>
                </div>
                :
                <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
                    <LoginRegisterButtons/>
                    <div className="mb-2 relative">
                        <label className="text-center block mb-2 text-sm" htmlFor="telNo">Номер телефона</label>
                        <PhoneInput
                            id="telNo"
                            className="shadow appearance-none rounded-full w-full py-2 px-14 text-[#6B6B6B] leading-tight focus:outline-none focus:shadow-outline text-center"
                            placeholder="Номер телефона"
                            name="phone"
                            value={phone}
                            onChange={setPhone}
                            country="RU"
                            withCountryCallingCode
                            international/>
                    </div>
                    <div className="mb-2 relative">
                        <label className="text-center block mb-2 text-sm" htmlFor="password">Придумайте пароль</label>
                        <Input id="password" name="password" type="password" placeholder="Пароль"/>
                    </div>
                    <div className="mb-2 relative">
                        <label className="text-center block mb-2 text-sm" htmlFor="password-confirm">Подтвердите
                            пароль</label>
                        <Input id="password-confirm" name="password-confirm" type="password" placeholder="Пароль"/>
                    </div>
                    <SelectRole/>
                    {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
                    <div className="mt-8 flex justify-center">
                        <button type="submit"
                                className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main uppercase">
                            {isLoading ? 'Подождите...' : 'Регистрация'}
                        </button>
                    </div>
                </form>
            }

        </div>
    );
}