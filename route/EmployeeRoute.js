const express = require('express');
const EmployeeController = require('../controller/employeeController');

const router = express.Router();

router.post('/create-employee', EmployeeController.postEmployee);
router.put('/update-employee', EmployeeController.updateEmployee);
router.delete('/delete-employee', EmployeeController.deleteEmployee);
router.get('/get-employee', EmployeeController.getEmployee);
router.get('/get-all-employees', EmployeeController.getAllEmployees);


module.exports=router;