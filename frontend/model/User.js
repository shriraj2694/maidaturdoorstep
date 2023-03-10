// User.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	emailId: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	pincode: {
		type: String
	},
	password: {
		type: String
	}

})

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)
