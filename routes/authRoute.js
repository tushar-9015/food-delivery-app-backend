import express from "express"
import { loginAdmin, registerAdmin } from "../controllers/adminAuthController.js"
import { loginUser, registerUser } from "../controllers/authController.js"

const authRouter = express.Router();

// User registration and login
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

// Admin registration and login
authRouter.post('/admin/register', registerAdmin);
authRouter.post('/admin/login', loginAdmin);

export default authRouter;