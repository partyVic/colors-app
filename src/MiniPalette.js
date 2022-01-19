import { Box } from "@mui/system"

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "grey",
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    }
}

function MiniPalette(props) {
    const { paletteName, emoji } = props
    return (
        <Box sx={styles.root}>
            <Box sx={styles.colors} />
            <Box sx={styles.title} component="h5">
                {paletteName} <Box component="span" sx={styles.emoji}>{emoji}</Box>
            </Box>
        </Box>
    )
}

export default MiniPalette