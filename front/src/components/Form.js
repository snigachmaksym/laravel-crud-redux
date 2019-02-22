import React, {Component} from 'react';
class Form extends Component {

    state = {
        id: '',
        title: '',
        body: '',
        alert: false
    };

    componentDidUpdate(prevProps) {
        if(this.props.editPost !== prevProps.editPost){
            this.setState(this.props.editPost);
        }
    }

    handleInputChange = e => {
        if(e.target.value === ''){
            this.setState({id: null});
        }
        this.setState({
            [e.target.name]: e.target.value
        });
        this.showAlertText();
    };

    onCreate = e => {
        this.showAlertText();
        e.preventDefault();
        if (this.state.title.trim() && this.state.body.trim()) {
            this.props.onAddPost(this.state);
            this.handleReset();
        }
    };
    onUpdate = e => {
        this.showAlertText();
        e.preventDefault();
        if (this.state.title.trim() && this.state.body.trim()) {
            this.props.onUpdatePost(this.state);
            this.handleReset();
        }
    };

    handleReset = () => {
        this.setState({
            id: null,
            title: '',
            body: '',
            alert: false
        });
        this.showAlertText();
    };
    showEditButton = () => {
        return this.state.id && (this.state.title || this.state.body) ? true : false
    };

    showAlertText = () => {
        return (this.state.title && this.state.body) ? this.setState({alert: false}) : this.setState({alert: true})
    };

    render() {
        const alertText = <div className="text-danger">Title and body should not be empty!</div>;
              return (
            <div>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            className="form-control"
                            name="title"
                            onChange={ this.handleInputChange }
                            value={ this.state.title }
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            cols="19"
                            rows="8"
                            placeholder="Body"
                            className="form-control"
                            name="body"
                            onChange={ this.handleInputChange }
                            value={ this.state.body }>
                        </textarea>
                        {this.state.alert ? alertText : null}
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={ this.onCreate }>Create new post</button>
                        {this.showEditButton()
                        ?
                        <button type="button" className="btn btn-success" onClick={ this.onUpdate }>Update post with id {this.state.id}</button>
                        :
                        null
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

export default Form

