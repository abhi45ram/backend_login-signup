require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const StudentModel = require('./studentModel.js');
const student = require('./studentModel.js');

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate JWT token
function generateToken(student) {
  return jwt.sign({ id: student._id, email: student.email }, JWT_SECRET, { expiresIn: '1h' });
}

function createStudentDBService(studentDetails) {
  return new Promise(function(resolve, reject) {
    const studentModelData = new StudentModel({
      name: studentDetails.name,
      dob: studentDetails.dob,
      email: studentDetails.email,
      password: studentDetails.password, 
    });
    console.log(studentDetails.password, studentModelData);

    studentModelData.save()
      .then(function(result) {
        resolve(true); 
      })
      .catch(function(error) {
        console.error(error);
        reject(false); 
      });
  });
}


function loginuserDBService(studentDetails) {
  console.log(studentDetails);
  return new Promise(function(resolve, reject) {
    StudentModel.findOne({ email: studentDetails.email })
      .then(function(result) {
        if (result !== undefined && result !== null) {
          
          const isPasswordValid = bcrypt.compareSync(studentDetails.password, result.password);
          console.log(studentDetails.password, result.password)
          if (isPasswordValid) {
            const token = generateToken(result); // Generate JWT token
            resolve({ status: true, msg: "Student Validated Successfully", token });
          } else {
            reject({ status: false, msg: "Student Validation failed" });
          }
        } else {
          reject({ status: false, msg: "Student Error Details" });
        }
      })
      .catch(function(error) {
        console.error(error);
        reject({ status: false, msg: "Invalid Data" });
      });
  });
}

module.exports = { createStudentDBService, loginuserDBService };
