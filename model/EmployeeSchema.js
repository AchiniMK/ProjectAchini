const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
	nic: { type: String, required: true },
	name: { type: String, required: true },
	address: { type: String, required: true },
	salary: { type: Number, required: true }
});
module.exports = mongoose.model("Employees", EmployeeSchema);