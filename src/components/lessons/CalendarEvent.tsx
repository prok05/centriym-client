import moment from 'moment';
import React from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button, {ButtonProps} from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Rating from '@mui/material/Rating';
import {Views} from "react-big-calendar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

moment.locale("ru");

const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    backgroundColor: "#702DFF",
    '&:hover': {
        backgroundColor: "#4a1daa",
    },
}));

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const labels: { [index: string]: string } = {
    1: 'Ужасно',
    2: 'Плохо',
    3: 'Сойдет',
    4: 'Хорошо',
    5: 'Отлично',
};

function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

// @ts-ignore
export function CalendarEvent({event, view, user}) {
    const [open, setOpen] = React.useState(false);
    const [openRating, setOpenRating] = React.useState(false);
    const [rate, setRate] = React.useState<number | null>(3);
    const [rateHover, setRateHover] = React.useState(-1);
    const [openRateSuccess, setOpenRateSuccess] = React.useState(false);
    const [openRateFail, setOpenRateFail] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleRatingOpen = () => {
        setOpenRating(true);
    };
    const handleRatingClose = () => {
        setOpenRating(false);
    };

    const lessonColor = () => {
        if (event.status === 1) {
            return "bg-green-200"
        } else if (event.status === 2) {
            return "bg-red-200"
        } else if (event.status === 3) {
            return "bg-gray-200"
        }
    }

    const EnterLessonBtn = () => {
        if (event.streaming) {
            return <ColorButton
                startIcon={<LoginIcon/>}
                variant="contained"
                onClick={() => {
                    window.open(event.streaming[0], '_blank')
                    if (user.user.role === 'student') {
                        setOpenRating(true)
                    }
                }}
                disabled={event.status === 3}>
                Войти в урок
            </ColorButton>
        } else {
            return <ColorButton
                startIcon={<LoginIcon/>}
                variant="contained"
                disabled>
                Войти в урок
            </ColorButton>
        }
    }

    const sendRating = async () => {
        console.log(event)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/rating`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                student_id: user.user.id,
                teacher_id: event.teacherIDs[0],
                lesson_id: event.id,
                lesson_date: event.start.toISOString(),
                rate: rate
            })
        })

        if (response.status === 409) {
            setOpenRating(false);
            setOpen(false);
            setOpenRateFail(true);
        }

        if (response.status === 201) {
            setOpenRating(false);
            setOpen(false);
            setOpenRateSuccess(true);
        }
    }

    return (
        <React.Fragment>
            <div
                onClick={handleClickOpen}
                className={`${lessonColor()} flex flex-col justify-center h-full ${view === Views.MONTH && 'rounded-2xl'} hover:brightness-90 transition duration-300`}>
                <div className="text-xs text-gray-700 text-center px-1">{event.title}</div>
                <div className="text-xs text-gray-700 text-center px-1">{event.hourStart} - {event.hourEnd}</div>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <div className="flex justify-between">
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        {event.title}. {moment(event.start).format("dddd, HH:mm")}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon/>
                    </IconButton>
                </div>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Тема</b>: {event.topic ? event.topic : "—"}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Домашняя работа</b>: {event.homework ? event.homework : "—"}
                    </Typography>
                    <Typography gutterBottom>
                        <b>Комментарий к уроку</b>: {event.note ? <i>{event.note}</i> : "—"}
                    </Typography>

                </DialogContent>
                <DialogActions className={user.user.role === "teacher" ? "flex justify-between" : ""}>
                    {user.user.role === "teacher" && <ColorButton variant="contained">Задать ДЗ</ColorButton>}
                    <EnterLessonBtn/>
                </DialogActions>
            </BootstrapDialog>

            {/*оценка уроков учеником*/}
            <BootstrapDialog
                onClose={handleRatingClose}
                aria-labelledby="rating-dialog"
                open={openRating}
            >
                <div className="flex justify-between">
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        Как прошел урок?
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleRatingClose}
                        sx={(theme) => ({
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon/>
                    </IconButton>

                </div>
                <DialogContent dividers>
                    <div className="flex flex-col items-center">
                        {rate !== null && (
                            <Typography sx={{mb: 1}}>
                                {labels[rateHover !== -1 ? rateHover : rate]}
                            </Typography>
                        )}
                        <Rating
                            name="size-medium"
                            size={"large"}
                            defaultValue={3}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setRate(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setRateHover(newHover);
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <ColorButton
                        variant="contained"
                        size={"small"}
                        onClick={sendRating}>
                        Ок
                    </ColorButton>
                </DialogActions>
            </BootstrapDialog>
            <div className="z-10000">
                <Snackbar
                    open={openRateSuccess}
                    onClose={() => setOpenRateSuccess(false)}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    autoHideDuration={2000}
                    TransitionComponent={Slide}
                    sx={{
                        zIndex: 100
                    }}
                >
                    <Alert
                        icon={<CheckRoundedIcon/>}
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        Спасибо за оценку!
                    </Alert>
                </Snackbar>

                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    open={openRateFail}
                    onClose={() => setOpenRateFail(false)}
                    autoHideDuration={2000}
                    TransitionComponent={Slide}
                >
                    <Alert
                        onClose={handleClose}
                        severity={"info"}
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        Вы уже оценили данный урок
                    </Alert>
                </Snackbar>
            </div>
        </React.Fragment>
    )
}