export default {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        overflow: "auto",
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
        "@media screen and (max-width: 1600px)": {
            width: "80%",
        },
        "@media screen and (max-width: 575.98px)": {
            width: "75%",
        }
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
        "@media screen and (max-width: 991.98px)": {
            gridTemplateColumns: "repeat(2, 50%)",
        },
        "@media screen and (max-width: 575.98px)": {
            gridTemplateColumns: "repeat(1, 100%)",
            gap: "1.4rem",
        }
    }
}