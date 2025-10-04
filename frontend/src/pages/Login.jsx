import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Login = () => {
  const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState("");
    const dispatch  = useDispatch();
    const handleLogin = async(e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl+ "/api/auth/login" , {email,password},{withCredentials: true});
            // console.log(result);
            dispatch(setUserData(result.data));
            setLoading(false);
            setEmail("");
            setPassword("");
            toast.success("login successfull !!");
            setError("");
            navigate("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error?.response?.data?.message);
            toast.error("Login Failed !!");
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-[#3c90ea] rounded-b-[30%] shadow-lg flex items-center justify-center'>
                <h1 className='text-[30px] text-gray-800 font-semibold'>Login to <span className='text-white'>chatify</span></h1>
            </div>
            <form className='w-full flex flex-col items-center gap-[20px]' onSubmit={handleLogin}>
            
            <input type="text" placeholder='Enter Your Email' onChange={(e) => {
                setError("");
                setEmail(e.target.value)}} value={email} className='w-[90%] h-[50px] focus:outline-none focus:ring-2 focus:ring-gray-400 border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg '/>
            <div className='w-[90%] h-[50px] rounded-lg relative'>
                <input type={show? "text": "password"} onChange={(e) => {
                    setError("");
                    setPassword(e.target.value)}} value={password} placeholder='Enter Your Password'className='w-[100%] h-[50px] no-eye focus:outline-none focus:ring-2 focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg ' />
                <span className='absolute top-3 right-5 cursor-pointer font-semibold text-gray-500' onClick={() => setShow((prev)=> !prev)}>{show ? "hide": "show"}</span>
            </div>
            <p className='text-red-500'>{error}</p>
            <button className='mt-[15px] w-[90%] px-[20px] py-[10px] bg-[#3c90ea] text-white font-semibold text-[20px] rounded-lg hover:bg-[#5698de]' disabled={loading} >{loading ? <ClipLoader color="white" size={30}/> : "Login"}</button>
            <p className='text-gray-500'>want to create a new account ? <span onClick={() => navigate('/signup')} className='text-[#3c90ea] font-semibold cursor-pointer'>Signup</span></p>
        </form>
        </div>
        
    </div>
  )
}

export default Login