const Joi = require("joi");

const itemSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
  category: Joi.string().alphanum().required(),
  id: Joi.string().alphanum(),
  categoryName: Joi.string().allow(''),
});

//const categorySchema=Joi.object({})

exports.itemSchema = itemSchema;
