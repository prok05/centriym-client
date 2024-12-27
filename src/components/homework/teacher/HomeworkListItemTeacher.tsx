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
import UploadHomeworkBtn from "@/components/homework/student/UploadHomeworkBtn";
import {grey} from "@mui/material/colors"
import {useQuery} from "@tanstack/react-query";
import LoadedFilesListStudent from "@/components/homework/student/LoadedFilesListStudent";
import SolutionListTeacher from "@/components/homework/teacher/SolutionListTeacher";
import Badge from "@mui/material/Badge";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";


// @ts-ignore
function HomeworkListItemTeacher({homework}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {data: teacherFiles, error: teacherFilesError, isPending: teacherFilesIsPending} = useQuery({
        queryKey: ['teacher-files', homework.id],
        queryFn: () => fetchHomeworkTeacherFiles(homework.id),
        enabled: open,
    })

    // @ts-ignore
    const fetchHomeworkTeacherFiles = async (homeworkID) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher/files/${homeworkID}`, {
            method: "GET",
            credentials: "include"
        });
        return response.json()
    }

    const handleDownLoadTeacherFile = (fileID) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher/file/${fileID}/download`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = `file_${fileID}.docx`;
                if (contentDisposition) {
                    const matches = contentDisposition.match(/filename="([^"]+)"/);
                    if (matches && matches[1]) {
                        filename = matches[1]; // Получаем имя файла
                    }
                }
                return response.blob().then((blob) => ({blob, filename}));
            })
            .then(({blob, filename}) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;

                a.download = filename;

                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    }

    return (
        <React.Fragment>
            <div key={homework.id}
                 className="flex justify-between items-center p-4 border border-slate-200 rounded">
                <div className="flex flex-col w-4/5">
                    <Typography
                        variant="h5">{homework.subject_title}: {moment(homework.lesson_date).format("dddd, DD MMMM")}</Typography>
                    <Divider sx={{mb: 1}}/>
                    <Typography variant="body1">Тема: {homework.lesson_topic ? homework.lesson_topic : "-"}</Typography>
                </div>
                <div>
                    <div></div>
                    <Badge badgeContent={homework.under_review_count && homework.under_review_count} color='primary'>
                        <Button
                            onClick={handleClickOpen}
                            variant="contained"
                            size="small"
                            sx={{bgcolor: "#702DFF", fontWeight: "bolder"}}
                        >Открыть
                        </Button>
                    </Badge>
                </div>
            </div>

            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <div className="flex justify-between items-center">
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        {homework.subject_title}
                    </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={(theme) => ({
                                color: theme.palette.grey[500],
                                mr: 1,
                            })}
                        >
                            <CloseIcon/>
                        </IconButton>
                </div>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Содержание</b>
                    </Typography>
                    <Typography gutterBottom>
                        {homework.description}
                    </Typography>
                    {teacherFiles && teacherFiles.map((file) => {
                        return (
                            <div
                                className="flex justify-between items-center border-stone-300 border-2 px-3 py-2 rounded mb-3 last:mb-0">
                                <div className="text-balance">
                                    <Typography variant='subtitle2'><AttachFileRoundedIcon
                                        fontSize='small'/> {file.file_name}</Typography>
                                </div>
                                <div className="flex items-center">
                                    <div>
                                        <IconButton onClick={() => handleDownLoadTeacherFile(file.id)}><DownloadRoundedIcon/></IconButton>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </DialogContent>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Загруженные ДЗ</b>
                        <SolutionListTeacher homework={homework}/>
                    </Typography>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default HomeworkListItemTeacher;