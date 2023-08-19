const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, "First name is required."],
	},
	last_name: {
		type: String,
		required: [true, "Last name is required."],
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	email: {
		type: String,
		required: [true, "Email address is required."],
		unique: [true, "Email is already taken, please log in."],
	},
	phone_number: {
		type: String,
		default: null,
		unique: [true, "Phone number is already taken, please log in."],
		required: [true, "Phone number is required."],
	},
	password: {
		type: String,
		required: [true, "Password is required."],
	},
	token: {
		type: String,
	},
});

module.exports = mongoose.model("User", userSchema);
