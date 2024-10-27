import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//register
router.post("/register", async (req,res)=>{
    try {
        //generate new password
        //const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        //create new user
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword

        };

        const newUser = await User(user);

        //saave and  response
        const theUser = await newUser.save();

        return res.status(200).json(theUser);

    } catch (error) {
        res.status(500).json(error);
    }
})

//login
router.post("/login",  async (req,res)=>{
    try {
        //find
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("wrong username or password")


        //validate
        const validPassword =  await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong username or password");   
        //response
        res.status(200).json({_id: user._id, username: user.username});

    } catch (error) {
        res.status(500).json(error);6
    }
})


export default router;