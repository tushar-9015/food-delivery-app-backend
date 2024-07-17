import { dirname, join } from "path";
import foodModel from "../models/foodModel.js";
import fs from "fs"
import path from 'path'


//add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })
    try {
        food.save();
        res.json({success:true, message: "food added"})
    } catch (error) {
        res.json({success:false, message: "an error has occured"})
    }
}

//all food list

const listFood = async (req, res) => {
try {
    const foods = await foodModel.find({})
    res.json({success:true, data: foods})
} catch (error) {
    res.json({success:false, message: "an error has occured"})
}
}

// get single food item
const getFood= async (req, res) => {
    const foodItem = req.body.id
    try {
        const food = await foodModel.findById(foodItem);
        res.json({success:false, data: food})
    } catch (error) {
        res.json({success:false, message: "an error has occured"}) 
    }
}

//update food item
const updateFood = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    try {
        const food = await foodModel.findById(id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Deleting the old image
        if (food.image_filename) {
            fs.unlink(path.join(__dirname, "..", food.image_filename), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        // Update the food item with new details and the new image path
        if (req.file) {
            food.image_filename = req.file.filename;
        }
        food.name = name || food.name;
        food.price = price || food.price;
        food.description = description || food.description;
        food.category = category || food.category;

        await food.save();
        res.json({ success: true, message: "Food has been updated" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error has occurred" });
    }
};

//remove food item
const removeFood = async (req, res) => {
    let selectedFood = req.body.id
    try {
        const food = await foodModel.findById(selectedFood);
        fs.unlink(`uploads/${food.image}`, () =>  {})
        await foodModel.findByIdAndDelete(selectedFood);
        res.json({success: true, message: "food removed"})
    } catch (error) {
        res.json({success: false, message: "food not removed"}) 
    }
}



export {addFood, listFood, removeFood, getFood, updateFood};