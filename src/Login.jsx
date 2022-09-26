import React from 'react';
import "./Css/Login.css";

function Login() {
  return (
    <div className='login'>
    <h1> Sign In</h1>
    <div className='container'>
      <div className='top'>
        {/* <i class='fab fa-google'></i>
        <i class='fab fa-facebook-square'></i>
        <i class='fab fa-linkedin'></i>
        <i class='fab fa-twitter-square'></i>
        <i class='fab fa-apple'></i> */}
        <i class="fa-brands fa-microsoft"></i>
        <h3>Sign in with Outlook</h3>
      </div>
      <p className='divider'><span>Or</span></p>
      <form>
        <label>E-mail</label>
        <input type='email' placeholder='Enter your email' />
        <label>Password</label>
        <input type='password' placeholder='Enter your password' />
        {/* <div className='remember'>
          <input type='checkbox' checked='checked' />
          <p>Remember Me</p>
        </div> */}
        <button>Log In</button>
      </form>
      <div className='bottom'>
        <a className='a' href='/'>Reset Password</a>
      </div>
      {/* <p className='create'>Create Account</p> */}
    </div>
  </div>
  )
}

export default Login