export default {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        overflow:"auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        color: "white",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gap: "2.5rem",
    }
}