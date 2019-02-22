import { connect } from 'react-redux';
import { createPost, updatePost } from '../actions';
import Form from '../components/Form';

function mapStateToProps(state) {
    return {
        editPost: state.editPost
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => {
            dispatch(createPost(post));
        },
        onUpdatePost: post => {
            dispatch(updatePost(post));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);