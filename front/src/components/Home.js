import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NewPost from './posts/NewPost';
import List from './posts/List';

class Home extends Component {
    render() {
        const {isAuthenticated, userData} = this.props.auth;
        const guestView = (
            <h2>Hello, guest. Please login first ;-)</h2>
        );
        const authView = (
            <div className="container">
                <h2>Hello, {userData.name}.</h2>
                <div className="row">
                    <div className="col-md-6">
                        <NewPost />
                    </div>
                    <div className="col-md-6">
                        <List />
                    </div>
                </div>
            </div>
        );
        return (
            <div>
                {isAuthenticated ? authView : guestView}
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);