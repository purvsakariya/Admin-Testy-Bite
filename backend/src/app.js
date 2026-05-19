import express from 'express'
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import fs from "fs/promises"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))

// User Routers
import adminRouter from "./routes/admin.route.js"
import userOrder from './routes/order.route.js'

app.use("/api/v1/admin", adminRouter);
app.use('/orders',userOrder);

app.get('/meals', async (req, res) => {
    try {
        const mealsPath = path.join(__dirname, '..', 'data', 'available-meals.json');
        const meals = await fs.readFile(mealsPath, 'utf8');
        res.json(JSON.parse(meals));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});



export default app;