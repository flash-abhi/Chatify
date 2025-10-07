import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { color } from './../../node_modules/tailwindcss/src/util/dataTypes';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const SignUp = () => {
    const navigate = useNavigate();
    const [show,setShow] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(serverUrl+"/api/auth/signup",{userName,email,password},{withCredentials:true});
            // console.log(result);
            dispatch(setUserData(result.data));
            setLoading(false);
            setEmail("");
            setPassword("");
            setUserName("");
            toast.success("SignUp successfull !!");
            navigate("/profile");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to signup !!!");
        }
    }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
        <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
            <div className='w-full h-[200px] bg-[#3c90ea] rounded-b-[30%] shadow-lg flex items-center justify-center'>
                <h1 className='text-[30px] text-gray-800 font-semibold'>Welcome to <span className='text-white'>chatify</span></h1>
            </div>
            <form className='w-full flex flex-col items-center gap-[20px]' onSubmit={handleSignUp}>
            <input type="text" placeholder='Enter Your Username' onChange={(e) => setUserName(e.target.value)} value={userName} className='w-[90%] h-[50px] focus:outline-none focus:ring-2 text-gray-400 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg '/>
            <input type="text" placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} className='w-[90%] h-[50px] focus:outline-none focus:ring-2 text-gray-400 font-semibold focus:ring-gray-400 border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg '/>
            <div className='w-[90%] h-[50px] rounded-lg relative'>
                <input type={show? "text": "password"} placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} value={password} className='w-[100%] h-[50px] focus:outline-none focus:ring-2 text-gray-400 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg no-eye' />
                <span className='absolute top-3 right-5 cursor-pointer font-semibold text-gray-500' onClick={() => setShow((prev)=> !prev)}>{show ? "hide": "show"}</span>
            </div>
            <button className='mt-[15px] w-[90%] px-[20px] py-[10px] bg-[#3c90ea] text-white font-semibold text-[20px] rounded-lg hover:bg-[#5698de]' disabled={loading}>{loading ? <ClipLoader size={30} color="white"/> :"Sign Up"}</button>
            <p className='text-gray-500'>Already have an account ? <span onClick={() => navigate('/login')} className='text-[#3c90ea] font-semibold cursor-pointer'>Login</span></p>
        </form>
        </div>
        
    </div>
  )
}

export default SignUp;