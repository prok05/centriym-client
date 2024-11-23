import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import {useUserID} from "@/hooks/useUserID";
import { useQueryClient } from '@tanstack/react-query';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function UploadHomeworkBtn({lesson}) {
    const userID = useUserID()
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [uploaded, setUploaded] = useState<boolean>(false)
    const [error, setError] = useState<String>();

    const queryClient = useQueryClient();

    const uploadFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 52428800) {
                setError("Размер файла не должен превышать 50 мегабайт.")
                return
            }
            setSelectedFile(file)
            setError("")
        }
    }

    const uploadHomework = async () => {
        if (!selectedFile) {
            setError("Загрузите файл.")
        }

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('lesson_id', lesson.id)
        formData.append('teacher_id', lesson.teacher_ids[0])
        formData.append('student_id', userID)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/upload/homework`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            })

        if (res.status === 201) {
            await queryClient.invalidateQueries(['homework']);
            setSelectedFile(null)
            setUploaded(true)
        }
    }

    const addHomework = async () => {
        if (!selectedFile) {
            setError("Загрузите файл.")
        }

        const formData = new FormData()
        formData.append('file', selectedFile)
        formData.append('homework_id', lesson.homework_id)

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/upload/homework-add`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            })

        if (res.status === 201) {
            setSelectedFile(null)
            await queryClient.invalidateQueries(['homework']);
            setUploaded(true)
        }
    }

    return (
        <div className="w-full">
                <div className="flex justify-between items-center mb-2 p-2">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon/>}
                        sx={{
                            bgcolor: "#702DFF"
                        }}
                    >
                        {lesson.homework_status === 3 ? 'Загрузить ДЗ' : 'Догрузить ДЗ'}
                        <VisuallyHiddenInput
                            type="file"
                            onChange={uploadFile}
                            accept={"image/*,.png,.jpg,.doc,.docx,.pptx,.ppt,.rar,.zip"}
                        />
                    </Button>
                    {selectedFile &&
                        <div className="flex flex-col items-center">
                            <div>Загруженный файл:</div>
                            <div>{selectedFile.name}</div>
                        </div>
                    }
                    <Button
                        variant="contained"
                        disabled={!selectedFile}
                        sx={{
                            bgcolor: "#702DFF"
                        }}
                        onClick={lesson.homework_status === 3 ? uploadHomework : addHomework}>Отправить</Button>
                </div>


            <div>{error && <Alert severity="error">{error}</Alert>}</div>
        </div>
    );
}

export default UploadHomeworkBtn;