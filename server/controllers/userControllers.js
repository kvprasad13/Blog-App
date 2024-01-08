const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const registerUser = asyncHandler(async (req, res, next) => {

    const { username, email, password } = req.body;
    console.log(username, email, password);
    // Basic validation: Check if required fields are provided
    if (!username || !email || !password) {
        res.status(400).send('All fields are required');

        throw new Error('All fields are required');
    }


    else if (await User.findOne({ $or: [{ email }, { username }] })) {

        res.status(400).send(`User with Username ${username} or email id ${email}already exists`);
        // throw new Error(`User with Username ${username} or email id ${email}already exists`);
    } else {



        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email: email, password: hashedPassword });
        req.user = user;

        next();



    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { usernameOrEmailId, password } = req.body;
    // console.log(usernameOrEmailId + " " + password);

    if (!usernameOrEmailId || !password) {
        res.status(400).send('All fields are required');
        throw new Error('All fields are required');
    }

    const user = await User.findOne({ $or: [{ email: usernameOrEmailId }, { username: usernameOrEmailId }] });

    if (!user) {
        res.status(401).send(`User with ${usernameOrEmailId} does not exist`);
        throw new Error(`User with ${usernameOrEmailId} does not exist`);
    } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const accessToken = jwt.sign(
                {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "300m" }
            );

            res.status(200).json({ accessToken });
        } else {
            res.status(401).send(`Password does not match`);
            throw new Error(`Password does not match`);
        }
    }
});

const currentUser = asyncHandler(async (req, res) => {


    res.status(200).send(req.user);
});

const getUserDetailsByUserId = asyncHandler(async (req, res) => {

    const user_id = req.params.user_id;
    if (!user_id) {
        res.status(401).send("  user id is  required")
        throw new Error(`  user id is  required`);
    }
    const user = await User.findOne({ _id:user_id });
    if (!user) {
        res.status(404).send(" user not found");

    }


    res.status(200).send({ user });
});

const getUserDetailsByUserName = asyncHandler(async (req, res) => {

    const username = req.params.username;
    if (!username) {
        res.status(401).send("  user name is  required")
        throw new Error(`  user name is  required`);
    }
    const user = await User.findOne({username});
    if (!user) {
        res.status(404).send(" user not found");

    }


    res.status(200).send({user});
});



module.exports = { registerUser, loginUser, currentUser, getUserDetailsByUserId,getUserDetailsByUserName };