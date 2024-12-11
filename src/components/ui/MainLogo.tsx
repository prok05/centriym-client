import Image from 'next/image';
import logoPath from '../../../public/img/logo.png';
import logoVector from '../../../public/img/logoVector.svg';

export function MainLogo() {
    return (
        <div className="flex justify-center pb-10 pt-10">
            <Image className="h-auto max-w-full rounded-lg" src={logoVector} alt="Логотип" height={90}/>
        </div>
    )
}