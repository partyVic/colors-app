import { useState } from "react";
import MiniPalette from "./MiniPalette"
import { Box } from "@mui/system"
import { useNavigate } from "react-router"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import styles from './styles/PaletteListStyles'
import './PaletteList.css'

function PaletteList(props) {
    const { palettes } = props
    const navigate = useNavigate()

    const [state, setState] = useState({
        openDeleteDialog: false,
        deletingId: ""
    })

    //the openDialog id is passing by child <MiniPalette>
    const openDialog = (id) => {
        setState({ ...state, openDeleteDialog: true, deletingId: id })
    }

    const closeDialog = () => {
        setState({ ...state, openDeleteDialog: false, deletingId: "" })
    }

    const handleDelete = () => {
        props.deletePalette(state.deletingId)       //pass UP the id to parent <App> and deletePalette
        closeDialog()                               //after deletion, close the <Dialog>
    }

    const gotoPalette = (id) => {
        navigate(`/palette/${id}`)
    }


    return (
        <Box sx={styles.root}>
            <Box sx={styles.container}>
                <Box component="nav" sx={styles.nav}>
                    <Box component="h1" sx={styles.heading}>React Colors</Box>
                    <Link to="/palette/new">Create Palette</Link>
                </Box>

                {/* <Box sx={styles.palettes}> */}
                <TransitionGroup className="palettes">
                    {palettes.map(palette => (
                        // !!!!! important! CSSTransition using classNames, pluralized! NOT className
                        // when use the "fade" class name, make sure the CSS style sheet uses fade-xxx as well
                        // MUST add key prop on <CSSTransition> 
                        <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                            <MiniPalette
                                {...palette}
                                gotoPalette={() => gotoPalette(palette.id)}
                                key={palette.id}
                                id={palette.id}
                                // handleDelete={props.deletePalette}       //this delete method handled by <Dialog>
                                openDialog={openDialog}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                {/* </Box> */}
            </Box>

            {/* below pop-up window to comfirm deletion */}
            <Dialog
                open={state.openDeleteDialog}
                onClose={closeDialog}            //important, when click outside of the <Dialog>, can still close the <Dialog>
            >
                <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
                <List>

                    <ListItem button onClick={handleDelete}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Delete" />
                    </ListItem>

                    <ListItem button onClick={closeDialog}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancel" />
                    </ListItem>

                </List>
            </Dialog>

        </Box>
    )
}

export default PaletteList