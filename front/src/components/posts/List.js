import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from './Post';

class List extends Component {

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
        posts: state.posts,
    };
}