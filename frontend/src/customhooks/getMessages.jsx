import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers, userSelector } from '../redux/userSlice'
import { setMessages } from '../redux/messageSlice'

const getMessages = () => {
    const dispatch = useDispatch();
    const {userData,selectedUser} = useSelector(userSelector);
  useEffect( () => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return;
        try {
            const result = await axios.get(serverUrl+`/api/message/get/${selectedUser?._id}`,{withCredentials:true});
            dispatch(setMessages(result.data));
        } catch (error) {
            console.log(error);
        }
    }
    fetchMessages();
  },[selectedUser,userData]);
}

export default getMessages;