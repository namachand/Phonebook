import React from 'react'
import '../css/phonebookHome.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { Card, CardBody,Button} from 'reactstrap';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pager:{},
            allContacts:[]
            }

    }

    componentDidMount(){
        this.loadContactDetails()
    }

    componentDidUpdate(){
        this.loadContactDetails()
    }

    loadContactDetails(){
        //
        const param=new URLSearchParams(this.props.location.search);
        const page=parseInt(param.get('page')) || 1;
        if(page !== this.state.pager.currentPage){
            axios.get(`http://localhost:3231/getUserContacts/contactDetailsPages?page=${page}`)
            .then((contacts)=>{
                // console.log(data.data.allStories);
                // console.log(data.data.pager);
                this.setState({pager:contacts.data.pager});
                this.setState({allContacts:contacts.data.allContacts});
                })
            }
    }

    render(){
        return(
        <React.Fragment>
            <div>
                <Link to='/createContact'><span className='fa fa-plus fa-4x' id='createContact' onClick={this.createContact}>
                    </span></Link>
                </div>
            <div>
                {this.state.allContacts.map((contact)=>{
                return(
                    <div className='row mt-3 mb-3 storyCard' style={{display:'flex',justifyContent:'center'}}>
                        <Card style={{
                            minHeight:'30vh',
                            width:'40vw',
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
                                        <Button className='contactdetail' id='submitDetails' style={{width:'8vw',backgroundColor:'cadetblue'}}>Edit</Button>
                                        </div>
                                    <div className='col-md-3'>
                                        <Button className='contactdetail' id='submitDetails' style={{width:'8vw',backgroundColor:'red'}}>Remove</Button>
                                        </div>
                                    </div>
                                    <div className='row' style={{backgroundColor:'papayawhip',marginTop:'15px',minHeight:'12vh'}}>
                                        <div className='col-md-4'>
                                            <p className='fa fa-phone fa-lg contactdetail mt-2'>  {contact.mobileNumber}</p>
                                            </div>
                                        <div className='col-md-6 offset-2' >
                                            <p className='fa fa-envelope fa-lg contactdetail mt-1' style={{paddingTop:'5px'}}>  {contact.email}</p>
                                            </div>
                                        </div>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}    
                </div> 
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
            </React.Fragment>
        )
    }
}
export default Home