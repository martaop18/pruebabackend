const { User } = require("../models");
const bcrypt = require("bcrypt");

//VERIFY TOKEN 
const jwt = require("jsonwebtoken");
// REGISTER
const authController = {};

authController.register = async (req, res) => {
  try {
    const password = req.body.password;
    if (password.length < 6) {
      return res.send("Password must be longer than 6 characters");
    }
    const newPassword = bcrypt.hashSync(req.body.password, 8);

    const newUser = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: newPassword,
      phone: req.body.phone,
      role_id: req.body.role_id,
    });

    return res.send(newUser);
  } catch (error) {
    return res.send("Something went wrong creating users " + error.message);
  }
};
// LOGIN

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const email = req.body.email;
    // const password = req.body.password;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.json({
        success: true,
        message: "Wrong info",
      });
    }

//CHECKING PASSWORD

    const isMatch = bcrypt.compareSync(password, user.password); // true

    if (!isMatch) {
      return res.json({
        success: true,
        message: "Wrong info",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.role_id,
        email: user.email,
      },
      "avocado"
    );

    return res.json({
      success: true,
      message: "User logged",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cannot be logged",
      error: error,
    });
  }
};

module.exports = authController;
