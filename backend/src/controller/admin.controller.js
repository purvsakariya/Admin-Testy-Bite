import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import jwt from 'jsonwebtoken'

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessToken = async (userId, res) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.accessTokenGenerator()

        user.accessToken = accessToken
        await user.save({ validateBeforeSave: false })

        return { accessToken }
    } catch (error) {
        return res.status(500).json({ message: 'Something Went Wrong While Generating Tokens!' })
    }
}

export const orders = async (req, res) => {
    try {
        const orders = await Order.find({});

        return res.status(200).json({ message: 'Users Fetched SuccessFilly!', orders })
    } catch (error) {
        return res.status(500).json({ message: 'Something Went Wrong While fetching Users!', error })
    }
}

export const users = async (req, res) => {
    try {
        const users = await User.find({});

        return res.status(200).json({ message: 'Users Fetched SuccessFilly!', users })
    } catch (error) {
        return res.status(500).json({ message: 'Something Went Wrong While fetching Users!', error })
    }
}

export const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confPassword, email } = req?.body;

        if (!oldPassword || !newPassword || !confPassword) {
            return res.status(400).json({ message: 'Password Are Not Define!!!' })
        }

        if (newPassword !== confPassword) {
            return res.status(400).json({ message: 'newPassword and conform Password is not matched!!!' })
        }

        const user = await User.findOne({ email });

        const passMatched = await user.comparePass(oldPassword)

        if (!passMatched) {
            return res.status(400).json({ message: 'Your Password Not Matched ' })
        }

        user.password = newPassword;
        user.save({ validateBeforeSave: false })

        return res.status(200).json({ message: 'Password is Changed SuccessFully...' })
    } catch (error) {
        return res.status(500).json({ message: 'Something Went Wrong While Changing Password!' })
    }
}

export const deleteOrder = async (req, res) => {
    const _id = req.body?._id

    const order = await Order.findByIdAndDelete(_id);

    if (!order) {
        return res.status(400).json({ message: 'Order Not Found!' })
    }

    return res.status(200).json({ message: 'Order Deleted SuccessFully!', _id })
}

export const deleteUser = async (req, res) => {
    const _id = req.body?._id

    const user = await User.findByIdAndDelete(_id);

    if (!user) {
        return res.status(400).json({ message: 'User Not Found!' })
    }

    return res.status(200).json({ message: 'User Deleted SuccessFully!', _id })
}