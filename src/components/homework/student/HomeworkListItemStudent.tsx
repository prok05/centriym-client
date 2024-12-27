import React, {useState} from 'react';
import {Button, Divider, Typography} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import moment from 'moment'
import Chip from '@mui/material/Chip';
import UploadHomeworkBtn from "@/components/homework/student/UploadHomeworkBtn";
import {grey} from "@mui/material/colors"
import {useQuery, useQueryClient} from "@tanstack/react-query";
import LoadedFilesListStudent from "@/components/homework/student/LoadedFilesListStudent";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import {ColorTextField} from "@/components/ui/ColorTextField";
import {ColorButton} from "@/components/ui/ColorButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {VisuallyHiddenInput} from "@/components/ui/VisuallyHiddenInput";
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import {ColorLoadingButton} from "@/components/ui/ColorLoadingButton";

type FileState = File[];

// @ts-ignore
function HomeworkListItemStudent({homework}) {
    const [open, setOpen] = React.useState(false);
    const [solution, setSolution] = useState<string>('')
    const [files, setFiles] = useState<FileState>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const queryClient = useQueryClient();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function HomeworkStatus(status: number) {
        if (status === 3) {
            return <Chip label={"Не сдано"} sx={{bgcolor: grey}}/>
        } else if (status === 2) {
            return <Chip color="info" label={"На проверке"}/>
        } else if (status === 1) {
            return <Chip color="success" label={"Сдано"}/>
        } else if (status === 4) {
            return <Chip sx={{bgcolor: "#ff2d5e", color: "#fff"}} label={"Отклонено"}/>
        }
    }

    const {data, error: solutionError, isPending: isPendingSolution, refetch} = useQuery({
        queryKey: ['solution', homework.id],
        queryFn: () => fetchSolution(),
        staleTime: 1000,
    })

    // @ts-ignore
    const fetchSolution = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/student/solution/${homework.id}`, {
            method: "GET",
            credentials: "include",
        });

        return await response.json();
    };

    const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;
        if (fileList) {
            const filesArray = Array.from(fileList);

            for (let file of filesArray) {
                if (file.size > 52428800) {
                    setError("Размер файла не должен превышать 50 мегабайт.");
                    return;
                }
            }

            setFiles(prev => [...prev, ...filesArray]);
            setError("");
        }
    }

    const uploadSolution = async () => {
        setIsLoading(true)
        const formData = new FormData()
        files.forEach((file) => formData.append('files', file));
        formData.append('solution', solution)
        formData.append('solution_id', data.id)
        formData.append('homework_id', homework.id)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/student/solution`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            })

        if (res.status === 201) {
            await queryClient.invalidateQueries({queryKey: ['solution', homework.id]})
            await queryClient.invalidateQueries({queryKey: ['homeworks']})
            setIsLoading(false)
            setFiles([])
            setSolution('')
        } else {

        }
    };

    // @ts-ignore
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
            <div
                className="flex justify-between items-center p-4 border border-slate-200 rounded">
                <div className="flex flex-col w-4/5">
                    <Typography
                        variant="h5">{homework.subject_title}: {moment(homework.lesson_date).format("dddd, DD MMMM")}</Typography>
                    <Divider sx={{mb: 1}}/>
                    <Typography variant="body1">Тема: {homework.lesson_topic}</Typography>
                </div>
                <div>
                    {HomeworkStatus(homework.status)}
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        size="small"
                        sx={{bgcolor: "#702DFF", fontWeight: "bolder", ml: 2}}
                    >Открыть
                    </Button>
                </div>
            </div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <div className="flex items-center justify-between">
                    <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
                        {homework.subject_title}
                    </DialogTitle>
                    <div className="mr-2">
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
                </div>
                <DialogContent dividers>
                    <div className="mb-4">
                        <Typography variant='subtitle1' gutterBottom>
                            <b>Содержание</b>
                        </Typography>
                        <Typography variant='subtitle2' gutterBottom>
                            {homework.description}
                        </Typography>
                    </div>
                    {/*@ts-ignore*/}
                    {homework.files.length > 0 && homework.files.map((file) => {
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

                {/*Загруженное решение*/}
                <DialogContent dividers>
                    <div>
                        <Typography variant='subtitle1' gutterBottom>
                            <b>Ваше решение</b>
                        </Typography>
                        <Typography variant='subtitle2' gutterBottom>
                            {isPendingSolution ? '...' : data.solution}
                        </Typography>
                        {isPendingSolution ? null :
                            <LoadedFilesListStudent homeworkStatus={homework.status} files={data.files} homeworkID={homework.id}/>}

                    </div>
                </DialogContent>

                {/*Блок загрузки ДЗ*/}
                {homework.status !== 1
                    &&
                    <DialogContent dividers>
                        <div>
                            <Typography variant='subtitle1' gutterBottom>
                                <b>Загрузить решение</b>
                            </Typography>
                            <ColorTextField
                                fullWidth
                                multiline
                                required
                                maxRows={4}
                                value={solution}
                                sx={{mb: 1, mt: 1}}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setSolution(event.target.value);
                                }}
                            />
                            {files.length > 0 ? files.map((file) => {
                                return (
                                    <div
                                        className="flex justify-between items-center border-stone-300 border-2 px-3 py-2 rounded mb-3 last:mb-0">
                                        <div className="text-balance">{file.name}</div>
                                        <div className="flex items-center">
                                            <div className="text-stone-500 mr-2">{Math.round(file.size / 1024)} КБ</div>
                                            <div onClick={() => setFiles(files.filter(f => f.name !== file.name))}>
                                                <IconButton><DeleteIcon/></IconButton></div>
                                        </div>
                                    </div>
                                )
                            }) : <div className="text-stone-500 text-center mb-4">Загрузите файл</div>}

                            <div className="flex justify-center">
                                <ColorButton
                                    component="label"
                                    variant="contained"
                                    size="small"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon/>}
                                > Загрузить файл
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={uploadFile}
                                        multiple
                                        accept={"image/*,.png,.jpg,.doc,.docx,.pptx,.ppt,.rar,.zip"}
                                    />
                                </ColorButton>
                            </div>
                        </div>
                    </DialogContent>
                }

                {homework.status === 1 &&
                    <DialogContent dividers>
                        <Alert icon={<CheckIcon fontSize="inherit"/>} severity="success">
                            Домашнее задание принято преподавателем.
                        </Alert>
                    </DialogContent>}

                {homework.status !== 1
                    &&
                    <DialogActions sx={{padding: 2}}>
                        <ColorLoadingButton
                            loading={isLoading}
                            onClick={uploadSolution}
                            disabled={solution.length === 0 && files.length === 0}
                            variant="contained">Отправить</ColorLoadingButton>
                    </DialogActions>
                }
            </Dialog>
        </React.Fragment>
    );
}

export default HomeworkListItemStudent;