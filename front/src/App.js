import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ Home }/>
                    <Route exact path="/register" component={ Register }/>
                    <Route exact path="/login" component={ Login }/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;