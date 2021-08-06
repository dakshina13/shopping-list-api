const mongoose = require("mongoose");

const Item = require("./models/item");

mongoose
  .connect(
    "mongodb+srv://dak:abcd1234@cluster0.z70im.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const addItem = async (req, res, next) => {
  if (req.body.name == null || req.body.quantity == null) {
    console.log("name " + req.body.name);
    console.log("quantity " + req.body.quantity);
    return res.status(440).json({ message: "Name and quantity is required!" });
  }
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
  });
  const result = await item.save();
  res.json(result);
};

const getItems = async (req, res, next) => {
  const items = await Item.find().exec();
  res.json(items);
};
const getSingleItem = async (req, res, next) => {
  if (req.body.id == null) {
    return res.status(440).json({ message: "Id is required!" });
  }
  const item = await Item.findOne({ _id: req.body.id });
  if (item) {
    return res.json(item);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

const updateItem = async (req, res, next) => {
  if (req.body.name == null || req.body.quantity == null || req.body.id == null) {
    return res
      .status(440)
      .json({ message: "Name, quantity and id is required!" });
  }
  const item = await Item.findOne({ _id: req.body.id });
  if (item) {
    await item.updateOne({
      name: req.body.name,
      quantity: req.body.quantity,
    });
    const updatedItem = await Item.findOne({ _id: req.body.id });
    //console.log(item);
    return res.json(updatedItem);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

const deleteItem = async (req, res, next) => {
  if (req.body.id == null) {
    return res.status(440).json({ message: "Id is required!" });
  }
  const item = await Item.findOne({ _id: req.body.id });
  if (item) {
    await item.deleteOne();
    return res.json(item);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

exports.additem = addItem;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getSingleItem = getSingleItem;
