const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwtoken = require("../auth/jsontoken.js") //For creating token
const authorize = require("../auth/authorize") //Check for token 

router.post('/register', (req, res) => {

	let userobj = {
		// name: "Jake",
		// password: 123,
		// email: "jake@gmail.com"
	}

	let {name, password, email} = req.body

	User.findOne({email: email})
	.then(user => {
		if(user){
			console.log("User is already registered")
			res.json({msg: "User is already registered"})
		}else{

			let newuser = new User({
				name: name,
				email: email,
				password: password
			})
			const jwtToken = jwtoken(email)

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newuser.password, salt, (err, hash) => {
					if(err) throw err;

					newuser.password = hash
					newuser.save()
					.then(user => {
						console.log('User Registered, please login')
						return res.json({jwtToken})
					})
					.catch(err => {
						console.log('err' + err)
						res.send("Error")
					})

				})
			})				

		}
	})

})

router.post("/login", async (req, res) => {
	
	// let loginobj = {
	// 	email: "asdjke123@gmail.com",
	// 	password: 'lorem'
	// }

	let {email, password} = req.body

	await User.findOne({email: email}, (err, user) => {
		if(user){
			console.log("user exists")

			bcrypt.compare(password.toString(), user.password.toString(), (err, userres) => {
				if(err){
					console.log(err)
					res.json({msg: "Error "})
				}
				if(userres){
					console.log(userres)
					const jwtToken = jwtoken(email)	
					return res.json({jwtToken}) //Route will send back json, which can be used with res.json()
				}else{
					console.log('Invalid values')
				}

			} )

		}else{
			console.log("No user")
			res.json({msg: "No user"})
		}
	})


	// res.send("test")
})


router.post("/verify", authorize, (req, res) => {

	try{
		return res.json(true)
	}catch(err){
		console.log(err)
		return res.json({msg: "error"})
	}

})

module.exports = router