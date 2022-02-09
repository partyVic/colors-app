import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'


function PaletteMetaForm({ palettes, handleSubmit, hideForm }) {

    //be carefully open set to true when use a button to trigger Dialog open/close
    // const [open, setOpen] = useState(true)

    const [stage, setStage] = useState("form");
    const [newPaletteName, setNewPaletteName] = useState("")        //used for Validation component for material-ui forms

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return palettes.every((palette) => palette.paletteName.toLowerCase() !== value.toLowerCase())
        })
    }, [newPaletteName])

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    const showEmojiPicker = () => {
        setStage("emoji")
    }

    const savePalette = (emoji) => {
        const newPalette = {
            paletteName: newPaletteName,
            emoji: emoji.native
        }
        handleSubmit(newPalette)
    }

    return (
        <div>
            <Dialog open={stage === "emoji"} onClose={hideForm}>
                <DialogTitle>
                    Choose a Palette Emoji
                </DialogTitle>
                <Picker
                    onSelect={savePalette}
                    title="Pick a Palette Emoji"
                />
            </Dialog>

            <Dialog open={stage === "form"} onClose={hideForm}>
                <DialogTitle>Choose a Palette Name</DialogTitle>

                <ValidatorForm onSubmit={showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                            Please Enter a Name for your Palette. Make sure it's unique.
                        </DialogContentText>

                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"              //VERY important: used for [evt.target.value] in handleChange
                            onChange={handleChange}
                            validators={["required", "isPaletteNameUnique"]}
                            errorMessages={["Enter Palette Name", "Name already used"]}
                            fullWidth
                            margin="normal"
                            autoFocus                       //when opening the save palette form, it will focus on the text input
                        />

                        {/* below replaced by TextValidator */}
                        {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    /> */}
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={hideForm}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </DialogActions>

                </ValidatorForm>

            </Dialog>
        </div>
    );
}

export default PaletteMetaForm;
