import React from 'react'
import '../css/phonebookHome.css'
import { Card, CardBody,Button} from 'reactstrap';
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

import axios from 'axios';
class ShowContact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            id:'',
            name:'',
            dateOfBirth:'',
            mainMobileNumber:'',
            alternateMobileNumbers:[],
            mainEmail:'',
            alternateEmails:[],
            showRemove:false,
            deleteContactId:''
        }
        this.handleClose=this.handleClose.bind(this);
        this.handleOpen=this.handleOpen.bind(this);
        this.remove=this.remove.bind(this);
    }
    componentDidMount(){
        if(this.props.location.data!=undefined){
            var id=this.props.location.data;
            window.localStorage.setItem('id',JSON.stringify(id))
        }
        var contactId=JSON.parse(localStorage.getItem('id'));
        console.log(contactId);
        axios.get(`http://localhost:3231/getUserContacts/searchbarContact?value=${contactId}`)
        .then((res)=>{
            console.log(res.data.result[0])
            this.setState({id:res.data.result._id})
            this.setState({name:res.data.result.name})
            this.setState({dateOfBirth:res.data.result.dateOfBirth})
            this.setState({mainMobileNumber:res.data.result.mainMobileNumber})
            this.setState({alternateMobileNumbers:res.data.result.alternateMobileNumbers})
            this.setState({mainEmail:res.data.result.mainEmail})
            this.setState({alternateEmails:res.data.result.alternateEmails})
        })
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
            else{
                alert('cannot delete the item:',res.data.message);
            }
        })
       
    }

    render(){
        console.log(this.state.name)
        return(
            <div style={{display:'flex',justifyContent:'center',marginTop:'5vh'}}>
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
                            <p className='contactdetail'>{this.state.name}</p>
                            </div>                          
                        </div>
                    <div className='row'> 
                        <div className='col-md-3'> 
                            <p >{this.state.dateOfBirth}</p>
                            </div>
                        <div className='col-md-3 offset-3'>
                            <Link to={{pathname:'/editContact',data:this.state.id}}><Button className='contactdetail' id='submitDetails' style={{width:'8vw',backgroundColor:'cadetblue'}}>Edit</Button></Link>
                            </div>
                        <div className='col-md-3'>
                            <Button className='contactdetail' id='submitDetails' value={this.state.id} style={{width:'8vw',backgroundColor:'red'}} onClick={this.handleOpen}>Remove</Button>
                            </div>
                        </div>
                        <div className='row' style={{backgroundColor:'papayawhip',marginTop:'15px',minHeight:'12vh'}}>
                            <div className='col-md-4'>
                            <p className='fa fa-phone fa-lg contactdetail mt-2'>  {this.state.mainMobileNumber}</p>
                                {this.state.alternateMobileNumbers.map((number)=>{
                                    return(
                                        <p className='fa fa-phone fa-lg contactdetail mt-2'>  {number}</p>
                                    )
                                })}
                                </div>
                            <div className='col-md-6 offset-2' >
                            <p className='fa fa-envelope fa-lg contactdetail mt-2'>  {this.state.mainEmail}</p>
                                {this.state.alternateEmails.map((mail)=>{
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
    }
}
export default ShowContact