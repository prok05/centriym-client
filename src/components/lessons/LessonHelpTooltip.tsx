import React from 'react';
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import {styled} from "@mui/material/styles";

const LessonHelpTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#ffffff',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        padding: 0,
    },
}))


export default LessonHelpTooltip;