import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/Styles';
import MuiAlert from '@material-ui/lab/Alert';
import './App.css';
import TaskForm from './components/TaskForm';
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import TaskView from "./components/TaskView";
import Load from "./components/Load";

const url = 'http://localhost:80/api/tasks/'; //URL de la API REST

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends Component {

  state = {

    tasks: [],
    open: false,
    vertical: '',
    horizontal: '',
    message: '',
    loading: true

  }

  //Función que llama el método get de Axios y realiza la petición a la URL de la API REST
  getTasks = () => {

    axios.get(url)
      .then(res => {

        this.setState({ tasks: res.data, loading: false }); //En 'data' es donde se guardan los datos traídos de la API

      });

  }

  componentDidMount() {

    this.getTasks();

  }

  newTask = async (title, description) => {

    const newTask = {

      id: this.state.tasks.length + 1,
      title: title,
      description: description,
      done: false

    }

    this.setState({

      tasks: [...this.state.tasks, newTask] //Tomo todo lo que ya estaba en el estado y le agrego la nueva tarea

    });

    console.log(newTask);

    delete this.state.tasks.id; //Borra el 'id' para que se cree automáticamente desde la BBDD
    await axios.post(url + 'new/', newTask)
      .then(res => {

        this.setState(state => ({

          open: true,
          message: 'Task Registered Successfully' 

        }))
        console.log(res.data);
        this.getTasks();
        console.log('Tasks list updated correctly');

      })
      .catch(error => {

        console.log(error.message);

      })

  }

  done = async (id) => {

    const tasks = this.state.tasks.map(task => {

      if (task.id === id){

        task.done = !task.done; //Ve el estado de 'done' y con el signo ! se cambia al estado contrario

      }
      
      return task;

    });

    this.setState({

      tasks: tasks,

    })

    const data = {

      id: id

    }

    await axios.post(url + 'done/', data)
      .then(res => {

        console.log(res.data);

      })
      .catch(error => {

        console.log(error.message);

      })

  }

  deleteTask = async(id) => {

    const tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({

      tasks: tasks,
      open: true,
      message: 'Task Deleted Successfully'

    })

    await axios.delete(url + 'delete/', {data: { id: id }})
      .then(res => {

        console.log(res.data)

      })
      .catch(error => {

        console.log(error.message)

      })

  }

  closeSnack = () => {

    this.setState({

      open: false

    })

  }

  useStyles = makeStyles((theme) => ({

    root: {

      '& > * + *': {
        
      },

    },

  }))

  render() {

    const classes = this.useStyles;
    const { error, tasks } = this.state;
    if (error){

      return <div>Error: { error.message } { tasks }</div>

    } else {

      return (

        <div>

          <Router>

            <Navbar />{/* Componente que contiene los link's a forma de barra de navegación */}

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

            {/* Ruta a página principal */}
            <Route exact path='/' render={() => {

              const { loading } = this.state;
              this.componentDidMount();

              return(

                loading ?

                  <Load />

                :

                <div className='col-10 m-auto text-center'>  

                  <h1 className='d-inline-block col-12 text-center p-2'>Tasks List</h1>
                    
                  <Tasks tasks={ this.state.tasks } deleteTask={ this.deleteTask } done={ this.done } />

                </div>

              )

            }}>

            </Route>

            { /* Ruta a nuevas tareas */ }
            <Route exact path='/newTask' >

              <TaskForm id={ this.state.tasks.length + 1 } newTask={ this.newTask } />

            </Route>

            {/* Ruta a una tarea en específica */}
            <Route exact path={ '/tasks/:id/:title' } component={ TaskView } />

          </Router>
    
        </div>
    
      )  

    }

  }

}

export default App;