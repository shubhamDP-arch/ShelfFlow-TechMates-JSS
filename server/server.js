require("dotenv").config();
const express = require('express');
const app = express()
const connectDB = require("./utils/database")

const authRouter = require("./router/auth-route");
const PORT = 5000;
const cors = require("cors")

const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
}
app.use(express.json())
app.use(cors(corsOptions))
app.use("/api/auth", authRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on PORT ${PORT}`)
    })
})