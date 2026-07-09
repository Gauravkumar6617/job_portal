import rateLimit from "express-rate-limit";

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5, // only 5 requests per IP
  message: {
    success: false,
    message: "Too many registration attempts. Try again later.",
  },
});


export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min 
  max: 10, // only 10 requests per IP
  message: {
    success: false,
    message: "Too many login attempts. Try again later.",
  },

})