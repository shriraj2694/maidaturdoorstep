var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/signin');

var db = mongoose.connection;

app.post("/signup", (req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;

    var data = {
        "name":name,
        "email":email,
        "phone":phone,
        "password":password,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('sigin.html');
})

app.get("/", (req,res) => {
    res.set({
        "Allow-access-Allow-Origin" : '*'
    })
}).listen(3000);

console.log("on 3000");