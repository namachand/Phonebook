import React from 'react'
import { Card,Button, Input,Form, FormGroup} from 'reactstrap';
import  '../css/createcontact.css'
import axios from 'axios';
class CreateContact extends React.Component{
    constructor(props){
        super(props)
        this.state={
            values:[]
        }
        this.sendContactDetails=this.sendContactDetails.bind(this);
        this.goBack=this.goBack.bind(this);
        this.addMoreNumbers=this.addMoreNumbers.bind(this);
        this.addClick=this.addClick.bind(this);
    }

  
    //adding the contact details to the database
    sendContactDetails(event){
        event.preventDefault();
        var name=document.getElementById('contactName').value;
        var dateOfBirth=document.getElementById('contactDOB').value;
        var mobileNumber=document.getElementById('mobileNumber').value;
        var email=document.getElementById('contactEmail').value;
        this.setState({values:this.state.values.concat([mobileNumber])});
        console.log(this.values);
        axios.post('http://localhost:3231/addUsers/contactDetails',{name:name,dateOfBirth:dateOfBirth,mobileNumber:mobileNumber,email:email})
        .then((res)=>{
            console.log(res);
        })
        document.getElementById('contactName').value=''
        document.getElementById('contactDOB').value=''
        document.getElementById('mobileNumber').value=''
        document.getElementById('contactEmail').value=''
    }

    // add more mobile numbers on clicking the button
    addClick(){
        this.setState(prevState => ({ values: [...prevState.values, '']}))
    }

    addMoreNumbers(){
        return this.state.values.map((currentValue, index) => 
            <div key={index}>
               <Input type="text" value={currentValue||''} onChange={this.handleChange.bind(this, index)} style={{height:'6vh',marginTop:'2px'}}/>
               {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
            </div>          
        )
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
    }

    //going back to the home page
    goBack(){
        this.props.history.push('/')
    }

    render(){
        console.log(this.state.values);
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
                                            {/* <div className='container' id='moreMobileNumbers'>
                                                </div> */}
                                            {this.addMoreNumbers()} 
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg' onClick={this.addClick}></span>
                                                </div>
                                            </div>
                                                <p id='numberError'></p>
                                    </FormGroup>
                                <FormGroup className='canAddMore'>
                                    Email<span className='reddot'> *</span>
                                    <div className='row'>
                                        <div className='col-md-11'>
                                            <Input type='email' id='contactEmail'  placeholder='saveAnimals@gmail.com' onBlur={this.error} style={{height:'6vh'}}/>
                                            </div>
                                            <div className='col-md-1'>
                                                <span className='fa fa-plus fa-lg'></span>
                                                </div>
                                        </div>
                                        <p id='numberError'></p>
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