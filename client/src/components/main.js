import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './home';
class Main extends React.Component{
  render(){
    return (  
      <div>
        <Switch>
        <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    );
  }
}
export default Main;