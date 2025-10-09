import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import useCurrentUser from './customhooks/useCurrentUser';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers, setSocket, userSelector } from './redux/userSlice';
import Profile from './pages/Profile';
import getOherUsers from './customhooks/getOherUsers';
import { useEffect } from 'react';
import {io} from "socket.io-client";
export const serverUrl = "http://localhost:8001";
function App() {
  useCurrentUser();
  const dispatch = useDispatch();
  getOherUsers();
  const {userData,socket,onlineUsers} = useSelector(userSelector);
  useEffect(()=> {
    if(userData){
    const socketio = io(`${serverUrl}`,{
      query:{
        userId : userData?._id
      }
    });
    dispatch(setSocket(socketio));
    socketio.on("getOnlineUsers",(users) => {
      dispatch(setOnlineUsers(users));
    })
    return () => socketio.close();
    
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null))
      }
    }
    
  },[userData]);  
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path='/login' element= {!userData ? <Login/>: <Navigate to={"/"}/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route path='/' element= {userData? <Home/> : <Navigate to={"/login"}/>}/>
        <Route path='/profile' element={userData? <Profile/> : <Navigate to={"/login"} />}/>
      </Routes>
    </>
  )
}

export default App
