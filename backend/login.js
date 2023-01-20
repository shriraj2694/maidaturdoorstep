const express = require('express');
const app = express();
const port = 5500;

app.get("/", (req, res)=>{
    res.send("Welcome to the page");
})

app.listen(port , () => {
    console.log(listening to the port at ${port})
})

  

