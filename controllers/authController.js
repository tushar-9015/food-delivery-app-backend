import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import createToken from "../utils/createToken.js";


const registerUser = async () => {
  const { name, email, password } = req.body;

  try {
    const exsistingUser = await userModel.findOne({ email });

    if (exsistingUser) {
      return res.json({ success: false, message: "User already exsist!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        Success: false,
        message: "Please enter a valid email!",
      });
    }

    if (password.length < 8) {
      return res.json({
        Success: false,
        message:
          "Your password is too short. It should have atleast 8 characters!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();
    const token = createToken(user._id, user.role);
    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "An error occurred" });
  }
};

const loginUser = async () => {
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email})

        if(!user) {
            return res.send({success: false, message: "User not found!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.send({success: false, message: "Invalid credentials!"}) 
        }

        const token = createToken(user._id, user.role);
        return res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred" });
    }
}


export {registerUser, loginUser}
