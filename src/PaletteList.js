import MiniPalette from "./MiniPalette"
import { Box } from "@mui/system"
import { useNavigate } from "react-router"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom"
import styles from './styles/PaletteListStyles'
import './PaletteList.css'

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
                    <Box component="h1" sx={styles.heading}>React Colors</Box>
                    <Link to="/palette/new">Create Palette</Link>
                </Box>

                {/* <Box sx={styles.palettes}> */}
                <TransitionGroup className="palettes">
                    {palettes.map(palette => (
                        // !!!!! important! CSSTransition using classNames, pluralized! NOT className
                        // when use the "fade" class name, make sure the CSS style sheet uses fade-xxx as well 
                        <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                            <MiniPalette
                                {...palette}
                                gotoPalette={() => gotoPalette(palette.id)}
                                key={palette.id}
                                // id={palette.id}
                                handleDelete={props.deletePalette}
                            />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                {/* </Box> */}
            </Box>
        </Box>
    )
}

export default PaletteList