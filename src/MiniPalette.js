import { Box } from "@mui/system"

const root = {
    bgColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
        cursor: "pointer"
    }
}
const colors = {
    bgColor: "grey",
}
const title = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
}
const spanEmoji = {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
}

function MiniPalette(props) {
    const { paletteName, emoji } = props
    return (
        <Box sx={root}>
            <Box sx={colors} />
            <Box sx={title} component="h5">
                {paletteName} <Box component="span" style={{ spanEmoji }}>{emoji}</Box>
            </Box>
        </Box>
    )
}

export default MiniPalette