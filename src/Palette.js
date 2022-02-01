import { useState } from "react";
import { useParams } from "react-router";
import { generatePalette } from './colorHelpers'
import seedColors from "./seedColors";
import ColorBox from "./ColorBox"
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter"
import "./Palette.css"

function Palette(props) {
    const params = useParams()

    // helper function to find the palette from seed function (seedColors) [NOW changed to props.palettes]
    const findPalette = (id) => {
        return props.palettes.find(palette => (palette.id === id))
    }
    const palette = generatePalette(findPalette(params.id))

    const [level, setLevel] = useState(500)
    const [format, setFormat] = useState("hex")
    const { colors, paletteName, emoji, id } = palette

    const colorBoxes = colors[level].map(color => (
        <ColorBox
            background={color[format]}
            name={color.name}
            key={color.id}
            moreUrl={`/palette/${id}/${color.id}`}
            showLink={true}                             //show the MORE button and Link
        />
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
                showingAllColors                //same as showingAllColors = {true}
            />
            <div className="Palette-colors">
                {colorBoxes}
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    )
}

export default Palette