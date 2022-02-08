const styles = {
    Appbar: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: "64px"
    },
    root: {
        display: "flex"
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        },
        "@media screen and (max-width: 575.98px)": {
            marginRight: "0.5rem"
        }
    },
    button: {
        margin: "0 0.5rem",
        "@media screen and (max-width: 575.98px)": {
            margin: "0 0.2rem",
            padding: "0.3rem"
        }
    }
}

export default styles