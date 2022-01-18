import { Box } from "@mui/system"

const main = {
    backgroundColor: "Purple",
    border: "3px solid teal",
}

const secondary = {
    backgroundColor: "Pink",
    "& h1": {
        color: "white",
        "& span": {
            backgroundColor: "yellow"
        }
    }
}

function MiniPalette() {
    return (
        <>
            <Box sx={main}>
                <div>
                    <h1>Mini Palette</h1>
                </div>
            </Box>
            <Box sx={secondary}>
                <section>
                    <h1>Mini Palette <span>Hello</span></h1>
                </section>
                <span>Hello outside</span>
            </Box >
        </>
    )
}

export default MiniPalette