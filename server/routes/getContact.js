const express=require('express');
const router=express.Router();
const paginate = require('jw-paginate');
const Contact=require('../modals/contactModal');
// pagination for getting the contact lists
router.route('/contactDetailsPages').get((req,res)=>{
    Contact.find((err,contacts)=>{
        var page=parseInt(req.query.page)  || 1;
        var pager=paginate(contacts.length,page,4);
        var allContacts=contacts.slice(pager.startIndex , pager.endIndex+1);
        res.send({allContacts,pager});
        })
        .sort({date:-1})
        }
    );

    router.route('/searchbarContact').get((req,res)=>{
        console.log(req.query);
        Contact.findById({_id:req.query.value},(err,result)=>{
            if(err){
                console.log(err);
            }
            if(!result){
                return res.status(404).send({
                    message:'user not found'
                })
            }
            else{
                console.log('inside here')
                console.log(result)
                return res.status(200).send({
                    message:'user found',
                    result:result
                })
            }
        })
    })
module.exports=router;