'use client'

import Input from "@/components/ui/Input";
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import {SelectRole} from "@/components/forms/SelectRole";
import PhoneInput from "react-phone-number-input/input";
import {FormEvent, useState} from "react";

export default function RegisterForm() {
    const [phone, setPhone] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData(event.currentTarget);
            // const data = new FormData();

            if (formData.get("password") !== formData.get("password-confirm")) {
                console.log('пароли не совпадают!!')
                return
            }

            const formPhone = formData.get("phone")?.toString()
            const phone = formPhone?.replaceAll(" ", "").replace("+", "")

            const data = {
                "phone": phone,
                "password": formData.get("password"),
                "role": formData.get("role"),
            }

            // data.append("phone", phone)
            // data.append("password", formData.get("password"))
            // data.append("role", formData.get("role"))

            console.log(data)


            const response = await fetch('http://localhost:8080/api/v1/register', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(data),
            })

            const dataResp = await response.json()
            throw new Error(dataResp.error)
        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
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
        </div>
    );
}