import mongoose from "mongoose";



const connectMongoDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connection: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting db : ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDb