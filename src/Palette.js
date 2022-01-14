import { useState } from "react";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";
import "./Palette.css"

function Palette(props) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const { colors } = props.palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} />
    ))

    const changeLevel = (newLevel) => {
        setLevel(newLevel)
    }

    const changeFormat = (val) => {
        setFormat(val)
    }

    return (
        <div className="Palette">
            <Navbar
                level={level}
                changeLevel={changeLevel}
                changeFormat={changeFormat}
            />
            <div className="Palette-colors">
                {colorBoxes}
            </div>
        </div>
    )
}

export default Palette