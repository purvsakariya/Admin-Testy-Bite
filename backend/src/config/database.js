import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connectionToDB = await mongoose.connect(`${process.env.MONGODB_URI}`)

        console.log(`DB Connected Successfully To ${connectionToDB.connection.host}`);

    } catch (error) {
        console.log("ERROR: ",error);
        process.exit(1)
    }
}
