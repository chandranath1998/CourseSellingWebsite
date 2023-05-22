const userModel = require("../models/userModel")
const courseModel = require("../models/courseModel")
const enrollModel=require("../models/enrollModel")
const { default: mongoose } = require("mongoose")


const enrollcourse = async function (req, res) {
    try {
        const course = req.body.course;
        let user = req.token.id;
           const userexist = await userModel.findById(user);

        if (userexist.role == "admin") {
            return res.status(400).send({ status: false, msg: "user is admin" });
        }

        if (!mongoose.isValidObjectId(course)) {
            return res.status(400).send({ status: false, msg: "courseId is not valid" });
        }
        let enrolledcourses = userexist.enrolledCourses 
        
        for (let i of enrolledcourses){
            if (i == course) {
                return res.status(400).send({ status: false, msg: "already enrolled in the course" });

            }
        }

        const courseexist = await courseModel.findById(course);

        if (!courseexist) {
            return res.status(400).send({ status: false, msg: "course does not exist" });
        }

        const enrolluser = await enrollModel.create({ course, user });


        if (!userexist.enrolledCourses) {
            userexist.enrolledCourses = [];
        }

        userexist.enrolledCourses.push(course);

        await userexist.save();

        res.status(200).send({ status: true, data: enrolluser });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


const getallenrollcourse = async function (req, res) {
    try {
        const allenrollcourse = await enrollModel.find({});
        res.status(200).send({ status: true, data: allenrollcourse })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

module.exports = { enrollcourse, getallenrollcourse }

