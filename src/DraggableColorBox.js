import Box from "@mui/system/Box";

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        curosr: "pointer",
        verticalAlign: "top"
    }
}

function DraggableColorBox(props) {
    return (
        <Box sx={styles.root} style={{ backgroundColor: props.color }}>
            {props.name}
        </Box>
    )
}

export default DraggableColorBox;
