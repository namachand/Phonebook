import React from 'react'
import { Card,Button, Input,Form, FormGroup} from 'reactstrap';
import  '../css/createcontact.css'
import axios from 'axios';
class EditContact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mobileNumbers:[],
            emails:[],
            update:true
        }
        this.editContactDetails=this.editContactDetails.bind(this);
        this.goBack=this.goBack.bind(this);
        this.addMoreNumbers=this.addMoreNumbers.bind(this);
        this.addNumbersClick=this.addNumbersClick.bind(this);
        this.addMoreEmails=this.addMoreEmails.bind(this);
        this.addEmailsClick=this.addEmailsClick.bind(this);
    }

    componentDidMount(){
        if(this.props.location.data!=undefined){
            const id=this.props.location.data
            window.localStorage.setItem('id',JSON.stringify(id))
        }
        this.getContactToEdit()
    }

    componentDidUpdate(){
        this.getContactToEdit()
    }

    getContactToEdit(){
        var contactId=JSON.parse(localStorage.getItem('id'));
        if(this.state.update==true){
            axios.get(`http://localhost:3231/usersUpdate/getForEdit?id=${contactId}`)
            .then((res)=>{
                this.setState({mobileNumbers:res.data.contacts.alternateMobileNumbers})
                this.setState({emails:res.data.contacts.alternateEmails})
                document.getElementById('contactName').value=res.data.contacts.name;
                document.getElementById('contactDOB').value=res.data.contacts.dateOfBirth;
                document.getElementById('mobileNumber').value=res.data.contacts.mainMobileNumber;
                document.getElementById('contactEmail').value=res.data.contacts.mainEmail;
            this.setState({update:false});
            })
        }
    }

    //adding the contact details to the database
    editContactDetails(event){
        event.preventDefault();
        var contactId=JSON.parse(localStorage.getItem('id'));
        var name=document.getElementById('contactName').value;
        var dateOfBirth=document.getElementById('contactDOB').value;
        var mainMobileNumber=document.getElementById('mobileNumber').value;
        var mainEmail=document.getElementById('contactEmail').value;
        var alternateMobileNumbers=this.state.mobileNumbers
        var alternateEmails=this.state.emails
        axios.put(`http://localhost:3231/usersUpdate/updateContactDetails?id=${contactId}`,{name:name,dateOfBirth:dateOfBirth,mainMobileNumber:mainMobileNumber,mainEmail:mainEmail,alternateEmails:alternateEmails,alternateMobileNumbers:alternateMobileNumbers})
        .then((res)=>{
            alert(res.data.message)
            this.setState({update:true});

        })
    }

    // add more mobile numbers on clicking the button
    addNumbersClick(){
        this.setState(prevState => ({ mobileNumbers: [...prevState.mobileNumbers, '']}))
    }

    addMoreNumbers(){
        return this.state.mobileNumbers.map((currentValue, index) => 
            <div className='row' key={index}>
                <div className='col-md-10'>
                    <Input type="text"  value={currentValue} onChange={this.handleNumbers.bind(this, index)} style={{height:'6vh',marginTop:'2px',width:'26.5vw'}}/>
                </div>
                <div className='col-md-2'>
                    <span className='fa fa-times fa-lg' onClick={this.removeNumberClick.bind(this, index)}>
                        </span>
                </div>  
            </div>          
        )
    }

    handleNumbers(i, event) {
        let mobileNumbers = [...this.state.mobileNumbers];
        mobileNumbers[i] = event.target.value;
        this.setState({ mobileNumbers });
    }
   
    //adding more emails on clicking the button
    addEmailsClick(){
        this.setState(prevState => ({ emails: [...prevState.emails, '']}))
    }

    addMoreEmails(){
        return this.state.emails.map((currentValue, index) => 
            <div key={index} className='row'>
                <div className='col-md-10'>
                    <Input type="text" value={currentValue} onChange={this.handleEmails.bind(this, index)} style={{height:'6vh',marginTop:'2px',width:'26.5vw'}}  placeholder='saveTrees@gmail.com'/>
                    </div>
                <div className='col-md-2'>
                    <span className='fa fa-times fa-lg ' onClick={this.removeEmailClick.bind(this, index)}>
                        </span>
                    </div>
               {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
            </div>          
        )
    }

    handleEmails(i, event) {
        let emails = [...this.state.emails];
        emails[i] = event.target.value;
        this.setState({ emails });
    }

     //removing  created phonenumbers
     removeNumberClick(i){
        let mobileNumbers = [...this.state.mobileNumbers];
        mobileNumbers.splice(i,1);
        this.setState({ mobileNumbers });
     }
    //removing  created emails
     removeEmailClick(i){
        let emails = [...this.state.emails];
        emails.splice(i,1);
        this.setState({ emails });
     }
    //going back to the home page
    goBack(){
        this.props.history.push('/')
    }

    render(){
        console.log(this.state.mobileNumbers);
        console.log(this.state.emails);
        return(
            <div style={{display:'flex',justifyContent:'center',marginTop:'5vh'}}>
                <Card id='contactDetails'>
                    <div className='row mt-3'>
                        <div className='col-md-2 ml-2'>
                            <span className='fa fa-arrow-left fa-lg' style={{display:'flex',textAlign:'center'}} onClick={this.goBack}></span>
                            </div>
                            <div className='col-md-9'>
                                <span>Edit Your Details</span>
                                </div>
                            </div>
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <Form onSubmit={this.editContactDetails} style={{marginTop:'3vh'}}>
                                <FormGroup className='contacts'>
                                    Name<span className='reddot'> *</span>
                                    <Input type='text'  id='contactName' placeholder='Name' onBlur={this.error} style={{height:'6vh'}}/>
                                    <p id='nameError'></p>
                                    </FormGroup>
                                <FormGroup className='contacts'>
                                    DOB<span className='reddot'> *</span>
                                    <Input type='date' id='contactDOB'   placeholder='DD/MM/YY' onBlur={this.error} style={{height:'6vh'}}/>
                                    <p id='DOBError'></p>
                                    </FormGroup>
                                <FormGroup className='canAddMore'>
                                    Mobile Number<span className='reddot'> *</span>
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            <Input type='tel' id='mobileNumber'  placeholder='' onBlur={this.error} style={{height:'6vh'}} />
                                            {this.addMoreNumbers()} 
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg' onClick={this.addNumbersClick}></span>
                                                </div>
                                            </div>
                                            <p id='numberError'></p>
                                    </FormGroup>
                                <FormGroup className='canAddMore'>
                                    Email<span className='reddot'> *</span>
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            <Input type='email' id='contactEmail'  placeholder='saveAnimals@gmail.com' onBlur={this.error} style={{height:'6vh'}}/>
                                            {this.addMoreEmails()} 
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg' onClick={this.addEmailsClick}></span>
                                                </div>
                                        </div>
                                        <p id='numberError'></p>
                                    </FormGroup>
                                <FormGroup>
                                    <Button className='bg-primary' id='submitDetails' style={{width:'8vw'}}>Update</Button>
                                    </FormGroup>        
                                </Form>
                        </div>
                    </Card>
                </div>
        )
    }
}
export default EditContact