import React, { Component } from 'react';
import NewPost from './containers/NewPost';
import List from './components/List';

const stylesApp = {
    marginTop: 40
}

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row" style={ stylesApp }>
                    <div className="col-md-6">
                        <NewPost />
                    </div>
                    <div className="col-md-6">
                        <List />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;