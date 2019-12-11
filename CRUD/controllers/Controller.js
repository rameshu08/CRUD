const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Phone = mongoose.model('Phone');

router.get('/', (req,res) =>{
    res.render("phoneBook/addOrUpdate",{
        viewTitle : "Add Details"
    });
});

router.post('/',(req,res) =>{
    if(req.body._id == '')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    var phone = new Phone();
    phone.name = req.body.name;
    phone.mobile = req.body.mobile;
    phone.save((err,doc) => {
        if(!err)
            res.redirect('/list');
        else{
            if(err.name == 'ValidationError') {
                handleValidatorError(err,req.body);
                res.render("phoneBook/addOrUpdate",{
                    viewTitle : "Add Details",
                    phone:req.body
             });
            }else{
                console.log('Err during insert'+err);
            }
            
        }
    });
};

function updateRecord(req,res) {
    Phone.findOneAndUpdate({_id:req.body._id},req.body,{new: true},(err,docs)=>{
        if(!err) {
            res.redirect('/list');
        }else{
            if(err.name == 'ValidationError') {
                handleValidatorError(err,req.body);
                res.render("phoneBook/addOrUpdate",{
                    viewTitle:"Update",
                    phone:req.body
                });
            }
        }
    });
}

router.get('/list', (req,res) =>{
    Phone.find((err,docs) =>{
        if(!err) {
            res.render("phoneBook/list", {
                list:docs
            });
        }else{
            console.log("Error in finding:"+err);
        }
    });
});

function handleValidatorError(err,body) {
    for(field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id',(req,res) =>{
    Phone.findById(req.params.id,(err,docs) =>{
        if(!err) {
            res.render("phoneBook/addOrUpdate",{
                viewTitle:"Update",
                phone: docs
            });
        }
    });
});

router.get('/delete/:id',(req,res) =>{
    Phone.findByIdAndRemove(req.params.id,(err,docs) =>{
        if(!err) {
            res.redirect('/list');
        }
        else{
            console.log('Error in employee delete:'+err);
        }
    });
});

module.exports = router;