const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const db = require('./config/keys').MongoURI
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Error: " + err))




const app = express()
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())


// Start Routes
app.use("/auth", require("./routes/jwtauth"))
app.use("/", require("./routes/home"))

app.listen(5000, () => {
	console.log("Server Started on port 5000")
})