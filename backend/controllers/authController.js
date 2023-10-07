const {User} = require("../models/user");
const bcrypt = require('bcryptjs');
const { errorHandler } = require("../utils/error");
const jwt = require('jsonwebtoken');

module.exports.signup = async(req,res,next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        next(error);
    }  
};

module.exports.signin = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(401, "Invalid Credentials"));
        }
        const token = jwt.sign({ id: validUser._id }, )
    } catch (error) {
        next(error);
    }
}