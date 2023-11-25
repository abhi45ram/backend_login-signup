var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var studentSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
  
studentSchema.pre("save", async function(next){
    const student = this;
    if(student.isModified("password")){
        student.password = await bcrypt.hash(student.password,8);

    }
    next()
})
 
 const student = mongoose.model('student',studentSchema);
 
 module.exports = student;


