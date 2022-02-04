import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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

        //custom added styles
        flexDirection: "row",
        justifyContent: 'space-between',
        heigth: "64px"
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
    root: {
        display: "flex"
    },
    navBtns: {

    }
}


function PaletteFormNav({ palettes, handleSubmit, handleDrawerOpen, open }) {
    const [newPaletteName, setNewPaletteName] = useState("")        //used for Validation component for material-ui forms

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return palettes.every((palette) => palette.paletteName.toLowerCase() !== value.toLowerCase())
        })
    }, [newPaletteName])


    const handleChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    return (
        <Box sx={styles.root}>
            <CssBaseline />
            <AppBar color="default" position="fixed" open={open}>
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
                    <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"              //VERY important: used for [evt.target.value] in handleChange
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name already used"]}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </ValidatorForm>

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
