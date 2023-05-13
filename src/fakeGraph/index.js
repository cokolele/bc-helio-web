const express = require("express")
const app = express()

app.get("/simulation/:uuid/spectrum", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    res.type("application/octet-stream")
        .status(200)
        .sendFile("graph.dat", { root: __dirname })
    //.sendFile("graph.dat", { root: __dirname, maxAge: 2592000000 })
})

app.listen(8080, () => console.log("Running!"))