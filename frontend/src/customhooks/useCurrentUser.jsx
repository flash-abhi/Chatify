import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, userSelector } from '../redux/userSlice'

const useCurrentUser = () => {
    const dispatch = useDispatch();
    const {userData} = useSelector(userSelector);
  useEffect( () => {
    const fetchUser = async () => {
        try {
            const result = await axios.get(serverUrl+"/api/user/current",{withCredentials:true});
            dispatch(setUserData(result.data));
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();
  },[userData])
}

export default useCurrentUser;