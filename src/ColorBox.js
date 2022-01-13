import { useState, useEffect } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import "./ColorBox.css"

function ColorBox(props) {
    const { background, name } = props
    const [copied, setCopied] = useState(false)

    //below way to use callback is highly NOT recommended, use useEffect instead
    // const changeCopyState = () => {
    //     setCopied(true, setTimeout(()=>{
    //         setCopied(false)
    //     },1500))
    // }

    const changeCopyState = () => {
        setCopied(true)
    }
    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }, [copied])

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className="ColorBox">

                {/* below single div shows the single enlarged color*/}
                <div
                    style={{ background }}
                    className={`copy-overlay ${copied && "show"}`} />

                <div className={`copy-msg ${copied && "show"}`}>
                    <h1>copied</h1>
                    <p>{background}</p>
                </div>
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