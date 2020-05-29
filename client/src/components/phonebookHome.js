import React from 'react'
import '../css/phonebookHome.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import { Card, CardBody,Button, Input,Form} from 'reactstrap';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pager:{},
            allContacts:[],
            searchedContacts:[],
            showRemove:false,
            deleteContactId:''

        }
        this.searchItem=this.searchItem.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.remove=this.remove.bind(this);

    }

    componentDidMount(){
        this.loadContactDetails()
    }

    componentDidUpdate(){
        this.loadContactDetails()
    }
    //searching contacts of the users

    searchItem(event){
        event.preventDefault();
        var searchValue=document.getElementById('search').value;
        console.log('here',searchValue.length);
            axios.get(`http://localhost:3231/usersContacts/searchContacts?value=${searchValue}`)
            .then((res)=>{
                console.log(res.data);
                if(res.data.success==true){
                    this.setState({searchedContacts:res.data.contacts})
                }
                else{
                    this.setState({searchedContacts:[]})
                }
            })  
        }

    //paginating the lists of contacts 
    loadContactDetails(){
        const param=new URLSearchParams(this.props.location.search);
        const page=parseInt(param.get('page')) || 1;
        if(page !== this.state.pager.currentPage){
            axios.get(`http://localhost:3231/getUserContacts/contactDetailsPages?page=${page}`)
            .then((contacts)=>{
                this.setState({pager:contacts.data.pager});
                this.setState({allContacts:contacts.data.allContacts});
                })
            }
    }

    // for managing the openeing of modal
    handleOpen(event){
        event.preventDefault()
        var value=event.target.value
        console.log(value);
        this.setState({deleteContactId:value})
        this.setState({showRemove:true})
    }
    //for managing the closing of modal
    handleClose(event){
        this.setState({showRemove:false})
    }

    //for removing the user phonebook
    remove(event){
        event.preventDefault()
        console.log('inside remove')
        console.log(this.state.deleteContactId);
        axios.get(`http://localhost:3231/deleteUsers/remove?id=${this.state.deleteContactId}`)
        .then((res)=>{
            if(res.data.success===true){
                this.setState({showRemove:false})
                window.location.href='/'
            }
            
        })
       
    }

    render(){
        console.log(this.state.allContacts)
        return(
        <React.Fragment>
             <Form className="mt-2" style={{display:'flex',justifyContent:'center',postion:'fixed'}}>
                <Input type="text" placeholder="search by name"  name='term' id='search' onChange={this.searchItem} style={{
                    width:"50vw",
                    minHeight:'6vh',
                    fontSize:'larger',
                    border:'solid 1px grey',
                    marginRight:'10%'
                }} />
            </Form> 
            <div style={{ display:'flex',justifyContent:'center'}}>
            <div style={{
                    backgroundColor:'grey',
                    width:'50vw',
                    marginTop:'6px',
                    marginRight:'10%'
                   
                }}>
                    {
                        this.state.searchedContacts.map((searchContact)=>{
                            return(
                                <div style={
                                    {
                                        color:'white',
                                    }
                                } key={searchContact._id}>
                               <p  className='fa fa-search ml-2 mt-2' > <Link to={{pathname:'/showContact',data:searchContact._id}} style={{
                                   color:'white'
                               }}> {searchContact.name}</Link></p>
                                </div>
                            )
                        })
                    }
                </div>
                </div>
                <Modal show={this.state.showRemove} onHide={this.handleClose}>
                    <Modal.Body >Are you sure you want to remove this account?</Modal.Body>
                        <Modal.Footer>
                            <Button className='bg-danger' onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button className='bg-primary' onClick={this.remove}>
                                Remove
                            </Button>
                        </Modal.Footer>
                </Modal>
            <div className='row'>
                <div className='col-md-9 offset-1'>
                    {this.state.allContacts.map((contact)=>{
                    return(
                        <div className='row mt-3 mb-3 storyCard' style={{display:'flex',justifyContent:'center'}} key={contact._id}>
                            <Card style={{
                                minHeight:'30vh',
                                width:'40vw',
                                marginTop:'2vh',
                                backgroundColor:'yellowgreen',
                                border:'solid 1px,grey'
                                }}>
                                <CardBody>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <p className='contactdetail'>{contact.name}</p>
                                            </div>                          
                                        </div>
                                    <div className='row'> 
                                        <div className='col-md-3'> 
                                            <p >{contact.dateOfBirth}</p>
                                            </div>
                                        <div className='col-md-3 offset-3'>
                                            <Link to={{pathname:'/editContact',data:contact._id}}><Button className='contactdetail' id='submitDetails' style={{width:'8vw',backgroundColor:'cadetblue'}}>Edit</Button></Link>
                                            </div>
                                        <div className='col-md-3'>
                                            <Button className='contactdetail' id='submitDetails' value={contact._id} style={{width:'8vw',backgroundColor:'red'}} onClick={this.handleOpen}>Remove</Button>
                                            </div>
                                        </div>
                                        <div className='row' style={{backgroundColor:'papayawhip',marginTop:'15px',minHeight:'12vh'}}>
                                            <div className='col-md-4'>
                                            <p className='fa fa-phone fa-lg contactdetail mt-2'>  {contact.mainMobileNumber}</p>
                                                {contact.alternateMobileNumbers.map((number)=>{
                                                    return(
                                                        <p className='fa fa-phone fa-lg contactdetail mt-2'>  {number}</p>
                                                    )
                                                })}
                                                </div>
                                            <div className='col-md-6 offset-2' >
                                            <p className='fa fa-envelope fa-lg contactdetail mt-2'>  {contact.mainEmail}</p>
                                                {contact.alternateEmails.map((mail)=>{
                                                    return(
                                                        <p className='fa fa-envelope fa-lg contactdetail mt-2' style={{paddingTop:'5px'}}>  {mail}</p>

                                                    )
                                                })
                                                }
                                                </div>
                                            </div>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    })}  
                <div className="pb-0 pt-3 pageList">
                    {this.state.pager.pages && this.state.pager.pages.length &&
                    <ul className="pagination" style={{display:'flex',justifyContent:'center'}}>
                        {this.state.pager.pages.map(page =>
                        <li key={page} className={`page-item number-item ${this.state.pager.currentPage === page ? 'active' : ''}`}>
                            <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                            </li>
                        )}
                        </ul>
                    }                    
                    </div>    
                </div>
                <div className='col-md-2'>
                    <Link to='/createContact'><span className='fa fa-plus fa-5x' id='createContact' onClick={this.createContact}>
                        </span></Link>
                    </div> 
            </div>
            </React.Fragment>
        )
    }
}
export default Home