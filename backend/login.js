const express = require('express');
const path = require("path");
const app = express();
require("./db/conn");
const port  = process.env.PORT || 3000;
app.get("/", (req, res)=>{
    res.send("Welcome to the page");
});

app.listen(port,() => {
    console.log('server is running at port no ');
});



  

