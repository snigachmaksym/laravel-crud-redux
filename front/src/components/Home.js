import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Form from './posts/Form';
import List from './posts/List';
import {axiosController} from '../utils/axiosController';
import {fetchAuthUser} from '../store/auth/actions';
import {Redirect} from 'react-router'

class Home extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        var token = axiosController.isGetToken();
        const {auth, fetchAuthUser} = this.props;
        if (token && !auth.isAuthenticated) {
            fetchAuthUser().catch(() => {
                axiosController.deleteToken();
                return <Redirect to="/login"/>
            });
        } else if (!token) {
            return <Redirect to="/login"/>
        }
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const guestView = (
            <h2>Hello, guest. Please login first ;-)</h2>
        );
        const authView = (
            <React.Fragment>
                <h2>Hello, {user.name}.</h2>
                <div className="row">
                    <div className="col-md-6">
                        <Form />
                    </div>
                    <div className="col-md-6">
                        <List />
                    </div>
                </div>
            </React.Fragment>
        );
        return (
            <div className="container">
                {isAuthenticated ? authView : guestView}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {fetchAuthUser})(Home);