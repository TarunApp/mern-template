import {useContext, useState} from 'react'
import {UserContext} from '../UserContext'

const Home = (props) => {

	const [user, setUser] = useState({email: "", password: ""})


	const onInput = (e) => {
		setUser({...user, [e.target.name]: e.target.value})
	}

	const onForm = (e) => {
		e.preventDefault()
		console.log(user)
	}

	return (
		<div>
			<h1>Home</h1>	
			<form onSubmit={onForm}>
				<label htmlFor="email">Email</label>	
				<input htmlFor="email" onChange={onInput} value={user.email} name="email" type="text"/>	
				<label htmlFor="password">Password</label>	
				<input htmlFor="password" onChange={onInput} value={user.password} name="password" type="text"/>
				<input type="submit" value="Submit"/>
			</form>
		</div>
		)
}


export default Home