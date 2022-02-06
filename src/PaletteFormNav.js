import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import PaletteMetaForm from './PaletteMetaForm';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button'
import { Box } from '@mui/system';


const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const styles = {
    Appbar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: "64px"
    },
    root: {
        display: "flex"
    },
    navBtns: {

    }
}

function PaletteFormNav({ palettes, handleSubmit, handleDrawerOpen, open }) {
    return (
        <Box sx={styles.root}>
            <CssBaseline />
            <AppBar color="default" position="fixed" open={open} sx={styles.Appbar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Create A Palette
                    </Typography>
                </Toolbar>

                <Box sx={styles.navBtns}>

                    <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />

                    <Link to="/">
                        <Button variant="contained" color="secondary">
                            Go Back
                        </Button>
                    </Link>
                </Box>

            </AppBar>
        </Box>
    );
}

export default PaletteFormNav;
