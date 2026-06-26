import express from "express"
import cors from "cors"
import { errorHandler } from "./middleware/errorHandler.js"


const app=express()
//  to convert hte js object into json
app.use(express.json())
app.use(cors(
    {
        origin:"*",
        methods:['GET','POST','PUT','DELETE ']
    }
));



// | Middleware             | Parses              | Example Content-Type                |
// | ---------------------- | ------------------- | ----------------------------------- |
// | `express.json()`       | JSON request bodies | `application/json`                  |
// | `express.urlencoded()` | HTML form data      | `application/x-www-form-urlencoded` |

app.use(express.urlencoded({ extended: true }));
// to parse correctly the response

// global handler
app.use(errorHandler);


// health api
app.get("/health", (req, res)=>{
res.status(200).json({ status: 'UP', timestamp: new Date() });
});


export default app;