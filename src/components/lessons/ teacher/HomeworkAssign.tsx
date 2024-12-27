import React, {useState} from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import DialogActions from "@mui/material/DialogActions";
import Dialog from '@mui/material/Dialog';
import {ColorButton} from "@/components/ui/ColorButton";
import Divider from "@mui/material/Divider";
import {ColorTextField} from "@/components/ui/ColorTextField";
import {styled} from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from '@mui/icons-material/Delete';
import {useQueryClient} from "@tanstack/react-query";
import LoadingButton from '@mui/lab/LoadingButton';
import {ColorLoadingButton} from "@/components/ui/ColorLoadingButton";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Snackbar from "@mui/material/Snackbar";
import { VisuallyHiddenInput } from '@/components/ui/VisuallyHiddenInput';

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

type FileState = File[];

function HomeworkAssign({event}) {
    const [description, setDescription] = useState<string>('')
    const [open, setOpen] = React.useState(false);
    const [assignSuccess, setAssignSuccess] = React.useState(false);

    const [files, setFiles] = useState<FileState>([]);
    const [error, setError] = useState<String>();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const queryClient = useQueryClient();

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDescription('')
        setFiles([])
    };

    const assignHomework = async () => {
        setIsLoading(true)
        const formData = new FormData()
        files.forEach((file) => formData.append('files', file));
        formData.append('lesson_id', event.id)
        formData.append('lesson_topic', event.topic)
        formData.append('lesson_date', event.start.toISOString())
        formData.append('subject_title', event.title)
        formData.append('teacher_id', event.teacherIDs[0])
        // @ts-ignore
        event.customerIDs.forEach((id) => formData.append('student_ids', id));
        formData.append('description', description)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            })

        if (res.status === 201) {
            await queryClient.invalidateQueries({ queryKey: ['homework-in-lesson'] })
            setIsLoading(false)
            handleClose()
            setAssignSuccess(true)
        } else {

        }
    };

    return (
        <React.Fragment>
            <ColorButton variant="contained" onClick={handleClickOpen}>Задать ДЗ</ColorButton>
            <Dialog
                onClose={handleClose}
                aria-labelledby="assign-homework-dialog"
                open={open}
                fullWidth
            >
                <div className="flex items-center justify-between">
                    <DialogTitle sx={{m: 0, p: 2}} id="assign-homework-dialog-title">
                        Домашнее задание
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
                    <Typography gutterBottom>
                        <b>Содержание</b>
                    </Typography>
                    <ColorTextField
                        fullWidth
                        multiline
                        required
                        maxRows={4}
                        sx={{mb: 1}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value);
                        }}
                    />

                    <Divider sx={{mb: 2}}/>

                    <Typography gutterBottom>
                        <b>Файлы</b>
                    </Typography>
                    {files.length > 0 ? files.map((file) => {
                        return (
                            <div className="flex justify-between items-center border-stone-300 border-2 px-3 py-2 rounded mb-3 last:mb-0">
                                <div className="text-balance">{file.name}</div>
                                <div className="flex items-center">
                                    <div className="text-stone-500 mr-2">{Math.round(file.size / 1024)} КБ</div>
                                    <div onClick={() => setFiles(files.filter(f => f.name !== file.name))}>
                                        <IconButton><DeleteIcon/></IconButton></div>
                                </div>
                            </div>
                        )
                    }) : <div className="text-stone-500 text-center mb-4">Загрузите файл</div>
                    }

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
                </DialogContent>

                <DialogActions sx={{padding: 2}}>
                    <ColorLoadingButton
                        loading={isLoading}
                        onClick={assignHomework}
                        disabled={description.length === 0}
                        variant="contained">Отправить</ColorLoadingButton>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={assignSuccess}
                onClose={() => setAssignSuccess(false)}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                autoHideDuration={2000}
                TransitionComponent={Slide}
                sx={{
                    zIndex: 100
                }}
            >
                <Alert
                    icon={<CheckRoundedIcon/>}
                    // onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    ДЗ успешно добавлено!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default HomeworkAssign;