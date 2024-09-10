import Image from 'next/image';
import logoPath from '../../../public/img/logo.png';

export function SmallLogo() {
    return (
        <div className="flex justify-center pb-10 pt-10">
            <Image className="h-auto max-w-full" src={logoPath} alt="Логотип" height={50}/>
        </div>
    )
}