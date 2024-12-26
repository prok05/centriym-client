import {styled} from "@mui/material/styles";
import TextField, {TextFieldProps} from "@mui/material/TextField";
import {alpha} from "@mui/material/styles";

export const ColorTextField = styled(TextField)<TextFieldProps>({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#B2BAC2',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(112,45,255,0.67)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#702DFF',
        },
    },
});