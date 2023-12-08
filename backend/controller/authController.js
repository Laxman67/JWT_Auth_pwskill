const userModel = require("../model/userSchema");

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);
  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (e.code === 11000) {
      return res.status(404).json({
        success: false,
        message: "Account Already Exist with provided email id",
      });
    }
    return res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  signup,
};
