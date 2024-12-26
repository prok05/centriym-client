import {styled} from "@mui/material/styles";
import Button, {ButtonProps} from "@mui/material/Button";

export const ColorButton = styled(Button)<ButtonProps>(({theme}) => ({
    backgroundColor: "#702DFF",
    '&:hover': {
        backgroundColor: "#4a1daa",
    },
}));