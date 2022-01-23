import React from 'react';
import { useParams } from 'react-router';
import { generatePalette } from './colorHelpers';
import seedColors from './seedColors';
import ColorBox from './ColorBox';

function SingleColorPalette() {
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
            background={color.hex}
            showLink={false}        //hide the MORE button and Link
        />
    ))

    return (
        <div className="Palette">
            <h1>Single Color Palette</h1>
            <div className="Palette-colors">{colorBoxes}</div>
        </div>
    )
}

export default SingleColorPalette;

