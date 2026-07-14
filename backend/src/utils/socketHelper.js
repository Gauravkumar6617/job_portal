import { getIO } from "../config/socket.js";

export const sendToUser=(userId,event, data)=>{
    getIO().to(userId).emit(event,data)
}

export const sendToAll=(event, data)=>{
    getIO().emit(event,data)
}
export const sendToRoom=(room,event, data)=>{
    getIO().to(room).emit(event,data)
}