import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect= async(req, res,next)=>{

    try{
        const token=req.headers.authorization;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No token provided",
            });
        }

        const jwtToken = token.split(" ")[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();

    }catch(error){

        return res.status(401).json({
            success:false,
            message:"Not authorised",
        });
    }

}