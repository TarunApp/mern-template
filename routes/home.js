const express = require('express')
const router = express.Router()
const authorize = require("../auth/authorize")


router.get('/',authorize, (req, res) => {
	res.send("Home")
})


module.exports = router