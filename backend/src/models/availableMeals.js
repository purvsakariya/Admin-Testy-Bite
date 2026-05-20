import mongoose, { Schema } from 'mongoose'

const availableMealsSchema = new Schema({
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
        default: 0
    },
}, { timestamps: true })

export const AvailableMeals = mongoose.model("AvailableMeals", availableMealsSchema);