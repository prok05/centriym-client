import React, {useMemo} from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {DataGrid} from '@mui/x-data-grid'
import TableRow from '@mui/material/TableRow';
import {styled} from "@mui/material/styles";
import {useQuery} from "@tanstack/react-query";
import Rating from '@mui/material/Rating';
import moment from 'moment';
import Box from "@mui/material/Box";
import {ruRU} from "@mui/x-data-grid/locales"
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';

interface LessonRateI {
    id: number,
    student_id: number,
    student_first_name: string,
    student_last_name: string,
    teacher_id: number,
    student_middle_name: string,
    teacher_middle_name: string,
    teacher_first_name: string,
    teacher_last_name: string,
    lesson_id: number,
    lesson_date: string,
    rate: number
}

function LessonRating() {
    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 25,
    });

    const getLessonRates = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lessons/rating`, {
            method: "GET",
            credentials: "include",
        });
        return await response.json()
    };

    const lessonQuery = useQuery({
        queryKey: ['lesson-rate'],
        queryFn: getLessonRates,
    })

    const columns = useMemo(() => [
        {field: "number",
            headerName: "№",
            sortable: false,
            filterable: false,
            width: 20,
            hideable: false,
            disableColumnMenu: true,
            headerClassName: "lesson-rate--header"
        },
        {field: "rate",
            headerName: "Оценка",
            minWidth: 200,
            renderCell: (p) => <Rating value={p.row.rate} readOnly size={"small"} />,
            hideable: false,
            disableReorder: true,
            headerClassName: "lesson-rate--header"
        },
        {field: "lesson_date",
            headerName: "Дата урока",
            renderCell: (p) => p.row.lesson_date.format("DD.MM.YYYY HH:mm"),
            minWidth: 250,
            hideable: false,
            // flex: 1,
            headerClassName: "lesson-rate--header"
        },
        {
            field: "teacher_name",
            headerName: "Преподаватель",
            // minWidth: 300,
            hideable: false,
            flex: 1,
            headerClassName: "lesson-rate--header"
        },
        {field: "student_name",
            headerName: "Ученик",
            // minWidth: 300,
            hideable: false,
            flex: 1,
            headerClassName: "lesson-rate--header"
        },
        {field: "lesson_link",
            headerName: "Ссылка на урок",
            renderCell: p => <a className={"text-purple-main"} href={p.row.lesson_link} target="_blank">Ссылка</a>,
            filterable: false,
            sortable: false,
            maxWidth: 400,
            flex: 1,
            disableColumnMenu: true,
            hideable: false,
            headerClassName: "lesson-rate--header"
        },
    ], [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#702DFF",
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // if (lessonQuery.isPending) {
    //     return <div>Loading</div>
    // }

    let rows = null;
    if (lessonQuery.data) {
        rows = lessonQuery.data.map((rate: LessonRateI, index: number) => {
            return {
                id: rate.id,
                number: index + 1,
                rate: rate.rate,
                lesson_date: moment(rate.lesson_date),
                teacher_name: rate.teacher_last_name + ' ' + rate.teacher_first_name + ' ' + rate.teacher_middle_name,
                student_name: rate.student_last_name + ' ' + rate.student_first_name + ' ' + rate.student_middle_name,
                lesson_link: "https://centriym.s20.online/company/1/lesson/index?LessonSearch%5Bf_date_from%5D=&LessonSearch%5Bf_date_to%5D=&LessonSearch%5Bf_lesson_type_id%5D=&LessonSearch%5Bf_status%5D=3&LessonSearch%5Bf_subject_id%5D=&LessonSearch%5Bf_customer_id%5D=&LessonSearch%5Bf_teacher_id%5D=&LessonSearch%5Bf_topic%5D=&LessonSearch%5Bf_homework%5D=&LessonSearch%5Bf_duration%5D=&LessonSearch%5Bf_is_confirmed%5D=&LessonSearch%5Bf_is_customer_attend%5D=&LessonSearch%5Bf_custom_klass__%5D=&LessonSearch%5Bf_custom_prichinaotmeny%5D=&LessonSearch%5Bf_lesson_id%5D=" + rate.lesson_id,
            }
        })
    }

    return (
        <Box mt={2} pl={2} pr={2} maxHeight="85%" maxWidth={"100%"}>
            <DataGrid
                columns={columns}
                loading={lessonQuery.isPending}
                slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress',
                        noRowsVariant: 'linear-progress',
                    },
                    // columnHeaderSortIcon: <ArrowUpwardSharpIcon />
                }}
                rows={rows}
                getRowId={row => row.id}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                disableColumnResize
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => setPaginationModel(model)}
                pageSizeOptions={[25, 50, 100]}
                disableColumnSelector
                disableRowSelectionOnClick
                disableDensitySelector
                sx={{
                    '& .lesson-rate--header': {
                        backgroundColor: "#702DFF",
                        color: "#fff",
                        fontWeight: "bold"
                    },
                    "& .MuiDataGrid-sortIcon": {
                        color: "white !important"
                    },
                    "& .MuiDataGrid-filterIcon": {
                        color: "white !important"
                    },
                    "& .MuiDataGrid-menuIconButton": {
                        color: "white !important"
                    }

                }}
            />
        </Box>
    );
}

export default LessonRating;