import { success } from "zod";
import { env } from "../config/env.js";


export const errorHandler =(err ,req ,res ,next)=>{
    console.log("ERROR LOGGED:",err.message);
    
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        success: false,
        message: err.message,
        stack:env.NODE_ENV === "development" ? err.stack : undefined,
    });

}