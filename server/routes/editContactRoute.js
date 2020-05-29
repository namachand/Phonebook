const express=require('express');
const router=express.Router();
const paginate = require('jw-paginate');
const Contact=require('../modals/contactModal');
// getting the detail of particular user for editing
router.route('/getForEdit').get((req,res,next)=>{
    Contact.findOne({_id:req.query.id})
    .then((contacts)=>{
       
        if(!contacts){
            res.send({
                message:'not found'
            })
        }
        else{
            res.status(200).send({
                contacts:contacts
            })
        }
        })
        .catch((err)=>{
            if(err){
                res.status(500).send({
                    message:'internal server error'
                })
            }
        })
        }
    );
//updating the user information
router.route('/updateContactDetails').put((req,res)=>{
    Contact.findByIdAndUpdate({_id:req.query.id},{$set:{name:req.body.name,dateOfBirth:req.body.dateOfBirth,mainMobileNumber:req.body.mainMobileNumber,mainEmail:req.body.mainEmail,alternateEmails:req.body.alternateEmails,alternateMobileNumbers:req.body.alternateMobileNumbers}})
    .then((updatedDetails)=>{
        if(!updatedDetails){
            res.status(404).send({
                message:'data not found'
            })
        }
        else{
            res.status(200).send({
                message:'your phonebook is updated'
            })
        }
    })
    .catch((err)=>{
        if(err){
            res.status(500).send({
                message:'internal error'
            })
        }
    })
})
module.exports=router;