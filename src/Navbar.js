import { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import { Select, MenuItem, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar({ level, changeLevel, changeFormat, showingAllColors }) {
    const [format, setFormat] = useState("hex")
    const [open, setOpen] = useState(false)          //used to set the Snackbar showing on/off

    // ****** this function calls 2 functions ******
    const handleFormatChange = (e) => {
        setFormat(e.target.value)
        changeFormat(e.target.value)
        setOpen(true)
    }

    const closeSnackbar = () => {
        setOpen(false)
    }


    return (
        <header className="Navbar">
            <div className="logo">
                <Link to="/">React&nbsp;Color&nbsp;Picker</Link>
            </div>

            {showingAllColors && <div className="slider-container">
                <span>Level: {level}</span>
                <div className="slider">
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}

                        //in-line style recommended by re-slider
                        trackStyle={[{ backgroundColor: "transparent" }]}
                        handleStyle={[
                            {
                                backgroundColor: "green",
                                outline: "none",
                                border: "2px solid green",
                                boxShadow: "none",
                                width: "13px",
                                height: "13px",
                                marginLeft: "-7px",
                                marginTop: "-3px",

                            },
                        ]}
                        railStyle={{ height: "8px" }}
                    />
                </div>
            </div>
            }

            <div className="select-container" style={{ width: "300px" }}>
                <Select
                    onChange={handleFormatChange}
                    value={format}
                >
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}  //show the orginal position of Snackbar
                open={open}
                autoHideDuration={3000}
                message={<span id="message-id">Format changed to {format.toUpperCase()}</span>}
                ContentProps={{                 //used for screen reader
                    "aria-describedby": "message-id"
                }}
                // Do NOT use onClose while the Snakebar has import message
                onClose={closeSnackbar}         //used for close the Snakebar when click anywhere of the screen without just click the X button
                action={[
                    <IconButton
                        onClick={closeSnackbar}
                        color="inherit"
                        key="close"             // used for screen reader
                        aria-label="close"      // used for screen reader
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </header>
    )
}

export default Navbar