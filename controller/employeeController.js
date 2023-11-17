const Employee = require('../model/EmployeeSchema');

/*
POST -> CREATE
GET -> READ
PUT -> UPDATE
DELETE -> DELETE
*/

const postEmployee = async (req, resp) => {
    try {
        const existingEmployee  = await Employee.findOne({ nic: req.body.nic });

        if (existingEmployee ) {
            resp.status(409).json({ status: false, message: 'Employee  with the same nic already exists!' });
        } else {
            const tempEmployee  = new Employee({
                nic: req.body.nic,
                name: req.body.name,
                address: req.body.address,
                salary: req.body.salary
            });

            await tempEmployee .save();
            resp.status(201).json({ status: true, message: 'Employee  was saved!' });
        }
    } catch (error) {
        resp.status(500).json(error);
    }
};

const getEmployee  = (req, resp)=>{
    Employee.findOne({nic:req.headers.nic}).then(result=>{
        if(result==null){
            resp.status(404).json({status:false, message:'Employee  not found!'});
        }else{
            resp.status(200).json({status:true, data:result});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });    
};

const updateEmployee  = (req, resp)=>{
    Employee.updateOne({nic:req.headers.nic},{
        $set:{
            nic:req.body.nic,
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary   
        }
    }).then(result=>{
        if(result.modifiedCount>0){
            resp.status(201).json({status:true, message:'Employee was Updated!'});
        }else{
            resp.status(200).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

const deleteEmployee = (req, resp)=>{
    Employee.deleteOne({nic:req.headers.nic}).then(result=>{
        if(result.deletedCount>0){
            resp.status(204).json({status:true, message:'Employee was deleted!'});
        }else{
            resp.status(400).json({status:false, message:'try again!'});  
        }
    }).catch(error=>{
        resp.status(500).json(error);
    });  
};

const getAllEmployees = (req, resp)=>{
    Employee.find().then(result=>{
         resp.status(200).json({status:true, data:result});    
    }).catch(error=>{
        resp.status(500).json(error);
    });     
};

module.exports= {
    postEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployees
}