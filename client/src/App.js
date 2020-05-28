import React from 'react';
import './App.css'
import MainRoutes from './components/mainRoutes'
import {  BrowserRouter as Router } from 'react-router-dom';
class App extends React.Component {
render(){
return (  
    <Router>
        <MainRoutes/>
    </Router>
);
}
}
export default App;
