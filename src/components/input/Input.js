import React, { useState, useEffect } from 'react'
import classes from './Input.module.css'

const hasNumber = /\d+/g
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
)

function Input(props) {
	const [email, setEmail] = useState('')
	const [validateEmail, setValidateEmail] = useState(false)
	const [login, setLogin] = useState('')
	const [validateLogin, setValidateLogin] = useState(false)
	const [password, setPassword] = useState('')
	const [validatePassword, setValidatePassword] = useState(false)

	const [validateForm, setValidateForm] = useState(false)
	useEffect(() => {
		setValidateForm(
			password.trim().length > 4 &&
				email.match(validEmailRegex) !== null &&
				login.match(hasNumber) !== null,
		)
	}, [validateForm, email, login, password])

	const emailChangeHandler = (event) => {
		setEmail(event.target.value)
	}

	const loginChangeHandler = (event) => {
		setLogin(event.target.value)
	}
	const passwordChangeHandler = (event) => {
		setPassword(event.target.value)
	}

	const validateEmailHandler = () => {
		setValidateEmail(email.match(validEmailRegex) !== null)
	}
	const validateLoginHandler = () => {
		setValidateLogin(login.match(hasNumber) !== null)
	}
	const validatePasswordHandler = () => {
		setValidatePassword(password.trim().length > 4)
	}
	const submitHandler = (event) => {
		let p = password.split('')
		let lastTwo = p.slice(0, 2)
		let pass = p.reverse().concat(lastTwo).join('')

		event.preventDefault()

		props.getInpLog(email, login, pass)
	}

	const errLog = <p>введите в поле login цифры )</p>
	const errPass = <p>введите пароль введите больше 4 символов )</p>
	return (
		<form className='form' onSubmit={submitHandler}>
			{!validateLogin && errLog}
			{!validatePassword && errPass}
			<div
				className={classes.control}
				className={`${classes.control} ${
					validateEmail === false ? classes.invalid : ''
				}`}
			>
				<label>Email </label>
				<input
					value={email}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					type='email'
				/>
			</div>
			<div
				className={classes.control}
				className={`${classes.control} ${
					validateLogin === false ? classes.invalid : ''
				}`}
			>
				<label>Username </label>
				<input
					placeholder=''
					value={login}
					onBlur={validateLoginHandler}
					onChange={loginChangeHandler}
					type='text'
				/>
			</div>
			<div
				className={classes.control}
				className={`${classes.control} ${
					validatePassword === false ? classes.invalid : ''
				}`}
			>
				<label>Password </label>
				<input
					value={password}
					onBlur={validatePasswordHandler}
					onChange={passwordChangeHandler}
					type='password'
				/>
			</div>
			<button type='submit' disabled={!validateForm}>
				Sign in
			</button>
		</form>
	)
}

export default Input
