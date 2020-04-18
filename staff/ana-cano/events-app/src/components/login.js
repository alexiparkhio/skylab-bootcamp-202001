import React from 'react'

export default

function Login({onLogin, goToRegister}){
    return <form action="/register" method="POST" onSubmit={(event)=> {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        onLogin({email, password})
    }}>
   
<input type="email" name="email" placeholder="email"/>
<input type="password" name="password" placeholder="password"/>
<button type="submit">Login</button>
<a href="" onClick={goToRegister}>Go to register</a>
</form>

}
