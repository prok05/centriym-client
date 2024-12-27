import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";

// @ts-ignore
function LoadedFilesListStudent({files, homeworkID}) {
    const queryClient = useQueryClient();

    // @ts-ignore
    const handleDownLoadFile = (id) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/file/${id}/download`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = `file_${id}.docx`;
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

    // @ts-ignore
    const handleDeleteFile = async (id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/files/${id}`, {
            method: "DELETE"
        });
        if (response.status == 200) {
            await queryClient.invalidateQueries({queryKey: ['solution', homeworkID]});
        }
    }

    if (!files) {
        return null
    }

    return (
        <div>
            {files.length ? (
                // @ts-ignore
                files.map((file) => (
                    <div
                        key={file.id}
                        className="p-2 mt-2 border-2 rounded flex justify-between items-center">

                        <Typography variant='subtitle2'><AttachFileRoundedIcon fontSize='small'/> {file.file_name}</Typography>
                        <div>
                            <IconButton onClick={() => handleDownLoadFile(file.id)}><DownloadRoundedIcon/></IconButton>
                            <IconButton onClick={() => handleDeleteFile(file.id)}><DeleteIcon/></IconButton>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">
                    Файлы отсутствуют.
                </div>
            )}
        </div>
    )
        ;
}

export default LoadedFilesListStudent;