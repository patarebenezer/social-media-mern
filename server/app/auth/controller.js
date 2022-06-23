const userModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  index: async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await userModel.findOne({ email });
      if (!existingUser)
        return res.status(404).json({
          message: "User doesn't exist",
        });

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ message: "Invalid Credential | Wrong Password" });

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );
      res.status(200).json({ result: existingUser, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  signup: async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
      const existingUser = await userModel.findOne({ email });
      // jika ada email yg sama
      if (existingUser)
        return res.status(400).json({
          message: "User already exist",
        });

      if (password !== confirmPassword)
        return res.status(400).json({
          message: "Password Don't match!",
        });

        // proses mengubah password string jadi hash(acak dalam 12 karakter)
        const hashPassword = await bcrypt.hash(password, 12)
        const result = await userModel.create({
            email,
            password: hashPassword,
            name: `${firstName} ${lastName}`
        })
        
        const token = jwt.sign(
            { email: result.email, id: result._id },
            "test",
            { expiresIn: "1h" }
          );
          res.status(200).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
