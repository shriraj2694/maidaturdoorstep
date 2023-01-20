const express = require('express');
const app = express();
const port  = process.env.PORT || 5500;
app.get("/", (req, res)=>{
    res.send("Welcome to the page");
});

app.listen(port,() => {
    console.log('server is running at port no.');
});

