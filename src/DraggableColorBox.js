import Box from "@mui/system/Box";
import DeleteIcon from '@mui/icons-material/Delete';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        curosr: "pointer",
        verticalAlign: "top",
        "&:hover svg":{
            color:"white",
            transform:"scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display:"flex",
        justifyContent: 'space-between',
    },
    deleteIcon:{
        transition:"all 0.3s ease-in-out"
    }
}

function DraggableColorBox(props) {
    return (
        <Box sx={styles.root} style={{ backgroundColor: props.color }}>
            <Box sx={styles.boxContent}>
            <Box component="span">{props.name}</Box>
            <DeleteIcon sx={styles.deleteIcon}/>
            </Box>
        </Box>
    )
}

export default DraggableColorBox;
