const express=require('express');
const router=express.Router();
const Contact=require('../modals/contactModal');
// pagination for getting the contact lists
router.route('/remove').get((req,res,next)=>{
    Contact.findByIdAndDelete({_id:req.query.id})
        .then((contacts)=>{
        if(!contacts){
           return res.status(404).send({
                message:'data not found'
            })
        }
        else{
           return res.status(200).send({
                success:true,
                message:'contact is deleted'
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
        }
    );

module.exports=router;