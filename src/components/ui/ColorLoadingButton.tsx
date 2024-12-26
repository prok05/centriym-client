import {styled} from "@mui/material/styles";
import Button, {ButtonProps} from "@mui/material/Button";
import LoadingButton, {LoadingButtonProps} from '@mui/lab/LoadingButton';

export const ColorLoadingButton = styled(LoadingButton)<LoadingButtonProps>(({theme}) => ({
    backgroundColor: "#702DFF",
    '&:hover': {
        backgroundColor: "#4a1daa",
    },
}));