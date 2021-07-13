import {useState} from 'react'



const Register = (props) => {

	const [userData, setData] = useState({name: "", email: "", password: ""})

	const InputData = (e) => {
		// console.log(e.target.name)
		setData({...userData, [e.target.name] : e.target.value})
	}


	const onFormSubmit = async (e) => {
		e.preventDefault()
		console.log(userData)

		const req = await fetch("http://localhost:5000/auth/register", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(userData)
		})

		const res = await req.json()
		console.log(res)
	}

	return (

		<div>
			<form >
				
			<label htmlFor="name">Name</label>
			<input name="name" onChange={InputData} value={userData.name} htmlFor="name" type="text"/>

			<label htmlFor="email">Email</label>
			<input name="email" onChange={InputData} value={userData.email} htmlFor="email" type="text"/>

			<label htmlFor="password">Password</label>
			<input name="password" onChange={InputData} value={userData.password} htmlFor="password" type="password"/>

			<button onClick={onFormSubmit}>Submit</button>
			</form>	
		</div>

		)
}

export default Register