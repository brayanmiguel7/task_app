import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import { ArrowBackIos as BackIcon } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/Styles';
import MuiAlert from '@material-ui/lab/Alert';
import Load from './Load';

const url = 'http://localhost:80/api/tasks/'; //URL de la API REST

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class TaskView extends Component{

    state = {

        title: '',
        description: '',
        done: '',
        loading: true,
        tasks: [],
        open: false,
        message: ''

    };

    getTask = async(id) => {

        const data = {

            id: id

        }

        axios.post(url + 'task/', data)
        .then(res => {

            const { title, description, done } = res.data[0];

            this.setState({

                title,
                description,
                done,
                loading: false

            })

        })
        .catch(error => {

            console.log(error.message)

        })

        axios.get(url)
          .then(res => {
    
            this.setState({ tasks: res.data }); //En 'data' es donde se guardan los datos traídos de la API

          });

    }

    componentDidMount() {

        const { id } = this.props.match.params;
        this.getTask(id);

    }

    openModal = () => {

        $('#modal').modal('show');


    }

    closeModal = () => {

        $('#modal').modal('hide');

    }

    formContent = e => {
        
        this.setState({

            [e.target.name]: e.target.value

        });

    }

    updateTask = async() => {

        const { id } = this.props.match.params;
        const { title, description, done } = this.state;
        const updateTask = {

            id,
            title,
            description,
            done

        }

        axios.post(url + 'update/', updateTask)
        .then(res => {

            this.closeModal();
            console.log(res.data);
            this.setState({

                open: true,
                message: 'Task Updated'

            })

        })
        .catch(error => {

            console.log(error.message);

        })

    }

    useStyles = makeStyles((theme) => ({

        root: {

            '& > * + *': {
        
            },

        },

    }))

    closeSnack = () => {

        this.setState({
    
          open: false
    
        })
    
    }

    render() {

        const classes = this.useStyles;
        const { title, description, done, loading } = this.state;

        let doneTask;
        console.log(this.state)

        if(done === 1 || done === true){

            doneTask = <strong style={{ color: 'green', display: 'block' }}>This task is done.</strong>

        } else {

            doneTask = <strong style={{ color: 'red', display: 'block' }}>This task is waiting to be finished.</strong>

        }

        return(

            loading ? /* Si cargando es True entonces muestra 'loading...' */
            
            <Load />
            
            : /* De lo contrario, muestra el contenido traído por el axios.get */

            <div className='container'>

                <div className={ classes.root }>

                    <Snackbar autoHideDuration={ 2000 } anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
                    onClose={ this.closeSnack } open={ this.state.open }>
                
                        <Alert severity='success'>{/* La 'severidad' permite colorizar dependiendo de la relevancia del mensaje */}

                            { this.state.message }
                            <Button style={{ color: 'white', outline: 'none' }} size='small' onClick={ this.closeSnack }> x </Button>
                            {/* Este botón cierra el Snackbar */}

                        </Alert>
                
                    </Snackbar>

                </div>

                <div className='modal' id='modal' role='form'>

                    <div className='modal-dialog'>

                        <div className='modal-content'>

                            <div className='modal-header bg-dark text-white'>

                                <h3 className='modal-title'>Update Task</h3>

                            </div>

                            <form className='inline-form'>

                                <div className='modal-body'>

                                    <div className='form-group row'>
                                        <label className='col-sm-4 col-form-label' style={{ textDecoration: 'underline blue' }}>Title</label>
                                        <div className='col-sm-8'>
                                            <input type='text' className='form-control' name='title' onChange={ this.formContent }
                                             value={ title } /><br /><br/>
                                        </div>
                                    </div>

                                    <div className='form-group row'>
                                        <label className='col-sm-4 col-form-label' style={{ textDecoration: 'underline blue' }}>Description</label>
                                        <div className='col-sm-8'>
                                        <textarea className='form-control col-11' name='description' onChange={ this.formContent }
                                         value={ description } ></textarea>
                                        </div>
                                    </div>

                                </div>

                                <div className='modal-footer'>

                                    <Button onClick={ this.updateTask }>Update</Button>
                                    <Button onClick={ this.closeModal }>Close</Button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

                <div className='card col-8 col-sm-4 p-0'>

                    <div className='card-header'>

                        <h1>{ title }</h1>

                    </div>

                    <div className='card-body'>

                        <p className='card-text'>{ description }</p>
                        { doneTask }

                        <div style={{ fontSize: '15px', display: 'inline-block', textAlign: 'center' }} 
                            className='col-auto p-0'>

                            <Link style={{ borderBottom: '1px solid blue' }} className='btn' type='button' to='/'>
                            
                                <BackIcon style={{ display: 'inline-block', fontSize: '10px', marginTop: '1px', marginBottom: '4px' }} /> 
                                { /* alignItems con display: flex ayuda a alinear los items al medio del elemento */ }
                                Back
                            
                            </Link>
                            <Button className='bg-primary text-white' type='button' onClick={ this.openModal }>
                            
                                Update
                            
                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

export default TaskView;