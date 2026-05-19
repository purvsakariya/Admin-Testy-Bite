import mongoose, { Schema } from 'mongoose'

const itemsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const orderSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pinCode: {
            type: String,
            required: true,
            trim: true,
            minLength: 6,
            maxLength: 10,
        },
        items: [itemsSchema],

    },
    {
        timestamps: true
    }
)

export const Order = mongoose.model("Order", orderSchema);