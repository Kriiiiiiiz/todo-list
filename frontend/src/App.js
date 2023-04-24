import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Index from "./components/Index";
import Register from "./components/Register";
import {useState, useEffect} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import ProtectedRoute from "./ProtectedRoute";
import './statics/css/main.css';
import Task from "./components/Task";
function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios.get('/api/user', {withCredentials:true})
      .then(response => {
        setUser(response.data.user);
      }).catch(() => {
        setUser(false);
      })
  }, []);

  return (
    <UserContext.Provider value={{user, setUser}}>
        <Routes>
        <Route exact path="/" element={<Navigate to={`/home`} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/task/:uuid" element={<Task />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
