import MiniPalette from "./MiniPalette"
import { Link } from "react-router-dom"

function PaletteList(props) {
    const { palettes } = props
    return (
        <div>
            <MiniPalette />
            <h1>React colors</h1>
            {palettes.map(palette => (
                <MiniPalette {...palette} key={palette.id} />
            ))}
        </div>
    )
}

export default PaletteList