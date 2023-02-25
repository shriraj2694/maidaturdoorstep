// App.js
const mysql = require('mysql');
const session = require('express-session'); 
const path = require('path');
const express = require("express");
	// mongoose = require("mongoose"),
	// passport = require("passport"),
const 	bodyParser = require("body-parser");
	// LocalStrategy = require("passport-local"),
	
// 	passportLocalMongoose =
// 		require("passport-local-mongoose")
 const User = require("./model/User");
const app = express();

// mongoose.connect("mongodb://0.0.0.0:27017/");
const connection = mysql.createConnection({
    host: "localhost",
    user: "user1",
    password: "root",
    database: "userdb"
});

// checking error in database connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!  http://localhost:3000/");
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(require("express-session")({
// 	secret: "Rusty is a dog",
// 	resave: false,
// 	saveUninitialized: false
// }));

// app.use(passport.initialize());   
// app.use(passport.session());
// app.use(express.static("css")); 
app.use(express.static("views"));
app.use(express.static("images")); 
app.use('/css', express.static(__dirname + '/css'));
// app.use('/images', express.static(__dirname + '/images'));
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("index");
});
// Showing about
app.get("/about", function (req, res) {
	res.render("about.ejs");
});
// Showing cart
app.get("/myorders", function (req, res) {
	res.render("cart.ejs");
});


// Showing secret page
// app.get("/secret", isLoggedIn, function (req, res) {
// 	res.render("secret");
// });

// Showing signin form
app.get("/signin", function (req, res) {
	res.render("signin");
});


// // Handling user signup
// app.post("/register", async (req, res) => {
// 	const user = await User.create({
// 		firstname: req.body.firstname,
// 		lastname: req.body.lastname,
// 		emailId: req.body.emailId,
// 		city: req.body.city,
// 		state: req.body.state,
// 		pincode: req.body.pincode,
// 		password: req.body.password,


// 	});
	
	
// 	return res.status(200).json(user);
// });

app.post('/signinuser', function (req, res) {
    // signup code

    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.username;

    if (email && password && name) {

        connection.query('INSERT INTO user (email,name,password) VALUES (?, ?, ?)', [email,name,password], function (err) {

            if (err) throw err;
			res.redirect('/login');
            // res.send('Signed up succcessfully!!!');
            //  res.send('To continue  Please login');
             
            //  res.redirect('/');
            res.end();
        });
    }
});

//Showing login form
 app.get("/login", function (req, res) {
 	res.render("login");
 });

//Handling user login
//  app.post("/login", async function(req, res){
// 	try {
// 		// check if the user exists
// 		const user = await User.findOne({ username: req.body.username });
// 		if (user) {
// 		//check if password matches
// 		const result = req.body.password === user.password;
// 		if (result) {
// 			res.render("secret");
// 		} else {
// 			res.status(400).json({ error: "password doesn't match" });
// 		}
// 		} else {
// 		res.status(400).json({ error: "User doesn't exist" });
// 		}
// 	} catch (error) {
// 		res.status(400).json({ error });
// 	}
 //});

 // login code
app.post('/login', function (req, res) {
    // console.log('hiiii............');


    let username = req.body.username;
    let password = req.body.password;



    if (username && password) {
        connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [username, password], function (err, results, fields) {

            if (err) throw err;

            if (results.length > 0) {
                console.log("hi....");
                req.session.loggedin = true;
                req.session.username = username;
                var username = results[0].Name;
                req.session.name = username;
                // res.redirect('/',{user: username});
                res.render('loggedin', { user: username });
                res.end();
            } else {

                console.log('Hello');

                res.send('<a  href="http://localhost:3000/login">Please enter correct username or password</a><br><br><a  href="http://localhost:3000/signin">Please SignUp</a>');

                res.end();
            
            }
            
        });
    }
});
// routing to home page
app.get('/', function (req, res) {
    var user = 'login';
    if(req.session.loggedin){
        user = req.session.name;
    }
    res.render('index', { user: user });
});


//Handling user logout
app.get("/logout", function (req, res) {
	req.session.loggedin=false;
    res.redirect('/');
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/login");
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
  
app.get("/babysitting", function (req, res) {
	res.render("babysitting");
});
