import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApis } from "./Api";

function AuthPage() {

  let navigate = useNavigate()

  // Signup creds
  const [suser, setSuser] = useState('')
  const [semail, setSemail] = useState('')
  const [spswd, setSpswd] = useState('')

  // Login Creds
  const [lemail, setLemail] = useState('')
  const [lpswd, setLpswd] = useState('')

  async function handleSignup() {
    const headers = { 'Content-Type': 'application/json' }
    const userinfo = {
      username: suser,
      email: semail,
      password: spswd
    }
    const api = userApis.userSignup
    let resp = await fetch(api.url, {
      method: api.method,
      headers: headers,
      body: JSON.stringify(userinfo)
    });
    if (resp.ok) {
      let data = await resp.json()
      navigate('/dashboard/', { state: data })
    } else {
      throw Error(resp.status)
    }
  };

  async function handleLogin() {
    const headers = { 'Content-Type': 'application/json' }
    const userinfo = {
      email: lemail,
      password: lpswd
    }
    const api = userApis.userLogin
    let resp = await fetch(api.url, {
      method: api.method,
      headers: headers,
      body: JSON.stringify(userinfo)
    });
    if (resp.ok) {
      let data = await resp.json()
      console.log(data)
      navigate('/dashboard/', { state: data })
    } else {
      throw Error(resp.status)
    }
  };

  const preventRefresh = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <h1>SignUp</h1>
        <form action="" name="signup_form" onSubmit={preventRefresh}>
          <label htmlFor="name">Username</label>
          <input
            className="field"
            autoComplete="username"
            type="text"
            value={suser}
            onChange={(e) => setSuser(e.target.value)}
            required />

          <label htmlFor="email">Email</label>
          <input
            className="field"
            autoComplete="email"
            type="text"
            value={semail}
            onChange={(e) => setSemail(e.target.value)}
            required />

          <label htmlFor="password">Password</label>
          <input
            className="field"
            autoComplete="password"
            type="password"
            value={spswd}
            onChange={(e) => setSpswd(e.target.value)}
            required />

          <p className="error error--hidden" />

          <input className="btn" type="submit" value="SignUp" onClick={handleSignup} />
        </form>
      </div>
      <div className="card">
        <h1>Login</h1>
        <form action="" name="login_form" onSubmit={preventRefresh}>
          <label htmlFor="name">Email</label>
          <input
            className="field"
            autoComplete="username"
            type="text"
            value={lemail}
            onChange={(e) => setLemail(e.target.value)}
            required />

          <label htmlFor="password">Password</label>
          <input
            className="field"
            autoComplete="password"
            type="password"
            value={lpswd}
            onChange={(e) => setLpswd(e.target.value)}
            required />

          <p className="error error--hidden" />

          <input className="btn" type="submit" value="Login" onClick={handleLogin} />
        </form>
      </div>
    </div>
  );
}

export default AuthPage
