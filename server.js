import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js'
import foodRouter from './routes/foodRoute.js';

//app config
const app = express()
const PORT = 4000


//middleware
app.use(express.json())
app.use(cors())


// DB Connection
connectDB();


// API endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("api is working")
})

app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}/`)
})



