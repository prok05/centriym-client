import Image from 'next/image';
import logoPath from '../../../public/img/logo.png';

export function MainLogo() {
    return (
        <div className="flex justify-center pb-10 pt-10">
            <Image className="h-auto max-w-full rounded-lg" src={logoPath} alt="Логотип" height={90}/>
        </div>
    )
}