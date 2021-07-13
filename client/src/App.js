import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import Home from './components/Home'
// import {UserContext} from './UserContext'

function App() {

  const [auth, setAuth] = useState(false)

  const authorized = async () => {
    const res = await fetch('http://localhost:5000/auth/verify', {
      method: "POST",
      headers: {jwt_token: localStorage.token}
    })


    const jsonres = await res.json()
    console.log(jsonres)

    if(jsonres === true){
      setAuth(true)
    }else{
      setAuth(false)
    }
  }

  useEffect(() => {
    authorized()
  }, [])

  const authprop = (boolean) => {
    setAuth(boolean)
  }


  return (

    <div>
      <Router>
        
        <Route exact path="/login" render={props => !auth ? <Login {...props} setAuth={authprop} /> : <Redirect to="/dashboard"/>}  />

        <Route exact path="/dashboard" render={props =>   auth ? <Dashboard setAuth={authprop} /> : <Redirect to="/login"/>} />

        <Route exact path="/register" render={props => !auth ? <Register {...props} setAuth={authprop}  /> : <Redirect to="/dashboard" />} />

        <Route path="/home" component={Home} />

      </Router>
    </div>
     
  );
}

export default App;
