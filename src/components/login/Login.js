import React from 'react'
import classes from './Login.module.css'
function Login(props) {
	return (
		<div>
			<h1 >HI USER YOU SIGNED IN</h1   >
			<button onClick={props.onLogout}>Logout</button>
		</div>
	)
}

export default Login
