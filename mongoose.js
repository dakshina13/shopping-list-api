require("dotenv").config();
const mongoose = require("mongoose");

const Item = require("./models/item");

const Category = require("./models/category");

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const addItem = async (req, res, next) => {
  //General validation
  if (
    req.body.name == null ||
    req.body.quantity == null ||
    req.body.category == null
  ) {
    return res
      .status(440)
      .json({ message: "Name ,quantity and category is required!" });
  }
  //Checking if category is a new category or old category
  let categoryId = req.body.category;
  //new category aadding to database
  if (categoryId === "others") {
    //console.log(req.body.categoryName);
    const category = new Category({ name: req.body.categoryName });
    categoryId = category._id;
    const resultCategory = await category.save();
    //console.log(resultCategory);
  }
  //checking category if it exists by the id in the database
  else {
    const category = await Category.findOne({
      _id: categoryId,
    }).exec();
    if (!category) {
      return res.status(440).json({ message: "Category Id found!" });
    }
  }
  //creating item and saving to db
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    category: categoryId,
  });
  const result = await item.save();
  res.json(result);
};

const getItems = async (req, res, next) => {
  const items = await Item.find().exec();
  const category = await Category.find().exec();
  let itemsCategory = [];
  //adding the category name to each list item
  for (let item of items) {
    let name = category.find((cat) => cat._id == item.category).name;
    //console.log(name);
    let object = item.toObject();
    object.categoryName = name;
    itemsCategory.push(object);
  }
  res.json(itemsCategory);
};

const getSingleItem = async (req, res, next) => {
  //General validation
  if (req.body.id == null) {
    return res.status(440).json({ message: "Id is required!" });
  }
  const itemMongoose = await Item.findOne({ _id: req.body.id });
  const item = itemMongoose;
  if (item) {
    //Very important item stores alot of data returned by mongoose
    //let i=item.toObject();
    //console.log(i);
    //returns this
    //{
    // _id: 610e249b6197450cdc05d946,
    // name: 'abcdefg',
    // quantity: 567,
    // category: '610e249b6197450cdc05d944',
    // __v: 0
    // }

    //finding the category name and appending it to object
    let i = item.toObject();
    const category = await Category.findOne({ _id: item.category });
    i.categoryName = category.name;
    return res.json(i);
  }
  res.status(400).json({
    message: "Invalid id.",
  });
};

const updateItem = async (req, res, next) => {
  //General validation
  if (
    req.body.name == null ||
    req.body.quantity == null ||
    req.body.id == null ||
    req.body.category == null
  ) {
    return res
      .status(440)
      .json({ message: "Name, quantity and id is required!" });
  }
  const item = await Item.findOne({ _id: req.body.id });
  //Checking if category is a new category or old category
  let categoryId = req.body.category;
  //new category aadding to database
  if (categoryId === "others") {
    //console.log(req.body.categoryName);
    const category = new Category({ name: req.body.categoryName });
    categoryId = category._id;
    const resultCategory = await category.save();
    //console.log(resultCategory);
  }
  //checking category if it exists by the id in the database
  else {
    const category = await Category.findOne({
      _id: categoryId,
    }).exec();
    if (!category) {
      return res.status(440).json({ message: "Category Id found!" });
    }
  }
  //if item exists by item item will not be null
  if (item) {
    await item.updateOne({
      name: req.body.name,
      quantity: req.body.quantity,
      category: categoryId,
    });
    const updatedItem = await Item.findOne({ _id: req.body.id });
    //console.log(item);
    return res.json(updatedItem);
  }
  //If id is not in the database
  res.status(400).json({
    message: "Invalid id.",
  });
};

const deleteItem = async (req, res, next) => {
  //General validation
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

//get all categories
const getCategories = async (req, res, next) => {
  const cat = await Category.find().exec();
  res.json(cat);
};

exports.additem = addItem;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.getSingleItem = getSingleItem;
exports.getCategories = getCategories;
