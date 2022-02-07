import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


function PaletteMetaForm({ palettes, handleSubmit }) {

    //be carefully open set to true when use a button to trigger Dialog open/close
    const [open, setOpen] = useState(true);
    const [newPaletteName, setNewPaletteName] = useState("")        //used for Validation component for material-ui forms

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
            return palettes.every((palette) => palette.paletteName.toLowerCase() !== value.toLowerCase())
        })
    }, [newPaletteName])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose a Palette Name</DialogTitle>

                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="primary" type="submit">Save Palette</Button>
                    </DialogActions>

                </ValidatorForm>

            </Dialog>
    );
}

export default PaletteMetaForm;
