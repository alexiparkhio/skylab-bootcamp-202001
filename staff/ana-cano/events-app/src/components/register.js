import React from 'react'

export default

function Register({onRegister, goToLogin}){
    return <form action="/register" method="POST" onSubmit={(event)=> {
        event.preventDefault()

        const name = event.target.name.value
        const surname = event.target.surname.value
        const email = event.target.email.value
        const password = event.target.password.value

        onRegister({name, surname, email, password})
    }}>

    <input type="text" name="name" placeholder="name"/>
    <input type="text" name="surname" placeholder="surname"/>
    <input type="email" name="email" placeholder="email"/>
    <input type="password" name="password" placeholder="password"/>
    <button type="submit">Register</button>
    <a href="" onClick={goToLogin}>Go to Login</a>
    </form>

    }
