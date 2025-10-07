import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setSelectedUser, setUserData, userSelector } from "../redux/userSlice";
import emptyProfile from "../assets/avatar_icon.png";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { userData, otherUsers,selectedUser } = useSelector(userSelector);
  const [search, setSearch] = useState(false);
  let dispatch = useDispatch();
  
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className={`lg:w-[30%] w-full h-full bg-slate-200 lg:block ${!selectedUser? "block":"hidden"}`}>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-md fixed bottom-[20px] left-[10px]">
        <BiLogOutCircle
          className="w-[25px] h-[25px] text-gray-700 cursor-pointer"
          onClick={handleLogout}
        />
      </div>
      <div className="w-full h-[220px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px] ">
        <h1 className="text-white font-bold text-[22px]">Chatify</h1>
        <div className="w-full flex justify-between items-center ">
          <h1 className="text-gray-800 font-bold text-[22px]">
            Hii, {userData?.name || "User"}
          </h1>
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md">
            <img
              src={userData.image || emptyProfile}
              className="h-[100%] w-[100%]"
              onClick={() => navigate("/profile")}
            />
          </div>
        </div>
        <div>
          <div className="w-full flex items-center gap-[20px]">
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
                  className="w-full h-full text-gray-800 text-[17px] p-[10px] outline-0 border-0"
                />
                <RxCross2
                  className="w-[25px] h-[25px] cursor-pointer"
                  onClick={() => setSearch(false)}
                />
              </form>
            )}
            {!search && otherUsers?.map((user, i) => {
              return (
                <div
                  key={i}
                  className="w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md"
                >
                  <img
                    src={user?.image || emptyProfile}
                    className="h-[100%]"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
        <div className="w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center justify-start mt-[20px]">
           { otherUsers?.map((user, i) => {
              return (
                <div key={i} onClick={() => dispatch(setSelectedUser(user))} className="w-[95%] h-[50px] flex justify-start items-center gap-[20px] hover:bg-slate-300 shadow-gray-500 shadow-md  rounded-full cursor-pointer">
                <div
                  className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md"
                >
                  <img
                    src={user?.image || emptyProfile}
                    className="h-[100%] w-[100%]"
                  />
                </div>
                <h1 className="text-[18px] text-gray-700 font-semibold">{user?.name || user?.userName}</h1>
                </div>
              );
            })}
        </div>
    </div>
  );
};

export default Sidebar;
