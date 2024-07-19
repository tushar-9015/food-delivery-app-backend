import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import validator from 'validator'
import { createToken } from "../utils/createToken.js";


//create user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check if the user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.json({ success: false, message: "User already exists!" });
        }

        // Validate the email and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: "An error has occurred" });
    }
};

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
   try {
    const user =  await userModel.findOne({email})

    if(!user){
    return res.json({success: false, message: "User Doesn't exsist"})
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
        return res.json({success: "false", message: "Wrong Password"})
    }

    const token = createToken(user.id);
    res.json({success: true, token})

   } catch (error) {
    console.error(error)
    res.json({success: "false", message: "An error has occurred"})
   }
}

export {registerUser, loginUser}