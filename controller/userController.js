const userModel = require("../models/userModel")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt")
const createuser = async function (req, res) {
    try {
        const data = req.body
        const { username, email, password, role } = data

        const hashpassword = await bcrypt.hash(password, 10)
        
        const user = await userModel.create({ username, email, password:hashpassword, role,  })
        res.status(201).send({status:true,data:user})
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

const getalluser = async function (req, res) {
    try {
        const alluser = await userModel.find({});
        res.status(200).send({status:true,data:alluser})
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}
const login = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data
        if (!email) {
            return res.status(400).send({ status: false, message: "email is required" });
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is required" });
        }

    const userId = await userModel.findOne({ email: email });
        if (!userId) {
            return res.status(400).send({ status: false, message: "user not found with this emailId" });
        }
        const passwordMatch = await bcrypt.compare(password, userId.password);
        if (passwordMatch===false) {
            return res.status(400).send({ status: false, message: "incorrect password" });
        }

        const token = jwt.sign({
            id: userId._id,
            email: email,
            password: userId.password
        }, "student");

        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, message: "token created successfully", data: token });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}


module.exports = { createuser, getalluser, login }
