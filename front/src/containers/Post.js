import { connect } from 'react-redux';
import { deletePost, editPost } from '../actions';
import View from '../components/View';

const mapDispatchToProps = dispatch => {
    return {
        onDelete: post => {
            if (window.confirm("Delete the post?")) {
                dispatch(deletePost(post));
            }
        },
        onEdit: post => {
            dispatch(editPost(post));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(View);