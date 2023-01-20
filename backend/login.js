const express = require('express');
const app = express();
require("./db/conn");

app.get("/", (req, res)=>{
    res.send("Welcome to the page");
})




  

