import MiniPalette from "./MiniPalette"
import { Box } from "@mui/system"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import styles from './styles/PaletteListStyles'

function PaletteList(props) {
    const { palettes } = props
    const navigate = useNavigate()

    const gotoPalette = (id) => {
        navigate(`/palette/${id}`)
    }

    return (
        <Box sx={styles.root}>
            <Box sx={styles.container}>
                <Box component="nav" sx={styles.nav}>
                    <h1>React Colors</h1>
                    <Link to="/palette/new">Create Palette</Link>
                </Box>
                <Box sx={styles.palettes}>
                    {palettes.map(palette => (
                        <MiniPalette {...palette} gotoPalette={() => gotoPalette(palette.id)} key={palette.id} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default PaletteList