const userModel = require("../model/userSchema");
const emailvalidator = require("email-validator");

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: `All fields are required`,
    });
  }

  // Email Validation
  const validEmail = emailvalidator.validate(email);

  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: `Please provide a Valid Email Id`,
    });
  }

  // Confirm Password
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: `Password and Confirm Password doesn't  Mached`,
    });
  }

  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(404).json({
        success: false,
        message: "Account Already Exist with provided email id",
      });
    }

    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      success: false,
      message: "Every field is mandatory",
    });
  }

  try {
    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");

    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(404).json({
        success: false,
        message: " Invalid Credientails",
      });
    }

    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 100,
      httpOnly: true,
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const getUser = (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      message: e.message,
    });
  }
};

const logout = (req, res, next) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    res.status(200).json({
      success: true,
      message: "Logout",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

module.exports = {
  signup,
  signin,
  getUser,
  logout,
};
