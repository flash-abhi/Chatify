import User from "../models/user.model.js";
import genToken from './../config/token.js';
import bcrypt from "bcryptjs";
export const signUp = async (req,res) => {
    try {
        // console.log(req.body);
        const {userName,email,password} = req.body;

        const checkUserByUserName = await User.findOne({userName});
        if(checkUserByUserName){
            return res.status(400).json({message: "userName already exist"});
        }
        const checkUserByEmail = await User.findOne({email});
        if(checkUserByEmail){
            return res.status(400).json({message: "Email already exist"});
        }
        if(password.length< 6){
            return res.status(400).json({message : "Password must be atleast 6 characters."})
        }

        const hashedPassword = await bcrypt.hash(password,8);

        const user = await User.create({
            userName,
            email,
            password : hashedPassword
        });

        const token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            maxAge : 7*24*60*60*1000,
            sameSite : "Strict",
            secure : false
        });

        return res.status(201).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Signup error!!"})
    }
}

export const Login = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }
       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
            return res.status(400).json({message: "Incorrect Password"});
       }
        const token = await genToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            maxAge : 7*24*60*60*1000,
            sameSite : "Strict",
            secure : false
        });

        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Login error!!"})
    }
}

export const Logout = async(req,res) => {
    try {
         res.clearCookie("token");
         return res.status(200).json({message: "Logout successfull"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Logout error!!"})
    }
}