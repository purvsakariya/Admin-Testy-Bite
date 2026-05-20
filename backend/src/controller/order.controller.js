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

import { v2 as cloudinary } from 'cloudinary';

export const editMeal = async (req, res) => {
  try {
    
    const { name, price, description,_id } = req.body;
    const imageFile = req.file; 

    if(!name||!price||!description){
      return res.status(400).json( {message:'All Feilds Not Found!'} )
    }

    const meal = await AvailableMeals.findById(_id)

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found.",
      });
    }

    let imageUrl = meal.image; 

    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        folder: "home/meals",
      });

      imageUrl = uploadResult.secure_url;
    }

    meal.name        = name ?? meal.name;
    meal.price       = price ?? meal.price;
    meal.description = description ?? meal.description;
    meal.image       = imageUrl;

    const updatedMeal = await meal.save();

    return res.status(200).json({
      success: true,
      message: "Meal updated successfully.",
      data: updatedMeal,
    });

  } catch (error) {
    console.error("editMeal error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const addMeal = async (req, res) => {
  try {
    
    const { name, price, description } = req.body;
    const imageFile = req.file;

    if (!name || !price || !description || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, price, description, image) are required.",
      });
    }

    const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
      folder: "home/meals",
    });

    const imageUrl = uploadResult.secure_url;

    const newMeal = new AvailableMeals({
      name,
      price,
      description,
      image: imageUrl,
      quantity: 0
    });

    const savedMeal = await newMeal.save();

    return res.status(201).json({
      success: true,
      message: "Meal added successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const deleteMeal = async (req,res) => {

  try {
    const {_id} = req.body
  
    if(!_id){
      return res.status(400).json( {message:'_id not found!'} )
    }
  
    const meals = await AvailableMeals.findByIdAndDelete(_id)
  
    return res.status(200).json( {message:'Meal Delete SuccessFully'} )
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
}