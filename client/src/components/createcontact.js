import React from 'react'
import { Card,Button, Input,Form, FormGroup} from 'reactstrap';
import  '../css/createcontact.css'
import axios from 'axios';
import MainRoutes from './mainRoutes';
class CreateContact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            mobileNumbers:[],
            emails:[]
        }
        this.sendContactDetails=this.sendContactDetails.bind(this);
        this.goBack=this.goBack.bind(this);
        this.addMoreNumbers=this.addMoreNumbers.bind(this);
        this.addNumbersClick=this.addNumbersClick.bind(this);
        this.addMoreEmails=this.addMoreEmails.bind(this);
        this.addEmailsClick=this.addEmailsClick.bind(this);
    }

    //for validating the forms
    error(event){         
        event.preventDefault();
        console.log(event.target.value);
        console.log(event.target.id)
        if(event.target.value===''){
            var a=document.getElementById(event.target.id)
            a.style.borderColor='red'
            var b=document.getElementById(event.target.id+'error');
            b.innerHTML="This field can't be left blank"
            b.style.color='red'
        }
        else if(event.target.id==='mobileNumber'&& event.target.value.length<10 ||event.target.id==='mobileNumber'&& event.target.value.length>10){
            var a=document.getElementById(event.target.id)
            a.style.borderColor='red'
            var b=document.getElementById(event.target.id+'error');
            b.innerHTML="Not a valid phone number must be of 10 digits"
            b.style.color='red'
        }
        else{
            var a=document.getElementById(event.target.id)
            a.style.border='solid 1px green';
            document.getElementById(event.target.id+'error').innerHTML='';
            // this.setState({category:true});
        }
    }
  
    //adding the contact details to the database
    sendContactDetails(event){
        event.preventDefault();
        var name=document.getElementById('contactName').value
        var dateOfBirth=document.getElementById('contactDOB').value
        var mainMobileNumber=document.getElementById('mobileNumber').value
        var mainEmail=document.getElementById('contactEmail').value
        var alternateMobileNumbers=this.state.mobileNumbers
        var alternateEmails=this.state.emails

        axios.post('http://localhost:3231/addUsers/contactDetails',{name:name,dateOfBirth:dateOfBirth,mainMobileNumber:mainMobileNumber,mainEmail:mainEmail,alternateEmails:alternateEmails,alternateMobileNumbers:alternateMobileNumbers})
        .then((res)=>{
            console.log(res);
            window.location.href='/createContact'
        })
        document.getElementById('contactName').value=''
        document.getElementById('contactDOB').value=''
        document.getElementById('mobileNumber').value=''
        document.getElementById('contactEmail').value=''
    }

    // add more mobile numbers on clicking the button
    addNumbersClick(){
        this.setState(prevState => ({ mobileNumbers: [...prevState.mobileNumbers,'']}))
    }

    addMoreNumbers(){
        return this.state.mobileNumbers.map((currentValue, index) => 
                <div className='row' key={index}>
                    <div className='col-md-10'>
                        <Input type="Number" value={currentValue}  onChange={this.handleNumbers.bind(this, index)} style={{height:'6vh',marginTop:'2px',width:'26.5vw'}}/>
                        </div>
                        <div className='col-md-2 '>
                            <span className='fa fa-times fa-lg'  onClick={this.removeNumberClick.bind(this, index)}></span>
                            </div>
                </div>     
        )
    }

    handleNumbers(i, event){
        event.preventDefault()
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
            <div className="row" key={index}>
                <div className='col-md-10'>
                    <Input type="email" value={currentValue}  onChange={this.handleEmails.bind(this, index)} style={{height:'6vh',marginTop:'2px',width:'26.5vw'}}  placeholder='saveTrees@gmail.com'/>
                    </div>
                    <div className='col-md-2'>
                        <span className='fa fa-times fa-lg'  onClick={this.removeEmailClick.bind(this, index)}></span>
                        </div>
            </div>          
        )
    }

    handleEmails(i, event) {
        let emails = [...this.state.emails];
        emails[i] = event.target.value;
        if(emails[i]!=""){
            this.setState({ emails });
        }
    }
    //removing extra created phonenumbers
    removeNumberClick(i){
        let mobileNumbers = [...this.state.mobileNumbers];
        mobileNumbers.splice(i,1);
        this.setState({ mobileNumbers });
     }
    //removing extra created emails
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
                                <span>Add new contact</span>
                                </div>
                            </div>
                            <div style={{display:'flex',justifyContent:'center'}}>
                            <Form onSubmit={this.sendContactDetails} style={{marginTop:'3vh'}}>
                                <FormGroup className='contacts'>
                                    Name<span className='reddot'> *</span>
                                    <Input type='text'  id='contactName' placeholder='Name' onBlur={this.error.bind(this)} style={{height:'6vh'}}/>
                                    <p id='contactNameerror'></p>
                                    </FormGroup>
                                <FormGroup className='contacts'>
                                    DOB<span className='reddot'> *</span>
                                    <Input type='date' id='contactDOB'   placeholder='DD/MM/YY'  style={{height:'6vh'}}/>
                                    <p id='error'></p>
                                    </FormGroup>
                                <FormGroup className='canAddMore'>
                                    Mobile Number<span className='reddot'> *</span>
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            <Input type='number' id='mobileNumber'  placeholder=''  onBlur={this.error.bind(this)} style={{height:'6vh'}} />
                                            {this.addMoreNumbers()} 
                                            <p id='mobileNumbererror'></p>
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg' id='plusMobileNumbers' onClick={this.addNumbersClick}></span>
                                                </div>
                                            </div>
                                    </FormGroup>
                                <FormGroup className='canAddMore'>
                                    Email<span className='reddot'> *</span>
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            <Input type='email' id='contactEmail'  placeholder='saveAnimals@gmail.com' onBlur={this.error.bind(this)} style={{height:'6vh'}}/>
                                            {this.addMoreEmails()} 
                                            <p id='contactEmailerror'></p>
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg' onClick={this.addEmailsClick}></span>
                                                </div>
                                        </div>
                                    </FormGroup>
                                <FormGroup>
                                    <Button className='bg-primary' id='submitDetails' style={{width:'8vw'}}>Save</Button>
                                    </FormGroup>        
                                </Form>
                        </div>
                    </Card>
                </div>
        )
    }
}
export default CreateContact