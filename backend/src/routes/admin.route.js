import {Router} from "express"
import { changePassword, loginUser, logoutUser, orders,users ,deleteOrder, deleteUser } from "../controller/admin.controller.js";

const router = Router()             

router.route('/users').get(users)
router.route('/orders').get(orders)
router.route('/deleteOrder').post(deleteOrder)
router.route('/deleteUser').post(deleteUser)
router.route('/login').post(loginUser)
router.route('/logout').post( logoutUser)
router.route('/changePass').post(changePassword)

export default router;