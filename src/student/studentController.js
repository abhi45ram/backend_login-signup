var studentService = require('./studentService');

var loginUserControllerFn = async (req, res) => {
  try {
    const result = await studentService.loginuserDBService(req.body);
    console.log('some');    console.log(result);
    if (result.status) {
        
      res.json({ status: true, message: result.msg, token: result.token }); 
    } else {
      res.status(401).json({ status: false, message: result.msg });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

var createStudentControllerFn = async (req, res) => {
  try {
    var status = await studentService.createStudentDBService(req.body);
    if (status) {
      res.send({ status: true, message: "Student created successfully" });
    } else {
      res.send({ status: false, message: "Error creating user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

module.exports = { createStudentControllerFn, loginUserControllerFn };
