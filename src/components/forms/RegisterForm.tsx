import Input from "@/components/ui/Input";
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";
import {SelectRole} from "@/components/forms/SelectRole";

export default function RegisterForm() {
    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
            <form className="rounded px-8 pt-6 pb-8 mb-4">
                <LoginRegisterButtons/>
                <div className="mb-2 relative">
                    <label className="text-center block mb-2 text-sm" htmlFor="telNo">Номер телефона</label>
                    <Input id="telNo" name="telNo" type="tel" placeholder="Телефон"/>
                </div>
                <div className="mb-2 relative">
                    <label className="text-center block mb-2 text-sm" htmlFor="password">Придумайте пароль</label>
                    <Input id="password" name="password" type="password" placeholder="Пароль"/>
                </div>
                <div className="mb-2 relative">
                    <label className="text-center block mb-2 text-sm" htmlFor="password-confirm">Подтвердите пароль</label>
                    <Input id="password-confirm" name="password-confirm" type="password" placeholder="Пароль"/>
                </div>
                <SelectRole/>
                <div className="mt-8 flex justify-center">
                    <button type="submit"
                        className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main f">РЕГИСТРАЦИЯ
                    </button>
                </div>
            </form>
        </div>
    );
}