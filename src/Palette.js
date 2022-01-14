import { useState } from "react";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";
import "./Palette.css"

function Palette(props) {
    const [level, setLevel] = useState(500)
    const { colors } = props.palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox background={color.hex} name={color.name} />
    ))

    const changeLevel = (newLevel) => {
        setLevel(newLevel)
    }

    return (
        <div className="Palette">
            <Navbar level={level} changeLevel={changeLevel} />
            <div className="Palette-colors">
                {colorBoxes}
            </div>
        </div>
    )
}

export default Palette