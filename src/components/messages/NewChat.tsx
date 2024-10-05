import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";

export default function NewChat({setIsCreatingChat}) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

    }, []);

    return (
        <div className="p-5 absolute top-0 left-0 w-full rounded-xl h-full bg-white z-10 ">
            <div className="flex justify-between mb-10">
                <div>Новый чат</div>
                <button className="w-[26px] h-[23px]" onClick={() => setIsCreatingChat(prev => !prev)}><CloseIcon/>
                </button>
            </div>
            <div>
                <div>Список учителей</div>
            </div>
        </div>
    )
}