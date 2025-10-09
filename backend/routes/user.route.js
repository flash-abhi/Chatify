import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { editProfile, getCurrentUser, getOtherUsers, search } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

export const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrentUser);
userRouter.put("/profile",isAuth,upload.single("image"),editProfile);
userRouter.get("/others",isAuth,getOtherUsers);
userRouter.get("/search",isAuth,search);