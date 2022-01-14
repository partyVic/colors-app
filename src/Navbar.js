import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./Navbar.css"

function Navbar({ level, changeLevel }) {
    return (
        <header className="Navbar">
            <div className="logo">
                <a href="#">React Color Picker</a>
            </div>
            <div className="slider-container">
                <span>Level: {level}</span>
                <div className="slider">
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}

                        //in-line style recommended by re-slider
                        trackStyle={[{ backgroundColor: "transparent" }]}
                        handleStyle={[
                            {
                                backgroundColor: "green",
                                outline: "none",
                                border: "2px solid green",
                                boxShadow: "none",
                                width: "13px",
                                height: "13px",
                                marginLeft: "-7px",
                            },
                        ]}
                        railStyle={{ height: "8" }}
                    />
                </div>
            </div>
        </header>
    )
}

export default Navbar