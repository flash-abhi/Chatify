import  {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setSearchData, setSelectedUser, setUserData, userSelector } from "../redux/userSlice";
import emptyProfile from "../assets/avatar_icon.png";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { setMessages } from "../redux/messageSlice";
const Sidebar = () => {
  const { userData, otherUsers,selectedUser,onlineUsers,searchData} = useSelector(userSelector);
  const [search, setSearch] = useState(false);
  const [input,setInput] = useState("");
  let dispatch = useDispatch();
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      dispatch(setMessages(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    try {
      let result = await axios.get(serverUrl + `/api/user/search?query=${input}`, {
        withCredentials: true,
      });
      dispatch(setSearchData(result.data))
      console.log(result.data)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=> {
    if(input){
      handleSearch();
    }
  },[input])
  return (
    <div className={`lg:w-[30%] w-full h-full relative overflow-hidden bg-slate-200 lg:block ${!selectedUser? "block":"hidden"}`}>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-md fixed bottom-[20px] left-[10px]">
        <BiLogOutCircle
          className="w-[25px] h-[25px] text-gray-700 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
      <div className={` ${input?"block": "hidden"}`}>
      <div className={`absolute top-[240px] z-40 p-[20px]  bg-white flex w-[100%] h-[65%] lg:h-[280px] overflow-y-auto flex-col gap-[10px]`}>
                  {searchData?.map((user,i)=>(
                    <div key={i} onClick={() => {dispatch(setSelectedUser(user)); setInput("")}}  className="w-[95%] h-[55px] flex justify-start items-center  gap-[20px] hover:bg-slate-300  border-b-2 mb-1 border-gray-400 cursor-pointer">
                 
                <div className="relative rounded-full">
                <div
                  key={i}
                  className="w-[50px] object-cover h-[48px] rounded-full m-2 overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md"
                >
                  
                  <img
                    src={user?.image || emptyProfile}
                    className="h-[100%] w-full object-cover"
                  />
                  
                </div>
                {onlineUsers?.includes(user._id) &&
                  <span className="w-[10px]  h-[10px] bottom-[8px] right-[7px]  rounded-full bg-green-400 absolute"></span>
              }</div>
                <h1 className="text-[18px] text-gray-700 font-semibold">{user?.name || user?.userName}</h1>
                </div>
                  ))}
                </div>
              </div>
             
      <div className="w-full h-[220px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px] ">
        <h1 className="text-white font-bold text-[26px]">Chatify</h1>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-gray-800 font-bold text-[22px]">
            Hii, {userData?.name || "User"}
          </h1>
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md">
            <img
              src={userData.image || emptyProfile}
              className="h-[100%] w-[100%] cursor-pointer"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
        <div>
          <div className="w-full flex items-center p-4 gap-[20px] overflow-x-auto">
            {!search && (
              <div
                className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-md"
                onClick={() => setSearch(true)}
              >
                <IoIosSearch className="w-[25px] h-[25px] cursor-pointer" />
              </div>
            )}
            {search && (
              <form className="w-full flex items-center gap-[10px] h-[40px] bg-white shadow-gray-500 shadow-md mt-[10px] rounded-full overflow-hidden px-[20px]">
                <IoIosSearch className="w-[25px] h-[25px] " />
                <input
                  type="text"
                  placeholder="search users..."
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  className="w-full h-full text-gray-800 text-[17px] p-[10px] outline-0 border-0"
                />
                <RxCross2
                  className="w-[25px] h-[25px] cursor-pointer"
                  onClick={() => {setSearch(false)
                    setInput("");
                  }}
                />
                 </form>
              
            )}
            {!search && otherUsers?.map((user, i) => 
                 onlineUsers?.includes(user._id) &&
                <div className="relative rounded-full">
                <div
                  key={i}
                  className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md"
                >
                  
                  <img
                    src={user?.image || emptyProfile}
                    className="h-[100%] cursor-pointer"
                    onClick={() => dispatch(setSelectedUser(user))}
                  />
                  
                </div>
                  <span className="w-[10px]  h-[10px] bottom-0 right-0  rounded-full bg-green-400 absolute"></span>
              </div>
              )
            }
          </div>
        </div>
      </div>
        <div className="w-full p-[10px] h-[65%] md:h-[52%] sm:h-[52%] lg:h-[52%] overflow-auto flex flex-col gap-[20px] items-center justify-start mt-[20px]">
           { otherUsers?.map((user, i) => {
              return (
                <div key={i} onClick={() => dispatch(setSelectedUser(user))} className="w-[95%] h-[50px] flex justify-start items-center gap-[20px] hover:bg-slate-300 shadow-gray-500 shadow-md  rounded-full cursor-pointer">
                 
                <div className="relative rounded-full">
                <div
                  key={i}
                  className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md"
                >
                  
                  <img
                    src={user?.image || emptyProfile}
                    className="h-[100%]"
                  />
                  
                </div>
                {onlineUsers?.includes(user._id) &&
                  <span className="w-[10px]  h-[10px] bottom-[3px] right-[2px]  rounded-full bg-green-400 absolute"></span>
              }</div>
                <h1 className="text-[18px] text-gray-700 font-semibold">{user?.name || user?.userName}</h1>
                </div>
              );
            })}
        </div>
    </div>
  );
};

export default Sidebar;
