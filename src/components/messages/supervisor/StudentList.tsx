import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Skeleton from "@mui/material/Skeleton";
import {TextField} from "@mui/material";

function StudentList({setSelectedUser}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const studentsQuery = useQuery({
        queryKey: ["students-list"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/students`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        staleTime: 1000 * 60
    })

    const filteredStudents = studentsQuery.data
        ? studentsQuery.data.filter((student) =>
            `${student.first_name} ${student.last_name}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        : [];

    if (studentsQuery.isFetching) {
        return <List sx={{
            overflow: 'auto',
            width: "100%"
        }}>
            <ListItem>
                <ListItemButton disabled>
                    <Skeleton width="100%" variant="text" sx={{fontSize: '1.5rem'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton disabled>
                    <Skeleton width="100%" variant="text" sx={{fontSize: '1.5rem'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton disabled>
                    <Skeleton width="100%" variant="text" sx={{fontSize: '1.5rem'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton disabled>
                    <Skeleton width="100%" variant="text" sx={{fontSize: '1.5rem'}}/>
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton disabled>
                    <Skeleton width="100%" variant="text" sx={{fontSize: '1.5rem'}}/>
                </ListItemButton>
            </ListItem>
        </List>
    }


    return (
        <div className="overflow-auto">
            <div className="flex justify-center">
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Поиск по имени или фамилии"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{
                        width: "80%",
                        "& .MuiOutlinedInput-root": {
                            "&:hover fieldset": {
                                borderColor: "#702DFF",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#702DFF",
                            },
                        },
                    }}
                />
            </div>
            <List sx={{
                overflow: 'auto',
            }}>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                        <ListItem key={student.id}>
                            <ListItemButton onClick={() => setSelectedUser(student)}>
                                <ListItemText primary={`${student.first_name} ${student.last_name}`}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="Ученики не найдены"/>
                    </ListItem>
                )}
            </List>
        </div>
    );
}

export default StudentList;