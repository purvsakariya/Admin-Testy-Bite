import {Router} from "express"
import { availableMeals, order, orderHistory } from "../controller/order.controller.js";

const router = Router()

router.route('/order').post(order)
router.route('/orderHistory').post(orderHistory)
router.route('/availableMeals').get(availableMeals)

export default router;