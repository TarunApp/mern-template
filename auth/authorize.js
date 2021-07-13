const jwt = require('jsonwebtoken')


// Middleware for authorization when logging in 

module.exports = function(req, res, next){


	const token = req.headers.jwt_token
	console.log(token)
	if(!token){
		console.log("Error no token")	

		return res.status(403).json({msg: "No valid credentials"})
	}


try{
	const verify = jwt.verify(token.toString(), 'secret')
	// Change JWT secret and put into env 

	req.user = verify.user
	next()
}catch(err){
	console.log(token)
	console.log(err) //JWT Malformed is from authorize middleware. When JWT is undefined, this error occurs
	res.status(401).json({msg: "Invalid Token or No Token"}) //Unauthorized Err
}

}

