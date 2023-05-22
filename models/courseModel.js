const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
 
  },
    course: [{
        type: String,
        enum:["Physics","Math","Chemistry","English"]
   }],
  price: {
    type: Number,

  },
  files: [{
    type: String,
    fileUrl: String
  }],
  
  isDeleted:{
    type: Boolean,
    default:false
  }


});

module.exports = mongoose.model('Course', courseSchema);


