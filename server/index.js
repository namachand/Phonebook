const express=require('express');
const mongoose=require('mongoose');
const http=require('http');
const bodyParser  = require('body-parser');
const cors = require('cors');
const addContactDetailsRoute=require('./routes/addContact');
const getContactDetailsRoute=require('../server/routes/getContact');
const editContactDetailsRoute=require('../server/routes/editContactRoute')
const searchContactsRoute=require('../server/routes/searchContacts')
const deleteContactRoute=require('../server/routes/deleteContact');
mongoose.connect("mongodb+srv://caman3874:qwertyuiopaman1234@@amanco-pexfz.mongodb.net/test?retryWrites=true&w=majority",
{ useNewUrlParser: true },
()=>{
    console.log("connect to mongodb");
});
mongoose.set('useFindAndModify', false);
const app =express();
const server=http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT=process.env.PORT || 3231;
app.use(cors());
//getting the routes
app.use('/addUsers',addContactDetailsRoute);
app.use('/getUserContacts',getContactDetailsRoute);
app.use('/usersUpdate',editContactDetailsRoute);
app.use('/usersContacts',searchContactsRoute);
app.use('/deleteUsers',deleteContactRoute);

server.listen(PORT,()=>{
    console.log("connected to port:"+ PORT);
})