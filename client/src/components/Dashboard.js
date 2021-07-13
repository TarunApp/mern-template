import {useState, useContext} from 'react'
import {UserContext} from '../UserContext'


const Dashboard = (props) => {


	const onLogout = (e) => {
		e.preventDefault()
		localStorage.clear()
		props.setAuth(false)
	}
 
	return (
		<div>
		<p>Auth: {props.auth}</p>
		<h1>Dashboard</h1>	

		<button onClick={onLogout}>Logout</button>

		</div>
		)
}


export default Dashboard