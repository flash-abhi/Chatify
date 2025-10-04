import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const isAuth = async(req,res,next) => {
    try{
        let token = req.cookies.token;
        if(!token) {
            return res.status(400).json({message: "token not found"});
        }
        let verifytoken = await jwt.verify(token,process.env.JWT_SECRET);
        req.userId = verifytoken.userId;
        next();
    }catch(err){
        console.log(err);
        res.status(500).json({message: `is Auth error: ${err}`});
    }
}
export default isAuth;