import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//obtener user desde el token
export const getUserToken = async (req, res) =>{
    try{
        const token = req.headers.autorization?.split("") [1];
        if(!token){
            return res.status(401).json({
                message: 'Token no valido'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        } 
        res.status(200).json({
            user: {
                id: user._id,
                username : user.username,
                name: user.name,
                email: user.email
            }
        })

    }
}