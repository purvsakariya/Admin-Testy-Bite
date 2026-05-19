import { Order } from "../models/order.model.js"
import { AvailableMeals } from "../models/meal.model.js"

export const availableMeals = async (req, res) => {
    try {
        const meals = await AvailableMeals.find({})

        return res.status(200).json({ message: 'Meals fetched successfully', meals });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch meals', error: error.message });
    }
}

export const order = async (req, res) => {
    try {
        const { items, fullName, email, address, city, pinCode } = req.body?.order;

        if (!items) {
            return res.status(400).json({ message: 'Please Enter Your Order Items And Details' })
        }

        await Order.create({
            fullName,
            email,
            address,
            city,
            pinCode,
            items
        })

        return res
            .status(201)
            .json({ message: 'Order Created SuccessFully!!!' })
    } catch (error) {
        // console.error('Order creation failed:', error);
        return res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
}

export const orderHistory = async (req, res) => {
    const email = req.body?.email;

    // console.log(email);
    if(!email){
        return res.status(400).json( {message:'Email not Found!!'} )
    }

    const orders = await Order.find({email})

    return res.status(200).json({ message: 'Orders Find!!', orders })
}