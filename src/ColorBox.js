import { useState, useEffect } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Link } from "react-router-dom"
import chroma from "chroma-js"
import "./ColorBox.css"

function ColorBox(props) {
    const { background, name, moreUrl, showLink } = props
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

    //used for change text color in different color of background
    const contrast = chroma.contrast(background, "black") < 6;

    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{ background }} className="ColorBox">

                {/* below single div shows the single enlarged color*/}
                <div
                    style={{ background }}
                    className={`copy-overlay ${copied && "show"}`} />

                <div className={`copy-msg ${copied && "show"}`}>
                    <h1>copied</h1>
                    <p className={!contrast ? "dark-text" : ""}>{background}</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={contrast ? "light-text" : null}>{name}</span>
                    </div>
                    <button className={`copy-button ${!contrast && "dark-text"}`}>Copy</button>
                </div>

                {showLink &&
                    <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
                        <span className={`see-more ${!contrast && "dark-text"}`}>More</span>
                    </Link>
                }

            </div>
        </CopyToClipboard>
    )
}

export default ColorBox