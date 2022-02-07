import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import DraggableColorList from './DraggableColorList';
import { arrayMoveImmutable } from 'array-move';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button'
import styles from './styles/NewPaletteFormStyles';


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
    const [state, setState] = useState({
        colors: props.palettes[0].colors,
    })


    const paletteIsFull = state.colors.length >= props.maxColors

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const addNewColor = (newColor) => {
        setState({ ...state, colors: [...state.colors, newColor] })
    }

    // const handleChange = (evt) => {
    //     setState({ ...state, [evt.target.name]: evt.target.value })
    // }

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

    const handleSubmit = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-")    //replace with space & -
        newPalette.colors = state.colors

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

            <PaletteFormNav
                open={open}
                palettes={props.palettes}
                handleSubmit={handleSubmit}
                handleDrawerOpen={handleDrawerOpen}
            />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',

                        //custom style change
                        display: 'flex',
                        alignItems: 'center'
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

                <Box sx={styles.container}>
                    <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                    <Box sx={styles.buttons}>
                        <Button variant="contained" color="secondary" onClick={clearColors} sx={styles.button}>
                            Clear Palette
                        </Button>
                        <Button
                            sx={styles.button}
                            variant="contained"
                            color="primary"
                            onClick={addRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </Box>

                    <ColorPickerForm
                        paletteIsFull={paletteIsFull}
                        addNewColor={addNewColor}
                        colors={state.colors}
                    />
                </Box>
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
