require("dotenv").config();
const express = require('express');
const app = express()

const PORT = 3000;
const cors = require("cors")


const corsOptions = {
    origin: "http://localhost:5173",
    method: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Running on PORT ${PORT}`)
    })
})