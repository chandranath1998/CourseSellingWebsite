const express = require("express")
const router = express.Router();
const { createCourse, getallcourse, updatecourse,deletecourse }=require("../controller/courseController")
const { createuser, getalluser, login } = require("../controller/userController")
const { enrollcourse, getallenrollcourse } = require("../controller/enrollController")
const { createvideo, getallvideo }=require("../controller/videocontroller")
const { paynow, callback }=require("../controller/payment")
const { authentication, checkadmin } = require("../Mw/auth")

//------------------user-----------------------------------
router.post('/createuser', createuser)
router.get('/alluser', getalluser)
router.post("/login", login)

//-----------------course--------------------------------
router.post('/createcourse', authentication,checkadmin,createCourse)
router.get('/allcourse', authentication, getallcourse)
router.put('/updatecourse', authentication, checkadmin, updatecourse)
router.delete('/delet/:courseId', authentication,checkadmin,deletecourse)
//-----------------enrolled--------------------------------

router.post('/enroll', authentication, enrollcourse)
router.get('/allenroll', authentication, getallenrollcourse)

//-----------------video------------------------------------
router.post('/createvideo', createvideo)
router.get('/allvideo', getallvideo)
//------------------payment-----------------------------------
router.post('/paynow', paynow)
router.post('/callback', callback)



module.exports = router;