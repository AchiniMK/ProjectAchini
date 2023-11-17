const userSchema = require('../model/UserSchema')
const bcrypt = require('bcrypt');


const signup = async (req, resp) => {
	userSchema.findOne({ email: req.body.email }).then((result) => {
			if (result == null) {
				bcrypt.hash(req.body.password, 10, function (err, hash) {
					if (err) {
						return resp.status(500).json({ message: "something went wrong!" });
					}
					const user = new userSchema({
						email: req.body.email,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						phoneNo: req.body.phoneNo,
						password:req.body.password
					});
					user.save().then((savedData) => {
							resp.status(201).json({ message: "user was saved!" });
						})
						.catch((error) => {
							resp.status(500).json(error);
						});
				});
			} else {
				resp.status(409).json({ message: "already exists!" });
			}
		})
		.catch((error) => {
			resp.status(500).json(error);
		});
};

const login = async (req, resp) => {
	userSchema.findOne({ email: req.body.email }).then(result => {
			if (result == null) {
				return resp.status(404).json({ message: " Email not found!" });
			} else {
				bcrypt.compare(req.body.password, result.password, function (err, result) {
					if(err){
						return resp.status(500).json(err);
					}
					if(result){
					return resp.status(200).json({ token: " token data" });	
					}else{
					return resp.status(401).json({ message: " password is incorrect" });	
					}
				});
				
			}
		
		}).catch(error => {
			resp.status(500).json(error);
		});
};



module.exports = {
	signup,
	login
};
