const mongoose= require('mongoose');
const contactSchema=new mongoose.Schema({
    name:{
        type:String,
        default:'',
    },
    dateOfBirth:{
        type:String,
        default:'',
    },
    mobileNumber:[{
        type:Number,
        default:''
    }],
    email:[{
        type:String,
        default:''
    }],
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('Contact',contactSchema);