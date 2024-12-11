import dashboardStar from "../../../public/img/dashboard-star.png";
import Image from 'next/image';
import Typography from '@mui/material/Typography';

export function DashboardPanel() {
    return (
        <div
            className="text-center h-full bg-purple-pale pt-10 rounded-lg shadow-md flex flex-col justify-evenly items-center">
            <div>
                <Typography variant="h2" mb={5} color="#6F38E3" gutterBottom>
                    Добро пожаловать!
                </Typography>
                <Typography variant="h5" mb={3} color="#2F2F2F" gutterBottom>
                    Позднее здесь будут отображаться твои успехи и достижения.
                </Typography>
                <Typography variant="h5" mb={5} color="#2F2F2F" gutterBottom>
                    Чтобы попасть на урок, перейди в раздел «Уроки» в меню слева.
                </Typography>
                <Typography variant="h4" color="#6F38E3" gutterBottom>
                    Успехов в обучении!
                </Typography>
            </div>
            <div className="max-h-52">
                <Image
                    src={dashboardStar}
                    alt="Баннер"
                    className="max-w-full max-h-full object-contain"/>
            </div>
        </div>
    )
}