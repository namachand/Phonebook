const express=require('express');
const router=express.Router();
const paginate = require('jw-paginate');
const Contact=require('../modals/contactModal');
// pagination for getting the contact lists
router.route('/contactDetailsPages').get((req,res,next)=>{
    Contact.find((err,contacts)=>{
        var page=parseInt(req.query.page)  || 1;
        var pager=paginate(contacts.length,page,4);
        var allContacts=contacts.slice(pager.startIndex , pager.endIndex+1);
        res.send({allContacts,pager});
        })
        .sort({date:-1})
        }
    );

module.exports=router;