import React, { Component } from 'react';

class TaskForm extends Component {

    state = {

        title: '',
        description: ''

    }

    submitForm = e => {

        this.props.newTask(this.state.title, this.state.description);
        this.setState({

            title: '',
            description: ''

        });
        e.preventDefault();

    }

    formContent = e => {
        
        this.setState({

            [e.target.name]: e.target.value

        });

    }

    render(){

        return(

            <form id="formTask" onSubmit={ this.submitForm }>

                <h3>Add a new task</h3>

                <input type="text" name="id" readOnly onChange={ this.formContent } value={ this.props.id } /><br /><br />
                <input type="text" name="title" placeholder="Task Title" onChange={ this.formContent } value={ this.state.title } /><br /><br />
                <textarea placeholder="Task Description" name="description" onChange={ this.formContent } value={ this.state.description }>
                </textarea>
                <input type="submit" />

            </form>

        )

    }

}

export default TaskForm;