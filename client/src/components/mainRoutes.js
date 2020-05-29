import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './phonebookHome';
import CreateContact from './createcontact'
import EditContact from './editContact'
import ShowContact from './showContact'
class MainRoutes extends React.Component{
  render(){
    return (  
      <div>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/createContact' component={CreateContact}/>
        <Route exact path='/editContact' component={EditContact}/>
        <Route exact path='/showContact'component={ShowContact}/>
        </Switch>
      </div>
    );
  }
}
export default MainRoutes;