var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('signin.html'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/MaidAtUrDoorstep/login',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.set('strictQuery', false);

var db = mongoose.connection;

db.on('error', ()=>console.log("error in db"));
db.once('open', ()=>console.log("connected"));

app.post("/login", (req,res)=>{
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

    return res.redirect('signin.html');
})

app.get("/", (req,res) => {
    res.set({
        "Allow-access-Allow-Origin" : '*'
    })
}).listen(3000);

console.log("on 3000");