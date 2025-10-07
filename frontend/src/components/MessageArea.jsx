import { useDispatch, useSelector } from "react-redux";
import emptyProfile from "../assets/avatar_icon.png";
import { IoIosArrowRoundBack, IoMdSend } from "react-icons/io";
import { setSelectedUser, userSelector } from "../redux/userSlice";
import logo from "../assets/logo_icon.png";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const MessageArea = () => {
  const { selectedUser } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");

  const onEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false); // ✅ optional: close picker after selecting emoji
  };

  return selectedUser ? (
    <div
      className={`lg:w-[70%] w-full ${
        selectedUser ? "flex" : "hidden"
      } lg:flex h-full bg-slate-200 border-l-2 border-gray-300 relative`}
    >
      <div className="w-full h-[100vh]">
        {/* Header */}
        <div className="w-full h-[80px] bg-[#2babd5] rounded-b-[8px] shadow-gray-400 shadow-lg flex gap-[20px] items-center px-[10px] py-[30px]">
          <IoIosArrowRoundBack
            onClick={() => dispatch(setSelectedUser(null))}
            className="w-[40px] h-[40px] text-gray-100 cursor-pointer"
          />
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-md">
            <img
              src={selectedUser?.image || emptyProfile}
              className="h-[100%]"
              alt="profile"
            />
          </div>
          <h1 className="text-[20px] text-gray-100 font-semibold">
            {selectedUser?.name || selectedUser?.userName}
          </h1>
        </div>

        {/* Emoji Picker */}
        <div className="w-full h-[450px]">
          {showPicker && (
            <div className="absolute bottom-[100px] left-[20px] z-50">
              <EmojiPicker
                className="shadow-lg"
                width={250}
                height={380}
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="w-full lg:w-[70%] h-[100px] fixed bottom-[0px] flex items-center justify-center rounded-full">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center p-[20px] gap-[10px] w-[95%] lg:w-[75%] h-[50px] bg-[#1797c2] shadow-gray-400 shadow-md rounded-full"
        >
          {/* Emoji Button */}
          <div onClick={() => setShowPicker((prev) => !prev)}>
            <RiEmojiStickerLine className="w-[25px] h-[25px] text-gray-100 cursor-pointer" />
          </div>

          {/* Input Field */}
          <div className="w-full h-[40px] bg-transparent">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-full text-white outline-none bg-transparent placeholder:text-white"
              placeholder="Message"
            />
          </div>

          {/* Image and Send Icons */}
          <div>
            <FaImages className="w-[25px] h-[25px] text-gray-100 cursor-pointer" />
          </div>
          <div>
            <IoMdSend className="w-[25px] h-[25px] text-gray-100 cursor-pointer" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    // When no user is selected
    <div className="bg-slate-100 w-[70%] hidden lg:block">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img src={logo} className="w-[100px] h-[100px]" alt="logo" />
        <h1 className="text-[25px]">This is Chatify for you</h1>
        <p>Send and receive messages anytime, anywhere.</p>
      </div>
    </div>
  );
};

export default MessageArea;
