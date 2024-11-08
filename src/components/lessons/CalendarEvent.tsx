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
import {useRouter} from 'next/navigation'
import LoginIcon from '@mui/icons-material/Login';

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

// @ts-ignore
export function CalendarEvent({event}) {
    const router = useRouter()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
            return <ColorButton startIcon={<LoginIcon/>} variant="contained"
                                onClick={() => window.open(event.streaming[0], '_blank')}>
                Войти в урок
            </ColorButton>
        } else {
            return <ColorButton startIcon={<LoginIcon/>} variant="contained" disabled>
                Войти в урок
            </ColorButton>
        }
    }

    return (
        <React.Fragment>
            <div onClick={handleClickOpen} className={`${lessonColor()} rounded-full flex flex-col`}>
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
                            // position: 'absolute',
                            // right: 8,
                            // top: 8,
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
                <DialogActions>
                    <EnterLessonBtn/>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    )
}