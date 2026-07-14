import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./config/logger.js";
import userRoutes from "./modules/users/user.routes.js";
import cookieParser from "cookie-parser";
import { sendToUser } from "./utils/socketHelper.js";
const app = express();
app.use(cookieParser());
//  to convert hte js object into json
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE "],
  }),
);
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

// | Middleware             | Parses              | Example Content-Type                |
// | ---------------------- | ------------------- | ----------------------------------- |
// | `express.json()`       | JSON request bodies | `application/json`                  |
// | `express.urlencoded()` | HTML form data      | `application/x-www-form-urlencoded` |

app.use(express.urlencoded({ extended: true }));
// to parse correctly the response

// global handler
app.use(errorHandler);

// health api
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// user auth api
app.use("/api/v1/users", userRoutes);

app.get("/test-socket/:userId", (req, res) => {
  sendToUser(req.params.userId, "notification", {
    message: "Hello from server! 🎉",
    timestamp: new Date(),
  });
  res.json({ success: true, message: "Notification sent" });
});
export default app;
