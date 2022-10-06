import express from "express";
import Data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(Data.products);

    await User.remove({});
    const createdUsers = await User.insertMany(Data.users);

    res.send({
        createdProducts,
        createdUsers
    });
});

export default seedRouter;