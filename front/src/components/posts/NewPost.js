import { connect } from 'react-redux';
import { updatePostsList, updatePost } from '../../actions/posts';
import Form from './Form';

function mapStateToProps(state) {
    return {
        editPost: state.editPost
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onUpdatePostsList: post => {
            dispatch(updatePostsList(post));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);