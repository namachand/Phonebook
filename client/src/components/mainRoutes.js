import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './phonebookHome';
import CreateContact from './createcontact'
class MainRoutes extends React.Component{
  render(){
    return (  
      <div>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/createContact' component={CreateContact}/>
        </Switch>
      </div>
    );
  }
}
export default MainRoutes;