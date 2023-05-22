const courseModel=require("../models/courseModel")
const { uploadFile } = require("./aws")
const mongoose=require("mongoose")

const createCourse = async function (req, res) {
    try {
        let data = req.body;
        const { title, course, price } = data;
        let files=req.files
        if (!(title || course || price)) {
            return  res.status(400).send({ status: false, message: "All fields are mandatory" });
        }
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0]);
            data.files = uploadedFileURL
        }
        else {
            return res.status(400).send({status:false, msg: "file is Mandatory" });
        }
        
        const savedData = await courseModel.create(data);
        // savedData.course.push(course)

        res.status(201).send({ status: true, data: savedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};


const getallcourse = async function (req, res) {
    try {
        const getallcourse = await courseModel.find({isDeleted:false})
        res.status(200).send({ status: true, data: getallcourse })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

const updatecourse = async function (req, res) {
    try {
        // const Id=req.params.Id
       const data = req.body
       const { title, course, courseId } = data
        if (!(courseId)) {
            return res.status(400).send({ status: false, message: "coureId is not present" });
        }
        const obj = {};
        if (title) {
            obj.title = title;
        }
        if (course) {
            obj.course = course;
        }
        const updatecourse = await courseModel.findOneAndUpdate({ _id: courseId },obj,{new:true})
        res.status(200).send({ status: true, data: updatecourse });
}
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

const deletecourse = async function (req, res) {
    try {
        let courseId = req.params.courseId

        if (mongoose.Types.ObjectId.isValid(courseId) == false) {
            return res.status(400).send({ status: false, message: "Invalid courseId" });
        }
           await courseModel.findOneAndUpdate({ _id: courseId },{ isDeleted: true })
        res.status(200).send({ status: true,  msg: "course is successfully deleted" })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports = { createCourse, getallcourse, updatecourse, deletecourse }