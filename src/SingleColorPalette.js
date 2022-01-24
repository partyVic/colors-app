import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { generatePalette } from './colorHelpers';
import Navbar from './Navbar';
import seedColors from './seedColors';
import PaletteFooter from "./PaletteFooter"
import ColorBox from './ColorBox';

function SingleColorPalette() {
    const [format, setFormat] = useState("hex")

    const params = useParams()

    // helper function to find the palette from seed function (seedColors)
    const findPalette = (id) => {
        return seedColors.find(palette => (palette.id === id))
    }
    const palette = generatePalette(findPalette(params.paletteId))

    const gatherShades = (palette, colorToFilterBy) => {
        let shades = []
        let allColors = palette.colors

        //loop over an object
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        //return all shades of given color (except level 50)
        return shades.slice(1)
    }

    const shades = gatherShades(palette, params.colorId)

    const colorBoxes = shades.map(color => (
        <ColorBox
            key={color.name}
            name={color.name}
            background={color[format]}
            showLink={false}        //hide the MORE button and Link
        />
    ))

    const changeFormat = (val) => {
        setFormat(val)
    }

    return (
        <div className="Palette">
            <Navbar
                changeFormat={changeFormat}
                showingAllColors={false}        //used for on/off changeLevel Slider
            />
            <div className="Palette-colors">{colorBoxes}</div>
            <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji}/>
        </div>
    )
}

export default SingleColorPalette;

