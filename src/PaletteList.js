import { Link } from "react-router-dom"

function PaletteList(props) {
    const { palettes } = props
    return (
        <div>
            <h1>React colors</h1>
            {palettes.map(palette => (
                <p key={palette.id}>
                    <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
                </p>
            ))}
        </div>
    )
}

export default PaletteList