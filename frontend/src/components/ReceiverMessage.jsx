import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/userSlice";
import dp from "../assets/avatar_icon.png";

const ReceiverMessage = ({ image, message }) => {
  let scroll = useRef();
  const {selectedUser} = useSelector(userSelector);
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
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden mt-[8px] bg-white cursor-pointer shadow-lg shadow-gray-500   ">
            <img src={selectedUser?.image || dp} className=" shadow-lg w-[80px] bottom-[60px] right-[30px] rounded-full" alt="" />
            </div>
      <div className="w-fit max-w-[500px] bg-[#20c7ff] px-[20px] py-[10px] text-white text-[19px] mt-2 rounded-tl-none rounded-2xl relative left-0 flex flex-col gap-[10px]">
      <img
        src={image || null}
        onLoad={imageLoad}
        className="w-[120px] rounded-lg"
      />
      <span>{message}</span>
      </div>
    </div>
  );
};

export default ReceiverMessage;
