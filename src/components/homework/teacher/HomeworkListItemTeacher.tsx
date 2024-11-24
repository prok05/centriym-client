import React from 'react';
import {Button, Divider, Typography} from "@mui/material";
import {getStartAndEndDate, getSubjectName} from "@/utils/utils";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import moment from 'moment'
import Chip from '@mui/material/Chip';
import UploadHomeworkBtn from "@/components/homework/UploadHomeworkBtn";
import {grey} from "@mui/material/colors"
import {useQuery} from "@tanstack/react-query";
import LoadedFilesListStudent from "@/components/homework/student/LoadedFilesListStudent";
import LoadedFilesListTeacher from "@/components/homework/teacher/LoadedFilesListTeacher";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function HomeworkListItemTeacher({item}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function HomeworkStatus(status: number) {
        if (status === 3) {
            return <Chip label={"Не сдано"} sx={{bgcolor: grey}}  />
        } else if (status === 2) {
            return <Chip color="info" label={"На проверке"} />
        } else if (status === 1) {
            return <Chip color="success" label={"Сдано"} />
        }
    }

    return (
        <React.Fragment>
            <div key={item.id}
                 className="flex justify-between items-center p-4 border border-slate-200 rounded">
                <div className="flex flex-col w-4/5">
                    <Typography
                        variant="h5">{getSubjectName(item.subject_id)}: {moment(item.date).format("dddd, DD MMMM")}</Typography>
                    <Divider sx={{mb: 1}} />
                    <Typography variant="body1">Тема: {item.topic}</Typography>
                </div>
                <div>{HomeworkStatus(item.homework_status)}</div>
                <div>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        size="small"
                        sx={{bgcolor: "#702DFF", fontWeight: "bolder"}}
                    >Открыть
                    </Button>
                </div>
                <div>

                </div>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <div className="flex justify-between">
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        {getSubjectName(item.subject_id)}
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
                        <b>Содержание ДЗ</b>
                    </Typography>
                    <Typography gutterBottom>
                        {item.homework}
                    </Typography>
                </DialogContent>
                {item.homework_status !== 3 && <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Загруженные ДЗ</b>
                        <LoadedFilesListTeacher item={item} />
                    </Typography>
                </DialogContent>}

                {/*<DialogActions>*/}
                {/*    <UploadHomeworkBtn lesson={item} />*/}
                {/*</DialogActions>*/}
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default HomeworkListItemTeacher;