import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';

class Form extends Component {

    state = {
        id: null,
        title: '',
        body: '',
        user_id: null,
        errors: {}
    };

    componentDidUpdate(prevProps) {

        if (this.props.editPost !== prevProps.editPost) {
            this.setState(this.props.editPost);
        }

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
        if(nextProps.userId) {
            this.setState({
                user_id: nextProps.userId
            });
        }
    }

    handleInputChange = e => {
        if (e.target.value === '') {
            this.setState({id: null});
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onUpdatePostsList = e => {
        e.preventDefault();
        this.props.onUpdatePostsList(this.state);

    };

    handleReset = () => {
        this.setState({
            id: null,
            title: '',
            body: '',
        });
    };
    showEditButton = () => {
        return this.state.id && (this.state.title || this.state.body) ? true : false
    };

    render() {
        const {errors} = this.state;
        return (
            <div>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.title
                            })}
                            name="title"
                            onChange={ this.handleInputChange }
                            value={ this.state.title }
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
                            value={ this.state.body }>
                        </textarea>
                        {errors.body && (<div className="invalid-feedback">{errors.body[0]}</div>)}
                    </div>
                    <div className="form-group">
                        {this.showEditButton()
                            ?
                            <button type="button" className="btn btn-success" onClick={ this.onUpdatePostsList }>Update post with
                                id {this.state.id}</button>
                            :
                            <button type="button" className="btn btn-primary" onClick={ this.onUpdatePostsList }>Create new post
                            </button>
                        }

                        <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    editPost: state.editPost,
    userId: state.auth.userData.id
});

export  default connect(mapStateToProps)(Form)

