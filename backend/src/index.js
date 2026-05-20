import dotenv from "dotenv"
import { connectDB } from "./config/database.js"
import app from "./app.js"
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({
    path: "./.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", error => {
            console.log(error);
            throw error
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server Start on Port: ${process.env.PORT}`);
        })

    } catch (error) {
        console.log("ERROR: ", error);
    }

}

startServer();