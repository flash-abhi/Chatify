import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home';
import useCurrentUser from './customhooks/useCurrentUser';
import { useSelector } from 'react-redux';
import { userSelector } from './redux/userSlice';
import Profile from './pages/Profile';
import getOherUsers from './customhooks/getOherUsers';
export const serverUrl = "http://localhost:8001";
function App() {
  useCurrentUser();
  getOherUsers();
  const {userData} = useSelector(userSelector);
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
