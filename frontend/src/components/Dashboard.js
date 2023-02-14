import React from "react"
import { userApis } from "./Api"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

  let navigate = useNavigate()

  const handleLogout = () => {
    const headers = { 'Content-Type': 'application/json' }
    const api = userApis.userLogout
    fetch(api.url, {
      method: api.method,
      headers: headers,
      body: {}
    }).then((res) => {
      if (res.ok) {
        navigate('/')
      } else {
        throw Error(res.status)
      }
    })
  }

  return (
    <div className="card-wrapper">
      <div className="card">
        <h1 className="center">Dashboard</h1>
        <p className="center">You are currently signed in.</p>
        <div className="center">
          <button className="btn btn--secondary" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <div className="card">
        <h2 className="center">Your Info</h2>
        <p>
          Your Info Here
        </p>
      </div>
    </div>
  )
}

export default Dashboard
