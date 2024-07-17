import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://tusharjoshi9015:WbQ8JyqgAsnmF0Up@food-delivery.nzttp0x.mongodb.net/?retryWrites=true&w=majority&appName=food-delivery',
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("DB Connected");
    } catch (error) {
        console.error("Error connecting to DB: ", error.message);
    }
};

export default connectDB;
