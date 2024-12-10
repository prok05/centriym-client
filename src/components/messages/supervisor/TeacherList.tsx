import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Skeleton from '@mui/material/Skeleton';
import {TextField} from "@mui/material";

function TeacherList({setSelectedUser}) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const teachersQuery = useQuery({
        queryKey: ["teachers-list"],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/teachers`, {
                method: "GET",
                credentials: "include"
            });

            return await response.json();
        },
        staleTime: 1000 * 60
    })

    const filteredTeachers = teachersQuery.data
        ? teachersQuery.data.filter((teacher) =>
            `${teacher.first_name} ${teacher.last_name}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
        : [];

    if (teachersQuery.isFetching) {
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
                {filteredTeachers.length > 0 ? (
                    filteredTeachers.map((teacher) => (
                        <ListItem key={teacher.id}>
                            <ListItemButton onClick={() => setSelectedUser(teacher)}>
                                <ListItemText primary={`${teacher.first_name} ${teacher.last_name}`}/>
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="Преподаватели не найдены"/>
                    </ListItem>
                )}
            </List>
        </div>
    );
}

export default TeacherList;