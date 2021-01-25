import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap';
import { Dehaze as BurgerIcon } from '@material-ui/icons';
import $ from 'jquery';
import './css/Navbar.css';

class Navbar extends Component{

    constructor(props) {

        super(props);

        this.toggleNav = this.toggleNav.bind(this);

    }

    itemStyle() {

        return{

            'color': 'rgb(230, 230, 230)',
            'width': '100%'

        }

    }

    toggleNav() {

        $('#nav').toggleClass('shadowNav');
        
    }

    render(){

        return(

            <nav className='navbar navbar-expand-md bg-dark fixed-top' id='nav'>

                <a className='navbar-brand' href='/' style={{ color: 'orange' }}>Tasks App</a>

                <button className="navbar-toggler btn" type="button" data-toggle="collapse" data-target="#navbar"
                 aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation" onClick={ this.toggleNav }>

                     <span className="navbar-toggler-icon text-white w-auto h-auto"><BurgerIcon /></span>

                </button>

                <div className='collapse navbar-collapse px-0' id="navbar">

                    <ul className='navbar-nav ml-auto'>

                        <li className='nav-item'>
                            
                            <Link className='nav-link' style={ this.itemStyle() } to='/'>Index</Link>
                            
                        </li>

                        <li className='nav-item'>
                            
                            <Link className='nav-link' style={ this.itemStyle() } to='/newTask'>New Task</Link>
                            
                        </li>

                    </ul>

                </div>

            </nav>

        )

    }

}

export default Navbar;