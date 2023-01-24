const express = require("express");
const login = express();
require("./db/conn");

const port = process.env.PORT || 3000;
// http://localhost:3000/
login.get("/", (req, res) => {
    res.send("Hello")
});

login.listen(port, () => {
    console.log("Server at port ${port}");
});