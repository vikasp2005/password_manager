import {User} from '../model/user.model.js';
import bcrypt from 'bcrypt';
import { generateTokenAndSetCookies } from '../utils/generateTokenAndSetCookies.js';


export const signin = async (req,res) =>{
    const {email, name, phoneno, password} = req.body;

    try{
        if(!email||!name||!phoneno||!password)
        {
            throw new Error("All 4 fields are required");
        }

        const isUserAlreadExist = await User.findOne({email});

        if(isUserAlreadExist)
        {
            return res.status(400).json({success:false,message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            username : name,
            email,
            phoneno,
            password : hashedPassword,
            verificationToken,
            verificationTokenExpireAt : Date.now() + 24 * 60 * 60 * 1000


        });

        await user.save();

        generateTokenAndSetCookies(res,user._id);

        res.status(201).json({
            success : true,
            message : "user created successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        });

        
    }
    catch(error){
        res.status(400).json({success:false,message:error.message});
    }
}

export const login = async (req,res) =>{
    res.end("login page");
}

export const logout = async (req,res) =>{
    res.end("logout page");
}