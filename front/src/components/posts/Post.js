import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserPost, setEditPost } from '../../store/posts/actions';
const styles = {
    borderBottom: '2px solid #eee',
    background: '#fafafa',
    margin: '.75rem auto',
    padding: '.6rem 1rem',
    maxWidth: '500px',
    borderRadius: '7px'
};
class Post extends Component {

    static propTypes = {
        onDelete: PropTypes.func,
        onEdit: PropTypes.func
    };

    render(){
        const { title, body, id } = this.props.post;
        return (
            <div style={ styles }>
                <h2>{ title }</h2>
                <p>{ body }</p>
                <div className="form-group d-flex flex-row justify-content-between">
                <button className="btn btn-primary" type="button" onClick={() => this.props.onEdit({ title, body, id })}>Edit</button>
                <button className="btn btn-danger" type="button" onClick={() =>this.props.onDelete(id)}>Remove</button>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDelete: post => {
            if (window.confirm("Delete the post?")) {
                dispatch(deleteUserPost(post));
            }
        },
        onEdit: (post) => dispatch(setEditPost(post))
    };
};

export default connect(null, mapDispatchToProps)(Post);


