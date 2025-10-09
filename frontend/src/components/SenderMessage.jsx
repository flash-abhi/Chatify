import { useEffect, useRef } from "react";
import dp from "../assets/avatar_icon.png";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
const SenderMessage = ({ message, image }) => {
  let scroll = useRef();
  const {userData} = useSelector(userSelector);
  const imageLoad = () => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  };
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" });
  }, [message, image]);
  return (
    <div
      ref={scroll}
      className="flex items-start gap-[10px]" 
    >
      
      <div className="w-fit max-w-[500px] bg-[rgb(23,151,194)] px-[20px] py-[10px] text-white text-[19px] rounded-tr-none rounded-2xl mt-2 relative right-0 ml-auto flex flex-col gap-[10px]">
      {image && (
        <img
          src={image || null}
          onLoad={imageLoad}
          className="w-[120px] rounded-lg"
        />
      )}{" "}
      {message && <span>{message}</span>}
      </div>
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden mt-[8px] bg-white cursor-pointer shadow-lg shadow-gray-500   ">
      <img src={userData?.image || dp} className=" shadow-lg w-[80px] bottom-[60px] right-[30px] rounded-full" alt="" />
      </div>
    </div>
  );
};

export default SenderMessage;
