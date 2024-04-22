const expressAsyncHandler = require("express-async-handler");
const Users = require("../models/user");
const bcryptjs = require('bcryptjs');


const postSignUp = expressAsyncHandler(async (req, res, next) => {
    const { username, email, password, role } = req.body;

    // Check if email or username already exists
    const existingUser = await Users.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        return res.status(401).json({ message: "Email or Username already exists" });
    }

    try {
        // Hash the password
        const hashedPassword = await bcryptjs.hash(password,12);

        // Create a new user instance
        const newUser = new Users({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({ message: "User created successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user" });
    }
});

const postSignIn = expressAsyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    //Check if email exists
    const currentUser = await Users.findOne({email});
    if(!currentUser){
        return res.status(401).json({message: "Email does not exists!"});
    }

    // Compare passwords
    try {
        const isPasswordValid = await bcryptjs.compare(password, currentUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }

        // Generate authentication token
        const authToken = currentUser.generateAuthToken('20m');

        // Update user's authToken and save
        currentUser.authToken = authToken;
        await currentUser.save();

        //Set cookie for jwt token
        res.cookie('jwtToken', authToken, {httpOnly: true});

        // Return success response with authToken
        return res.status(200).json({ message: "User logged in successfully!", authToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

const getLogout = (req, res, next) => {
        res.clearCookie('jwtToken');
        res.status(200).json({ message: "Logout successful" });
};

const postDeleteUser = expressAsyncHandler(async (req, res, next) => {
    const deleteUserId = req.params.userId;

    try {
        const deletedUser = await Users.findByIdAndDelete(deleteUserId);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

//For updating we have to even update cart

module.exports = {postSignUp, postSignIn, getLogout, postDeleteUser};