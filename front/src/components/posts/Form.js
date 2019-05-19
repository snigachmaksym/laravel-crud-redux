import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {onUpdatePostsList, clearForm} from '../../store/posts/actions';

class Form extends Component {

    static propTypes = {
        posts: PropTypes.array,
        errors: PropTypes.object,
        editPost: PropTypes.object,
        userId: PropTypes.number,
        onUpdatePostsList: PropTypes.func,
        clearForm: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    componentDidUpdate(prevProps) {

        if ((this.props.editPost.title !== prevProps.editPost.title ||
            this.props.editPost.body !== prevProps.editPost.body) &&
            this.props.editPost.id !== prevProps.editPost.id) {
            let post = this.state.post;
            post = this.props.editPost;
            this.setState({post});
        }
        if (this.props.posts.length !== prevProps.posts.length) {
            this.setState(this.getInitialState());
        }

    }

    getInitialState = () => {
        return {
            post: {
                id: null,
                title: '',
                body: '',
            }
        };
    };

    handleInputChange = e => {
        let post = this.state.post;
        post[e.target.name] = e.target.value;
        this.setState({post});
    };

    onUpdatePostsList = e => {
        e.preventDefault();
        let post = this.state.post;
        post.user_id = this.props.userId;
        this.props.onUpdatePostsList(post);
    };

    handleReset = () => {
        this.setState(this.getInitialState());
        this.props.clearForm();
    };


    render() {
        const {post} = this.state;
        const {errors} = this.props;
        const buttonText = post.id ? 'Edit post' : 'Create post';
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.title
                            })}
                            name="title"
                            onChange={ (e) => this.handleInputChange(e) }
                            value={ post.title }
                        />
                        {errors.title && (<div className="invalid-feedback">{errors.title[0]}</div>)}
                    </div>
                    <div className="form-group">
                        <textarea
                            cols="19"
                            rows="8"
                            placeholder="Body"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.body
                            })}
                            name="body"
                            onChange={ this.handleInputChange }
                            value={ post.body }>
                        </textarea>
                        {errors.body && (<div className="invalid-feedback">{errors.body[0]}</div>)}
                    </div>
                    <div className="form-group d-flex flex-row justify-content-between">
                        <button type="button" className="btn btn-success"
                                onClick={ this.onUpdatePostsList }>{buttonText}</button>
                        <button type="button" className="btn btn-warning" onClick={ this.handleReset }>Reset</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    userId: state.auth.user.id,
    editPost: state.auth.editPost,
    errors: state.auth.exception.errors,
    posts: state.auth.posts,
});

const mapDispatchToProps = dispatch => ({
    onUpdatePostsList: post => dispatch(onUpdatePostsList(post)),
    clearForm: () => dispatch(clearForm())
});

export  default connect(mapStateToProps, mapDispatchToProps)(Form)

