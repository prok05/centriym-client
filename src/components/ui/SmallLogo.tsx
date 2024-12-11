import Image from 'next/image';
import logoPath from '../../../public/img/logo.png';
import logoVector from '../../../public/img/logoVector.svg';

export function SmallLogo() {
    return (
        <div className="flex justify-center">
            <Image className="h-auto max-w-full" src={logoVector} alt="Логотип" height={35}/>
        </div>
    )
}