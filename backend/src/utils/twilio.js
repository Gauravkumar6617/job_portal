import twilio from "twilio";
import { env } from "../config/env.js";


const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);

const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
};

export const sendWhatsappOtp = async (phone, otp) => {
    try {
        const message = await client.messages.create({
            from : env.TWILIO_WHATSAPP_FROM,
            to :  `Whatsapp to ${phone}`,
            body: `Your Job Portal verification code is: *${otp}*. Valid for 10 minutes. Do not share this with anyone.`,
            
        });
        return message.sid;
    } catch (error) {
        console.log("error while sending otp:", error)
    throw new Error(`Failed to send WhatsApp OTP: ${error.message}`);

    }

}