import {Router} from "express"
import { changePassword, orders,users ,deleteOrder, deleteUser } from "../controller/admin.controller.js";

const router = Router()             

router.route('/users').get(users)
router.route('/orders').get(orders)
router.route('/deleteOrder').post(deleteOrder)
router.route('/deleteUser').post(deleteUser)
router.route('/changePass').post(changePassword)

export default router;