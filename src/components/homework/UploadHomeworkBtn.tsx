import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import {useUserID} from "@/hooks/useUserID";

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
    const [selectedFile, setSelectedFile] = useState();
    const [error, setError] = useState<String>();

    const uploadFile = (event) => {
        const file = event.target.files[0];

        if (file.size > 52428800) {
            setError("Размер файла не должен превышать 50 мегабайт.")
            return
        }

        setSelectedFile(file)
        setError("")
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

        // const data = await res.json()
    }

    return (
        <div>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Загрузить ДЗ
                <VisuallyHiddenInput
                    type="file"
                    onChange={uploadFile}
                    accept={"image/*,.png,.jpg,.doc,.docx,.pptx,.ppt,.rar,.zip"}
                />
            </Button>
            <Button onClick={uploadHomework}>Отправить</Button>
            {selectedFile && <div>{selectedFile.name} {selectedFile.size}</div>}
            {error && <Alert severity="error">{error}</Alert>}
        </div>

    );
}

export default UploadHomeworkBtn;