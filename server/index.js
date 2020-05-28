const express=require('express');
const mongoose=require('mongoose');
const http=require('http');
const bodyParser  = require('body-parser');
const cors = require('cors');
const addContactDetailsRoute=require('./routes/addContact');
const getContactDetailsRoute=require('../server/routes/getContact');

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

server.listen(PORT,()=>{
    console.log("connected to port:"+ PORT);
})