const jwt = require('jsonwebtoken')
//Serve the JWT Token

function jwtGen(email){
	const payload = {
		user: email	
	}


	return jwt.sign(payload, 'secret', {expiresIn: "1h"})
}


module.exports = jwtGen