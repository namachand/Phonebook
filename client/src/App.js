import React from 'react';
import './App.css'
import Video from './components/uploadingfile'
import {  BrowserRouter as Router } from 'react-router-dom';
class App extends React.Component {
render(){
return (  
    <Router>
        <Video/>
    </Router>
);
}
}
export default App;
