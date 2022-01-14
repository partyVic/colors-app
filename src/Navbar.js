import { useState } from 'react';
import Slider from 'rc-slider';
import { Select, MenuItem } from '@mui/material';
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar({ level, changeLevel, changeFormat }) {
    const [format, setFormat] = useState("hex")

    const handleChange = (e) => {
        setFormat(e.target.value)
        changeFormat(e.target.value)
    }


    return (
        <header className="Navbar">
            <div className="logo">
                <a href="#">React Color Picker</a>
            </div>
            <div className="slider-container">
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
                            },
                        ]}
                        railStyle={{ height: "8" }}
                    />
                </div>
            </div>
            <div className="select-container" style={{ width: "300px" }}>
                <Select
                    onChange={handleChange}
                    value={format}
                >
                    <MenuItem value="hex">HEX - #ffffff</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
        </header>
    )
}

export default Navbar