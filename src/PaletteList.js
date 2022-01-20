import MiniPalette from "./MiniPalette"
import { Box } from "@mui/system"
import { useNavigate } from "react-router"

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        color: "white",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gap: "2.5rem",
    }
}

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