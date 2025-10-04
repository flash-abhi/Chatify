import User from "../models/user.model.js";
import { uploadOnCloudinary } from './../config/cloudinary.js';

export const getCurrentUser = async (req,res) => {
    try {
        let userId = req.userId;
        let user = await User.findById(userId).select("-password");
        if(!user) {
            return res.status(400).json({message: "User does't not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `current user error: ${error}`});
    }
}
export const editProfile = async (req,res) => {
    try {
       const {name,description} = req.body;
       let image;
       if(req.file){
        image = await uploadOnCloudinary(req.file.path)
       }

       let user = await User.findByIdAndUpdate(req.userId,{name,description,image});
       if(!user) {
        return res.status(400).json({message: "User not found"});
       }
       console.log("called");
       return res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
}