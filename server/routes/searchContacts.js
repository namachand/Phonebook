const express=require('express');
const router=express.Router();
const Contact=require('../modals/contactModal');
router.route('/searchContacts').get((req,res,next)=>{
    console.log(typeof(req.query.a));
    let r=req.query.value
    console.log(r);
    let q={
        'name':new RegExp('^'+r,'i')

    }
    console.log('query is',q);
    if(r!=''){
        Contact.find({name: new RegExp('^'+r,'i')},(err,contacts)=>{ 
            if(err){
               return res.status(500).send({
                    message:'internal error'
                })
            }  
            if(!contacts){
                console.log('no results found');
                }
            else{
                console.log('results found');
                console.log(contacts);
                return res.send({
                success:true,
                contacts:contacts
                });
            }
        })
        .sort({name:1})
    }
    else{
        return res.send({
            success:false
        });
    }
    })
    module.exports=router;