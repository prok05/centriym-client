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
import Divider from "@mui/material/Divider";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import IconButton from "@mui/material/IconButton";

// @ts-ignore
function SolutionListTeacher({homework}) {
    const queryClient = useQueryClient();
    const [expanded, setExpanded] = React.useState<number | false>(false);

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homework-solutions', homework.id],
        queryFn: () => fetchSolutions(homework.id),
        refetchOnMount: true,
        staleTime: 1000
    })

    // @ts-ignore
    const fetchSolutions = async (homeworkID) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/teacher/solutions/${homeworkID}`, {
            method: "GET",
            credentials: "include"
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
            return "#5fa8d3"
        } else if (status === 1) {
            return "#5dd39e"
        } else if (status === 4) {
            return "#d1495b"
        }
    }

    // @ts-ignore
    const handleDownLoadFile = (id, file, studentName) => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/file/${id}/download`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to download file');
                }
                const contentDisposition = response.headers.get('Content-Disposition');
                // let filename = `file_${id}.docx`;
                let filename = `${studentName}-${file}`;
                // if (contentDisposition) {
                //     const matches = contentDisposition.match(/filename="([^"]+)"/);
                //     if (matches && matches[1]) {
                //         filename = matches[1]; // Получаем имя файла
                //     }
                // }
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

    const handleUpdateSolution = async (id: number, status: number) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/solution/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "status": status
            }),
            credentials: "include"
        });
        if (response.status == 200) {
            await queryClient.invalidateQueries({queryKey: ['homework-solutions', homework.id]} );
            await queryClient.invalidateQueries({queryKey: ['homework']} );
        }
    }

    if (isPending) {
        return <div>Загрузка</div>
    }

    return (
        <div className="mt-2">
            {/*@ts-ignore*/}
            {data.map((solution) => (
                <Accordion
                    key={solution.id}
                    expanded={expanded === solution.id}
                    onChange={handleChange(solution.id)}
                    disabled={solution.status === 3}
                    sx={{border: `2px solid ${bgcolor(solution.status)}`}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography fontWeight='bold' variant='subtitle1'>
                            {solution.student_name}
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography
                            variant='subtitle1'
                            gutterBottom>
                            <b>Решение</b>
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            gutterBottom>{solution.solution ? solution.solution : 'Решения нет.'}
                        </Typography>

                        <Divider sx={{mb: 2}} />

                        <Typography variant="subtitle1" gutterBottom>
                            <b>Файлы</b>
                        </Typography>
                        <div>
                            {/*@ts-ignore*/}
                            {solution.files ? solution.files.map((file) => (
                                <div key={file.id} className="mt-2 flex justify-between items-center border-2 rounded p-2">
                                    <div>{file.file_name}</div>
                                    <IconButton onClick={() => handleDownLoadFile(file.id, file.file_name, solution.student_name)}><DownloadRoundedIcon/></IconButton>
                                    {/*<Button*/}
                                    {/*    onClick={}*/}
                                    {/*    size="small"*/}
                                    {/*    variant="contained"*/}
                                    {/*    sx={{bgcolor: "#5393b8"}}>Скачать</Button>*/}
                                </div>
                                )) : <Typography variant="subtitle2">Файлов нет.</Typography>}
                        </div>
                        <Divider sx={{mb: 2}} />
                        {solution.status === 2 &&
                            <div className="flex justify-center mt-4">
                                <Button size="small" variant="contained"
                                        sx={{marginRight: "10px", bgcolor: "#10ae54"}}
                                        onClick={() => handleUpdateSolution(solution.id, 1)}
                                        >Принять</Button>
                                <Button size="small" variant="contained" color="error"
                                        sx={{bgcolor: "#ff2d5e"}}
                                        onClick={() => handleUpdateSolution(solution.id, 4)}
                                        >Отклонить</Button>
                            </div>
                        }
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default SolutionListTeacher;