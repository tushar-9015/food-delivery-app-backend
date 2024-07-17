import express from "express"
import { addFood } from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router()

//Image Storage Engine


foodRouter.post("/add", addFood)



export default foodRouter;
