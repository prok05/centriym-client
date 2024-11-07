"use client"

import {SmallLogo} from "@/components/ui/SmallLogo";
import Link from 'next/link';
import Box from "@mui/material/Box";
import {AppBar, IconButton, Skeleton, Toolbar} from "@mui/material";
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Badge from '@mui/material/Badge';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {styled} from '@mui/material/styles';
import {Fragment, useState} from "react";
import {SxProps} from "@mui/system";
import Menu from '@mui/material/Menu';
import {ProfileMenu} from "@/components/ui/ProfileMenu";
import {useUser} from "@/hooks/useUser";


export function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    // @ts-ignore
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const {user, error, isLoading} = useUser();
    const firstName = user?.name.split(" ")[1]

    const iconStyles: SxProps = {
        color: "#702DFF",
        backgroundColor: "rgba(112,45,255,0.08)",
        marginRight: 2,
        "&.MuiIconButton-root": {
            "&:hover": {
                backgroundColor: "rgba(112,45,255,0.22)"
            }
        },
    }

    const profileMenuId = 'account-menu';
    // @ts-ignore
    const ProfileTooltip = styled(({className, ...props}) => (
        // @ts-ignore
        <Tooltip {...props} classes={{popper: className}}/>
    ))(({theme}) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#ffffff',
            color: '#202020',
            minWidth: 200,
            padding: 0,
            fontSize: theme.typography.pxToRem(12),
            border: '1px solid #dadde9',
        },
    }));

    // @ts-ignore
    // @ts-ignore
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar className="border-b z-20" position="static" elevation={0} color="transparent">
                <Toolbar>
                    <div className="ml-10">
                        <SmallLogo/>
                    </div>
                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton sx={iconStyles}>
                            <Badge badgeContent={4} color="error">
                                <CardGiftcardIcon fontSize="medium"/>
                            </Badge>
                        </IconButton>
                        <IconButton sx={iconStyles} size="medium" aria-label="show 4 new mails">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            sx={iconStyles}
                        >
                            <Badge badgeContent={17} color="error">
                                <CircleNotificationsIcon />
                            </Badge>
                        </IconButton>
                        {/*@ts-ignore*/}
                        <ProfileTooltip title={
                            <Fragment>
                                <ProfileMenu isLoading={isLoading} paid_lesson_count={user?.paid_lesson_count}/>
                            </Fragment>
                        }>
                            <div className="flex items-center cursor-pointer">
                                <AccountCircleIcon fontSize="large" sx={{marginRight: "10px", color: "#979797"}}/>
                                {isLoading ?
                                    <Skeleton width="55px" variant="text" sx={{fontSize: '1.2rem'}}/> : firstName}
                            </div>
                        </ProfileTooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}