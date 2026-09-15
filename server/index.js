import dotenv from "dotenv"
import express from "express"

dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.get("/test", (req, res)=>{
    return res.send("Hello from server")
})

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`)
})