import "./App.css"
import Posts from './Posts';
import {BrowserRouter as Router ,Switch, Route} from 'react-router-dom'
import Navbar from "./Navbar";
import Create from "./Create";
import Home from "./Home";
import PostDetails from "./PostDetails";
import Login from "./Login";
import Register from "./Register";
import React, {useEffect, useState} from "react";
import {AuthContext} from './Helper/AuthContext'
import axios from "axios";


function App() {
  const [authState, setAuthState] = useState(false)
  const [userVerify,setUserVerify] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem("accessToken")){
      setAuthState(true)
    };
    axios.get("http://localhost:3001/auth/check",{headers:{accessToken:sessionStorage.getItem("accessToken")}}).then((res) => {
      if(res.data.login){
        setUserVerify(true)
      }
    })
  },[authState,userVerify])
  return (
    <div>
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
      <Navbar />
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/posts/:id">
            <PostDetails />
          </Route>
          <Route path="">
            <h1>NO page here....</h1>
          </Route>
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App;
