import Input from "@/components/ui/Input";
import Image from 'next/image';
import loginIcon from '../../../public/icons/login-icon.svg'
import passIcon from '../../../public/icons/pass-icon.svg'
import {LoginRegisterButtons} from "@/components/forms/LoginRegisterButtons";

export default function LoginForm() {
    return (
        <div className="my-0 mx-auto bg-purple-sec w-full max-w-sm rounded-3xl">
            <form className="rounded px-8 pt-6 pb-8 mb-4">
                <LoginRegisterButtons />
                <div className="mb-4 relative">
                    <Input name="telNo" type="tel" placeholder="Номер телефона"/>
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
                <div className="mt-8 flex justify-between">
                    <button className="py-1 px-6 rounded-2xl border-0 text-white text-xl font-bold bg-purple-main f">ВОЙТИ</button>
                    <button className="text-xs text-[#6B6B6B] underline">Забыли пароль?</button>
                </div>
            </form>
        </div>
    );
}