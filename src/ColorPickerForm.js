import { useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import Button from '@mui/material/Button'
import { Box } from '@mui/system';
import './ColorPickerForm.css'

const styles = {
    root:{
        width:"100%"
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    colorNameInput: {
        width: "100%",
        // height: "70px"
    }
}

function ColorPickerForm({ paletteIsFull, addNewColor, colors }) {

    const [state, setState] = useState({
        currentColor: "teal",
        newColorName: ""                    //used for Validation component for material-ui forms
    })

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
            return colors.every((color) => color.name.toLowerCase() !== value.toLowerCase())
        })

        ValidatorForm.addValidationRule('isColorUnique', (value) => {
            return colors.every((color) => color.color !== state.currentColor)
        })
    }, [state])

    const updateCurrentColor = (newColor) => {
        setState({ ...state, currentColor: newColor.hex })
    }

    const handleChange = (evt) => {
        setState({ ...state, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = () => {
        const newColor = { color: state.currentColor, name: state.newColorName }
        addNewColor(newColor)
        setState({ ...state, newColorName: "" })
    }

    return (
        <Box sx={styles.root}>
            <ChromePicker
                color={state.currentColor}
                disableAlpha={true}
                onChangeComplete={updateCurrentColor}
            />

            <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
                <TextValidator
                    margin="normal"
                    variant="filled"
                    sx={styles.colorNameInput}
                    label="Color Name"
                    value={state.newColorName}
                    name="newColorName"                 //VERY important: used for [evt.target.value] in handleChange
                    onChange={handleChange}

                    //below arrays in validators & errorMessages the ORDER does matter
                    validators={['required', 'isColorNameUnique', "isColorUnique"]}
                    errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}
                />
                <Button
                    sx={styles.addColor}
                    variant="contained"
                    type="submit"                               //import to set type to let ValidatorForm works
                    color="primary"
                    disabled={paletteIsFull}
                    style={{ backgroundColor: paletteIsFull ? "grey" : state.currentColor }}
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </Box>
    );
}

export default ColorPickerForm;
