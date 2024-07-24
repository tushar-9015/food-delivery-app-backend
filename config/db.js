import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB: ", error.message);
    }
};

export default connectDB;
