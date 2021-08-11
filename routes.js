require("dotenv").config();
const mongoose = require("mongoose");

const ItemController = require("./controllers/itemController");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

exports.addItem = ItemController.addItem;
exports.getItems = ItemController.getItems;
exports.updateItem = ItemController.updateItem;
exports.deleteItem = ItemController.deleteItem;
exports.getSingleItem = ItemController.getSingleItem;
exports.getCategories = ItemController.getCategories;
