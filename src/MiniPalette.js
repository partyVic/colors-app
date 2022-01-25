import { Box } from "@mui/system"
import styles from "./styles/MiniPaletteStyles"


function MiniPalette(props) {
    const { paletteName, emoji, colors } = props

    const miniColorBoxes = colors.map((color) => (
        <Box
            sx={styles.miniColor}
            // style={{ backgroundColor: color.color }}
            bgcolor={color.color}
            key={color.name}>
        </Box>
    ))

    return (
        <Box sx={styles.root} onClick={props.gotoPalette}>
            <Box sx={styles.colors}>
                {miniColorBoxes}
            </Box>
            <Box sx={styles.title} component="h5">
                {paletteName} <Box component="span" sx={styles.emoji}>{emoji}</Box>
            </Box>
        </Box>
    )
}

export default MiniPalette