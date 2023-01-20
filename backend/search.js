const express = require('express');
const app = express();
const port = process.env.PORT || 5500;

app.get("/", (req, res)=>{
    res.send("Welcome to the page");
})

//validation code for inputs
var Name = document.forms['form']['Name'];
var City = document.forms['form']['City'];
var Area = document.forms['form']['Area'];
var Service = document.forms['form']['Service'];\

function validated(){
    if ()
}
  

