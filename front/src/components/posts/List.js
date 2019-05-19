import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import PropTypes from 'prop-types';

class List extends Component {

    static propTypes = {
        posts: PropTypes.array,
        userId: PropTypes.number
    };

    render(){
        return (
            <div>
                {this.props.posts.map(post => {
                    return (
                        <Post post={ post } key={ post.id } />
                    );
                })}
            </div>
        );
    }
}
export default connect(mapStateToProps)(List)

function mapStateToProps(state) {
    return {
        posts: state.auth.posts,
        userId: state.auth.user.id
    };
}