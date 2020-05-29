const express=require('express');
const router=express.Router();
const Contact=require('../modals/contactModal');

router.route('/contactDetails').post((req,res)=>{
    console.log(req.body);
    const contactDetails=new Contact({
        name:req.body.name,
        dateOfBirth:req.body.dateOfBirth,
        mainMobileNumber:req.body.mainMobileNumber,
        mainEmail:req.body.mainEmail,
        alternateMobileNumbers:req.body.alternateMobileNumbers,
        alternateEmails:req.body.alternateEmails
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