import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export function SelectRole() {
    return (
        <div className="flex-col justify-center">
            <Box sx={{minWidth: 120}}>
                <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            '&.MuiInputLabel-root': {
                                color: '#202020', // <------------------ label-color by default
                            },
                            '&.MuiInputLabel-root.Mui-focused': {
                                color: '#202020', // <------------------ label-color on focus
                            },
                        }}
                    >Выберите роль</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Выберите роль"
                        name="role"
                        required
                        sx={{
                            backgroundColor: "white",
                            '&.MuiOutlinedInput-root': {
                                // '& fieldset': {
                                //     borderColor: '#702DFF', // <------------------ outline-color by default
                                // },
                                '&:hover fieldset': {
                                    borderColor: '#702DFF', // <------------------ outline-color on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#702DFF', // <------------------ outline-color on focus
                                },
                            },
                        }}
                    >
                        <MenuItem value="student">Ученик</MenuItem>
                        <MenuItem value="teacher">Преподаватель</MenuItem>
                        <MenuItem value="supervisor">Методист</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}

