import React from 'react';
import { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import DraggableColorList from './DraggableColorList';
import { arrayMoveImmutable } from 'array-move';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button'

const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function NewPaletteForm(props) {
    const theme = useTheme();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    // const [currentColor, setCurrentColor] = useState("teal")
    // const [colors, setColors] = useState([])
    // const [name, setName] = useState({                          //used for Validation component for material-ui forms
    //     newPaletteName: "",
    //     newColorName: ''
    // })
    const [state, setState] = useState({
        currentColor: "teal",
        colors: props.palettes[0].colors,
        newPaletteName: "",                 //used for Validation component for material-ui forms
        newColorName: ""                    //used for Validation component for material-ui forms
    })

    const paletteIsFull = state.colors.length >= props.maxColors

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
            return state.colors.every((color) => color.name.toLowerCase() !== value.toLowerCase())
        })

        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return state.colors.every((color) => color.color !== state.currentColor)
        })

        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return props.palettes.every((palette) => palette.paletteName.toLowerCase() !== value.toLowerCase())
        })

    }, [state])


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const updateCurrentColor = (newColor) => {
        setState({ ...state, currentColor: newColor.hex })
    }

    const addNewColor = () => {
        const newColor = { color: state.currentColor, name: state.newColorName }
        setState({ ...state, colors: [...state.colors, newColor], newColorName: "" })
    }

    const handleChange = (evt) => {
        setState({ ...state, [evt.target.name]: evt.target.value })
    }

    const clearColors = () => {
        setState({ ...state, colors: [] })
    }

    const addRandomColor = () => {
        //pick a random color from existing palettes 
        const allColors = props.palettes.map(p => p.colors).flat()  //the format is [[{}], [{}], ...], use flat() makes it [{},{},...]

        //makes allColors not duplicate colors
        const filterdArr = allColors.filter(color => !state.colors.includes(color))

        //make random colors from filterdArr
        const randomColor = filterdArr[Math.floor(Math.random() * filterdArr.length)]

        setState({ ...state, colors: [...state.colors, randomColor] })
    }

    const handleSubmit = () => {
        let newName = state.newPaletteName
        const newPalette = {
            paletteName: newName,
            colors: state.colors,
            id: newName.toLowerCase().replace(/ /g, "-")    //replace with space & -
        }
        props.savePalette(newPalette)
        navigate("/")
    }

    const removeColor = (colorName) => {
        const newColors = state.colors.filter((color) => (color.name !== colorName))
        setState({ ...state, colors: newColors })
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {                   //used for react-sortable-hoc
        setState({
            ...state,
            colors: arrayMoveImmutable(state.colors, oldIndex, newIndex),
        })
    };


    return (
        <Box sx={{ display: 'flex' }}>
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
                        Persistent drawer
                    </Typography>

                    <ValidatorForm onSubmit={handleSubmit}>
                        <TextValidator
                            label="Palette Name"
                            value={state.newPaletteName}
                            name="newPaletteName"              //VERY important: used for [evt.target.value] in handleChange
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name already used"]}
                        />
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </ValidatorForm>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Typography variant='h4'>Design Your Palette</Typography>
                <div>
                    <Button variant="contained" color="secondary" onClick={clearColors}>
                        Clear Palette
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addRandomColor}
                        disabled={paletteIsFull}
                    >
                        Random Color
                    </Button>
                </div>
                <ChromePicker
                    color={state.currentColor}
                    disableAlpha={true}
                    onChangeComplete={updateCurrentColor}
                />

                <ValidatorForm onSubmit={addNewColor} instantValidate={false}>
                    <TextValidator
                        label="Color Name"
                        value={state.newColorName}
                        name="newColorName"                 //VERY important: used for [evt.target.value] in handleChange
                        onChange={handleChange}

                        //below arrays in validators & errorMessages the ORDER does matter
                        validators={['required', 'isColorNameUnique', "isColorUnique"]}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}
                    />
                    <Button
                        variant="contained"
                        type="submit"                               //import to set type to let ValidatorForm works
                        color="primary"
                        disabled={paletteIsFull}
                        style={{ backgroundColor: paletteIsFull ? "grey" : state.currentColor }}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                <DraggableColorList
                    colors={state.colors}
                    removeColor={removeColor}

                    //below used for react-sortable-hoc
                    axis="xy"
                    onSortEnd={onSortEnd}
                    distance={2}            // will not trigger the sorting to happend before you have dragged the colorbox 2px
                />

            </Main>
        </Box >
    );
}

//functional component sets defaultProps here
NewPaletteForm.defaultProps = {
    maxColors: 20
}

export default NewPaletteForm;
