import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const router = express.Router();


router.post("/register", async (req,res) => {
    try {
  let {email, password, passwordCheck, displayName} = req.body;
  
  // validate

  if(!email || !password || !passwordCheck)
             return res.status(400).json({msg: "Not all field have been entered"});
  if(password.length < 5)
             return res.status(400).json({msg: "The password needs to be at least 5 charecters long"})
  if(password !== passwordCheck)
             return res.status(400).json({msg: "Enter the same password twice for verification"});

             const existingUser =  await User.findOne({email:email});
             if(existingUser)
             return res.status(400).json({msg: "Acccount with this email already exists"});

             if(!displayName) displayName = email;

             const salt = await bcrypt.genSalt();
                 const passwordHash = await bcrypt.hash(password, salt);

                 const newUser = new User({
                     email,
                     password: passwordHash,
                     displayName
                 })
                 const savedUser = await newUser.save();
                 res.json(savedUser);
            


    }
    catch (err) {
        res.status(500).json(err)
    }

})
    router.post("/login", async (req,res) => {
        try {
            const {email, password} = req.body;

            if(!email || !password)
            return res.status(400).json({msg:  "Not all fields have been entered"});

            const user = await User.findOne({email: email})
            if(!user)
            return res.status(400).json({msg:  "No account with this email has been registered"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return  res.status(400).json({msg:  "invalid credentials"});

            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            console.log(token)
            res.json({
                token,
                user: {
                    id: user._id,
                    displayName: user.displayName,
                     email: user.email ,              
             }
            })

        }
        catch (err) {
            res.status(500).json(err)
        }
    
})




export default router;
