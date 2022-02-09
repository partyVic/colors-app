import React from "react";
import { memo } from "react";
import { Box } from "@mui/system"
import styles from "./styles/MiniPaletteStyles"
import DeleteIcon from '@mui/icons-material/Delete';

function MiniPalette(props) {
    const { paletteName, emoji, colors, handleDelete, id, openDialog, gotoPalette } = props

    console.log(`Rendering ${paletteName}`)

    const miniColorBoxes = colors.map((color) => (
        <Box
            sx={styles.miniColor}
            // style={{ backgroundColor: color.color }}
            bgcolor={color.color}
            key={color.name}>
        </Box>
    ))

    const deletePalette = (e) => {
        e.stopPropagation()
        // handleDelete(id)       //handled by <Dialog> in lecture 238
        openDialog(id)            //openDialog(id) replace the previous handleDelete, pass UP the id to parent <PaletteList>
    }

    return (
        <Box sx={styles.root} onClick={gotoPalette}>

            <DeleteIcon
                sx={styles.deleteIcon}
                onClick={deletePalette}
            />

            <Box sx={styles.colors}>
                {miniColorBoxes}
            </Box>

            <Box sx={styles.title} component="h5">
                {paletteName} <Box component="span" sx={styles.emoji}>{emoji}</Box>
            </Box>
        </Box>
    )
}

//advanced use of React.memo to prevent re-rendering of MiniPalette
// ONLY memo(Component) NOT working
// MUST use memo(Component, ()=>true)
export default memo(MiniPalette, () => true)

