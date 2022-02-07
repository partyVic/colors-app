import Box from "@mui/system/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from "react-sortable-hoc";
import styles from './styles/DraggableColorBoxStyles'


const DraggableColorBox = SortableElement((props) => {
    return (
        <Box sx={styles.root} style={{ backgroundColor: props.color }}>
            <Box sx={styles.boxContent}>
                <Box component="span">{props.name}</Box>
                <DeleteIcon sx={styles.deleteIcon} onClick={props.handleClick} />
            </Box>
        </Box>
    )
})

export default DraggableColorBox;

//***** another way to use HOC *****
// export default SortableContainer(DraggableColorBox)
