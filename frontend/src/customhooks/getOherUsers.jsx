import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers, userSelector } from '../redux/userSlice'

const getOherUsers = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
  useEffect( () => {
    const fetchUser = async () => {
        try {
            const result = await axios.get(serverUrl+"/api/user/others",{withCredentials:true});
            dispatch(setOtherUsers(result.data));
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
  },[userData])
}

export default getOherUsers;