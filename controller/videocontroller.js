const videoModel = require('../models/videoModel')

const { uploadFile } = require("./aws")

const createvideo = async function (req, res) {
    try {
        let data = req.body
        const { course} = data
        let files = req.files
        if (!(course)) {
            return res.status(400).send({ status: false, message: "course are mandatory" });
        }
        if (files && files.length > 0) {
            let uploadedFileURL = await uploadFile(files[0]);
            data.files = uploadedFileURL
        }
        else {
            return res.status(400).send({ status: false, msg: "file is Mandatory" });
        }
        const savedvideo = await videoModel.create(data)
        res.status(201).send({ status: true, data: savedvideo });

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });


    }
}

const getallvideo = async function (req, res) {
    try {
        const getallvideo = await videoModel.find()
        res.status(200).send({ status: true, data: getallvideo });

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message });

    }
}

module.exports = { createvideo, getallvideo }