const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema ({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNo: { type: String },
	password: { type: String, required: true}
	
});

module.exports = mongoose.model("Users", UserSchema);