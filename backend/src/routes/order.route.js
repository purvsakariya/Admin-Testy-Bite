import {Router} from "express"
import { addMeal, availableMeals, deleteMeal, editMeal } from "../controller/order.controller.js";
import multer from 'multer';


const router = Router()
const upload = multer({ dest: "uploads/" });

router.route('/availableMeals').get(availableMeals)
router.route('/editMeal').put(upload.single("image"),editMeal)
router.route('/addMeal').post(upload.single("image"),addMeal)
router.route('/deleteMeal').post(deleteMeal)

export default router;