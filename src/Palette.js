import { useState } from "react";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";
import "./Palette.css"

function Palette(props) {
    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const { colors, paletteName, emoji } = props.palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color[format]} name={color.name} key={color.id}/>
    ))

    const changeLevel = (newLevel) => {
        setLevel(newLevel)
    }

    //val = e.target.value passed by child Navbar Component
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
            <footer className="Palette-footer">
                {paletteName}
                <span className="emoji">{emoji}</span>
            </footer>
        </div>
    )
}

export default Palette