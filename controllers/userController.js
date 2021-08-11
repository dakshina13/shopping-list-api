const bcript = require("bcrypt");
const User = require("../models/user");

const { userSchema } = require("../validation/validate");

const addUser = async (req, res) => {
  try {
    const valid = await userSchema.validateAsync(req.body);
    const registered = await User.findOne({ email: req.body.email });
    if (registered) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcript.hash(valid.password, 10);
    const user = new User({
      name: valid.name,
      email: valid.email,
      password: hashedPassword,
    });
    let  returnObj={};
    const result = await user.save();
    returnObj.email=result.email;
    returnObj._id=result._id;
    res.json(returnObj);
  } catch (error) {
    if (error.isJoi) {
      const msg = error["details"][0].message;
      const obj = { message: msg };
      return res.status(422).json(obj);
    }
    res.status(400).json({massage:error.message});
  }
};

exports.addUser = addUser;
