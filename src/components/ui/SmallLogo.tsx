import Image from 'next/image';
import logoPath from '../../../public/img/logo.png';

export function SmallLogo() {
    return (
        <div className="flex justify-center">
            <Image className="h-auto max-w-full" src={logoPath} alt="Логотип" height={35}/>
        </div>
    )
}