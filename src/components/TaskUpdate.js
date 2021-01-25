import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIos as BackIcon } from '@material-ui/icons';
import axios from 'axios';
import 'bootstrap';
import Load from './Load';

const url = 'http://localhost:80/api/tasks/'; //URL de la API REST

class TaskUpdate extends Component {

    state = {

        title: '',
        description: '',
        done: '',
        loading: true

    }

    getTask = async(id) => {

        const data = {

            id

        }

        axios.post(url + 'task/', data)
        .then(res => {

            const { title, description, done } = res.data[0];

            this.setState({

                title,
                description,
                done,
                loading : false

            })
        
        })
        .catch(error => {

            console.log(error.message);

        })

    }

    componentDidMount() {

        const { id } = this.props.match.params;
        this.getTask(id);

    }

    formContent = e => {

        this.setState({

            [e.target.name]: e.target.value

        })

    }

    submitForm = () => {

        const { id } = this.props.match.params;
        const updateTask = {

            id,
            title: this.state.title,
            description: this.state.description,
            done: this.state.done

        }

    }

    render() {

        const { loading, title, description } = this.state;

        return(

            loading ?

                <Load />
            
            :

            <div>

                <form onSubmit={ this.submitForm }>

                    <input placeholder={ title } type='text' onChange={ this.formContent } name='title' value={ this.state.title } /><br /><br />
                    <textarea placeholder={ description } name="description" onChange={ this.formContent } value={ this.state.description }>
                    </textarea>
                    <input type="submit" />

                </form>

                <div style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center', borderBottom: '1px solid blue' }} 
                className='col-auto p-0'>

                    <Link className='btn' type='button' to='/'>
                            
                        <BackIcon style={{ display: 'inline-block', fontSize: '10px', marginTop: '1px', marginBottom: '4px' }} /> 
                        { /* alignItems con display: flex ayuda a alinear los items al medio del elemento */ }
                        Back
                            
                    </Link>

                </div>

            </div>

        )

    }

}

export default TaskUpdate;