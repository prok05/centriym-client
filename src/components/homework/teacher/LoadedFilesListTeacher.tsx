import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Button, Typography} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import Chip from "@mui/material/Chip";
import {grey} from "@mui/material/colors";
import {bgcolor} from "@mui/system";

function LoadedFilesListTeacher({item}) {
    const queryClient = useQueryClient();
    const [expanded, setExpanded] = React.useState<number | false>(false);

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homework-teacher', item.id],
        queryFn: () => getHomeworkFiles(item.teacher_ids[0], item.id, item.customer_ids)
    })

    // @ts-ignore
    const getHomeworkFiles = async (teacherID, lessonID, students) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher`, {
            method: "POST",
            body: JSON.stringify({
                "student_ids": students,
                "lesson_id": lessonID,
                "teacher_id": teacherID
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json()
    }

    const handleChange =
        (homework: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? homework : false);
        };

    function bgcolor(status: number) {
        if (status === 3) {
            return "#d4e2ff"
        } else if (status === 2) {
            return "#d4e2ff"
        } else if (status === 1) {
            return "#d9ffda"
        }
    }

    const handleDownLoadFile = (id, lastName) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/file/${id}/download`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const contentDisposition = response.headers.get('Content-Disposition');
                let filename = `file_${id}_${lastName}.docx`;
                if (contentDisposition) {
                    const matches = contentDisposition.match(/filename="([^"]+)"/);
                    if (matches && matches[1]) {
                        filename = matches[1]; // Получаем имя файла
                    }
                }
                console.log(filename)
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

    if (isPending) {
        return <div>Загрузка</div>
    }

    console.log(data)
    return (
        <div className="mt-2">
            {data.map((el) => (
                <Accordion
                    expanded={expanded === el.homework_id}
                    onChange={handleChange(el.homework_id)}
                    disabled={!el.file_id || el.homework_id === 1}
                    sx={{bgcolor: bgcolor(el.homework_status)}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            {el.first_name} {el.last_name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {el.file_id.map((file) => (
                            <div className="flex justify-between border-b-2 border-slate-400 p-2">
                                <div>Файл {file}</div>
                                <Button onClick={() => handleDownLoadFile(file, el.last_name)} size="small" variant="contained">Скачать</Button>
                            </div>

                        ))}
                        <div className="flex mt-2">
                            <Button size="small" variant="contained" color="success" sx={{marginRight: "10px", bgcolor: "#10ae54"}}>Принять</Button>
                            <Button size="small" variant="contained" color="error" sx={{bgcolor: "#ff2d5e"}}>Отклонить</Button>
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default LoadedFilesListTeacher;