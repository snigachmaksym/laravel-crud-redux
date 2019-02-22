import React, {Component} from 'react';
import {connect} from 'react-redux';
import Post from '../containers/Post';
import {fetchAllPosts} from '../actions';


class List extends Component {

    componentDidMount() {
        this.props.fetchAllPosts();
    }

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
export default connect(mapStateToProps, {fetchAllPosts})(List)

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}