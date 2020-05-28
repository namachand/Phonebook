const express=require('express');
const router=express.Router();
const Contact=require('../modals/contactModal');

router.route('/contactDetails').post((req,res)=>{
    console.log(req.body);
    const contactDetails=new Contact({
        name:req.body.name,
        dateOfBirth:req.body.dateOfBirth,
        mobileNumber:req.body.mobileNumber,
        email:req.body.email
        })
        contactDetails.save()
        .then(()=>{
            res.status(200).send({
                message:'data updated'
            })
        })   
        .catch((err)=>{
            console.log(err);
        })
})
module.exports=router;