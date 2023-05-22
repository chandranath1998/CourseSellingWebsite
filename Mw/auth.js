
const courseModel = require("../models/courseModel")
const userModel = require("../models/userModel")

const jwt = require("jsonwebtoken")


const authentication = async function (req, res,next) {
    try {
        let token = req.headers["x-api-key"]
        if (!(token)) {
            return res.status(401).send({ status: false, message: "token must be present" })

        }
        let decode = jwt.verify(token, "student")
        if (!(decode)) {
            return res.status(401).send({ status: false, message: "user not authenticated" })
        }
        req.token = decode
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })

    }
}
let checkadmin = async function (req, res, next) {
    try {
        let userId = req.token.id;
        // console.log(userId);

        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ status: false, msg: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).send({
                status: false,
                msg: "User is not authorized to modify course data",
            });
        }

        next();
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};



module.exports = { authentication, checkadmin }





