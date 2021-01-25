import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap';

class Task extends Component {

    done() {

        return{

            'color': this.props.task.done ? 'green' : 'red' //Si 'done' es true el color es verde, si no, es rojo

        }

    }

    btnStyles() {

        return{

            'background': 'rgb(255, 87, 51)',
            'color': 'rgb(250, 250, 250)',
            'border': 'rgb(250, 250, 250)',
            'borderRadius': '8px',
            'margin': '0 1%',
            'padding': '6px 12px'

        }

    }

    slugTitle(title) {

        /* Aquí se reemplazan los caracteres especiales | símbolos con un espacio */
        title = title.replace(/[`~!@#$%^&*()_\-+=[\]{};:'"\\|/,.<>?\s]/g, ' ').toLowerCase();

        /* Se cortan los espacios al inicio y al final del slug */
        title = title.replace(/^\s+|\s+$/g, '');

        /* Reemplaza el espacio por un guión */
        title = title.replace(/\s+/g, '-');

        return title;

    }

    render() {

        let check;

        const { task } = this.props;
        if(task.done === 0 || task.done === false){

            check = <input type='checkbox' id='check' className='ml-2' onChange={ this.props.done.bind(this, task.id) } checked={ false } />
            //Colocar el valor del atributo 'checked' permite que el mismo sea controlable y evita advertencias

        } else if(task.done === 1 || task.done === true){

            check = <input type='checkbox' id='check' className='ml-2' onChange={ this.props.done.bind(this, task.id) } checked={ true } />

        }

        return(

            <div className='card col-12 col-sm-5 p-0 d-inline-block mx-2 mb-4' style={ this.done() }>
        
                <div className='card-header'>

                    { check }
                    <h3 className='d-inline-block w-auto ml-2'>{ task.title }</h3>

                </div>

                <div className='card-body text-justify'>

                    { task.description }
                    
                </div>

                <div className='card-footer text-right'>

                    <div className='align-self-end'>

                        <button className='mx-2 my-1' style={ this.btnStyles() } onClick={ this.props.deleteTask.bind(this, task.id) }>
                            X
                        </button>
                        <Link to={ '/tasks/' + task.id + '/' + this.slugTitle(task.title) }>Ver</Link>
                        
                    </div>
                    
                </div>
        
            </div>

        )

    }

}

Task.propTypes = {

    task: PropTypes.object.isRequired

}

export default Task;