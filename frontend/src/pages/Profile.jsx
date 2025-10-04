import { ClipLoader } from "react-spinners";
import emptyProfile from "../assets/avatar_icon.png";
import { IoCameraOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, userSelector } from "../redux/userSlice";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { serverUrl } from './../App';
import { toast } from "react-toastify";

const Profile = () => {
    const [loading,setLoading] = useState(false);
    const {userData} = useSelector(userSelector);
    const [name,setName] = useState(userData?.name || "");
    const [description,setDescription] = useState(userData?.description || "");
    const [frontendImage, setFrontendImage] = useState(userData?.image || emptyProfile);
    const [backendImage, setBackendImage] = useState(null);
    const dispatch = useDispatch();
    let image = useRef();
    const navigate = useNavigate();
    const handleImage = (e) => {
        let file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }
    const handleProfile = async(e) => {
        setLoading(true);
        try {
            e.preventDefault();
            let formData = new FormData();
            formData.append("name", name);
            formData.append("description",description);
            if(backendImage){
                formData.append("image",backendImage);
            }
            const result = await axios.put(serverUrl+"/api/user/profile",formData,{withCredentials:true});
            if(result){
                dispatch(setUserData(result.data));
            }
            console.log(result.data);
            toast.success("Profile Updated !!")
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(err?.response?.data?.message);
        }
    }
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex flex-col items-center">
      <div className="w-[80%] h-[600px] flex flex-col items-center justify-center gap-7">
        <FaLongArrowAltLeft className="w-8 h-8 absolute top-10 left-8 text-gray-600 cursor-pointer" onClick={() => navigate("/")}/>
        <div className="w-[150px] h-[150px] rounded-full border-4 relative border-[#20c7ff] shadow-gray-400 shadow-lg flex flex-col overflow-hidden cursor-pointer" onClick={() =>image.current.click()}>
          <div className="relative overflow-hidden" >
            <img
              src={frontendImage}
              className="w-full h-full object-cover"
              alt="" 
            />
          </div>
          <IoCameraOutline className="w-[28px] h-[28px] rounded-full bg-[#20c7ff] absolute right-3 p-[4px] bottom-4 text-gray-200" />
        </div>
        <form className="w-[350px] flex gap-2 flex-col" onSubmit={handleProfile}>
            <input type="file" accept="image/*" onChange={handleImage} ref={image} hidden id="" />
            <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Your Name' className='w-[100%] h-[50px] focus:outline-none focus:ring-2 text-gray-400 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg'/>
            <input type="text" readOnly value={`UserName : ${userData?.userName}`||""} className='w-[100%] h-[50px] focus:outline-none focus:ring-2 text-gray-300 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg'/>
            <input type="text" readOnly value={`Email : ${userData?.email}`|| ""} className='w-[100%] h-[50px] focus:outline-none focus:ring-2 text-gray-300 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg '/>
            <textarea placeholder="Enter your bio ..." onChange={(e) => setDescription(e.target.value)} value={description} className='w-[100%] h-[120px] focus:outline-none focus:ring-2 text-gray-500 font-semibold focus:ring-gray-400 outline-none border-2 border-[#b5bfca] px-[20px] py-[10px] bg-white rounded-lg '></textarea>
            <button className='mt-[15px] w-[100%] px-[20px] py-[10px] bg-[#3c90ea] text-white font-semibold text-[20px] rounded-lg hover:bg-[#5698de]' disabled={loading}>{loading ? <ClipLoader size={30} color="white"/> :"Save Profile"}</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
