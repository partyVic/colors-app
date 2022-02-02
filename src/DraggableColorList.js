import { SortableContainer } from "react-sortable-hoc";
import DraggableColorBox from "./DraggableColorBox";

const DraggableColorList = SortableContainer((props) => {
    return (
        <div style={{ height: "100%" }}>
            {props.colors.map((color,i) => (
                <DraggableColorBox
                    color={color.color}
                    name={color.name}
                    key={color.name}
                    handleClick={() => props.removeColor(color.name)}

                    //below used for react-sortable-hoc
                    index={i}
                />
            ))}
        </div>
    );
})

export default DraggableColorList;

//***** another way to use HOC *****
// export default SortableContainer(DraggableColorList)
