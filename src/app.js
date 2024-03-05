import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Add other CORS headers as needed
    next();
  });

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "26kb"}))
app.use(express.static("public"))
app.use(cookieParser())


  

//routes 
import userRouter from './routes/user.routes.js'
import videoRouter from './routes/video.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos",videoRouter)




export {app}