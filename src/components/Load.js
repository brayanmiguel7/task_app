import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/Load.css';

class Load extends Component {

    size() {

        return{

            'minHeight': '90vh',
            'width': '100%'

        }

    }

    render() {

        return(

            <div className='row justify-content-center m-0' style={ this.size() }>

                <div className='col-8 align-self-center text-center'>

                    <div className='spinner-border text-primary' role='status'>

                        <span className='sr-only'>Loading...</span>

                    </div>

                </div>

            </div>

        )

    }

}

export default Load;