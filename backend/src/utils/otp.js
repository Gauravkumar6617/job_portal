import { env } from "../config/env.js";
import redis from "../config/redis.js";


 const OTP_TIME = 600;
 const OTP_PREFIX ="otp:";
 const DEV_OTP = 123456;   

export const generateOtp =()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const saveOtp =async(phone,otp)=>{
    await redis.set(`${ OTP_PREFIX},${phone}`,otp, "EX", OTP_TIME)
}

export const getOtp =async (phone)=>{
 return   await redis.get(`${ OTP_PREFIX},${phone}`)
}

export const delOtp =async(phone)=>{
    return await redis.del(`${ OTP_PREFIX},${phone}`)

}

export const verifyOtp =async(storeOtp,inputcode)=>{
    if(env.NODE_ENV="development"   && inputcode ==DEV_OTP)
    {
        return true;
    }
    return storeOtp===inputcode;

}