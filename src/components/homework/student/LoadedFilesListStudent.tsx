import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Button} from "@mui/material";

// @ts-ignore
function LoadedFilesListStudent({homeworkID}) {
    const queryClient = useQueryClient();

    const {data, error, isPending, refetch} = useQuery({
        queryKey: ['homework-files', homeworkID],
        queryFn: () => getHomeworkFiles(homeworkID),
        staleTime: 1000
    })

    // @ts-ignore
    const getHomeworkFiles = async (homeworkID) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homework/files/${homeworkID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.json()
    }

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

            // @ts-ignore
            await queryClient.invalidateQueries(['homework-files', homeworkID]);
        }
    }

    if (isPending) {
        return <div>Загрузка</div>
    }

    return (
        <div>
            {data.length ? (
                // @ts-ignore
                data.map((el) => (
                    <div
                        key={el.id}
                        className="p-2 mt-2 border-2 rounded flex justify-between items-center"
                    >
                        Файл {el.id}
                        <div>
                            <Button
                                sx={{ bgcolor: "#702DFF", marginRight: "10px" }}
                                size="small"
                                variant="contained"
                                onClick={() => handleDownLoadFile(el.id)}
                            >
                                Скачать
                            </Button>
                            <Button
                                sx={{ bgcolor: "#ff2d5e" }}
                                size="small"
                                variant="contained"
                                onClick={() => handleDeleteFile(el.id)}
                            >
                                Удалить
                            </Button>
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