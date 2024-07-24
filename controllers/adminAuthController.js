import bcrypt from 'bcrypt';
import validator from 'validator';
import userModel from '../models/userModel.js';
import createToken from "../utils/createToken.js";

export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "Admin already exists!" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, role: 'admin' });
        const user = await newUser.save();
        const token = createToken(user._id, user.role);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred" });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email, role: 'admin' });
        if (!user) {
            return res.json({ success: false, message: "Admin not found!" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials!" });
        }
        const token = createToken(user._id, user.role);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred" });
    }
};
