import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './phonebookHome';
import CreateContact from './createcontact'
import EditContact from './editContact'
class MainRoutes extends React.Component{
  render(){
    return (  
      <div>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/createContact' component={CreateContact}/>
        <Route exact path='/editContact' component={EditContact}/>
        </Switch>
      </div>
    );
  }
}
export default MainRoutes;