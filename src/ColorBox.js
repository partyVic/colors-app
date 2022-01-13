import { CopyToClipboard } from "react-copy-to-clipboard"
import "./ColorBox.css"

function ColorBox(props) {
    const { background, name } = props
    return (
        <CopyToClipboard text={background}>
            <div style={{ background }} className="ColorBox">
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <button className="copy-button">Copy</button>
                </div>
                <span className="see-more">More</span>
            </div>
        </CopyToClipboard>
    )
}

export default ColorBox