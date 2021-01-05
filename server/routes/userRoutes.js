import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from"../middleware/auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all field have been entered" });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 charecters long" });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "Acccount with this email already exists" });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete", auth,  async (req, res) => {
try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser)
} catch (err) {
    res.status(500).json({error: err.message})
}
});

router.post("/tokenIsValid", async(req,res )=> {
    try {
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);


        const user = await User.findById(verified.id);
        if(!user) return res.json(false);

        console.log(verified)
        return res.json(true);
    } catch (err) {
        res.status(500).json({error: err.message})
    }
  })

    router.get("/" , auth, async (req,res) => {
      const users = await User.findById(req.user);
      res.json({
        displayName: users.displayName,
        id: users._id
      });
    })
  


export default router;

// JWT_SECRET=fC1oY5lP9oQ1nM5y