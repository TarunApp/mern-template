import {useState, useContext} from 'react'
import {UserContext} from '../UserContext'


const Login = (props) => {


	const [userdata, setData] = useState({email: "", password: ""})
	
	const onSubmit = async (e) => {
		e.preventDefault()
		console.log(userdata)

		const res = await fetch("http://localhost:5000/auth/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(userdata)
		})


		const data = await res.json() //Getting data back from login route
		console.log(data)

		if(data.jwtToken){
			console.log("working")
			localStorage.setItem("token", data.jwtToken)
			props.setAuth(true)
		}else{
			props.setAuth(false)
		}
	}

	const onInput = (e) => {
		setData({...userdata, [e.target.name] : e.target.value})
	}

	return (
		<div>
			<h1>Login</h1>
			<p>Auth: {props.auth}</p>
			<form>
				<label htmlFor="email"></label>	
				<input onChange={onInput} name="email" value={userdata.email} htmlFor="email" type="text" />	

				<label htmlFor="password"></label>
				<input onChange={onInput} name="password" value={userdata.password} htmlFor="password" type="password"/>

				<button onClick={onSubmit}>Login</button>
			</form>
		</div>
		)

}


export default Login