import React from "react";


// Bootstrap UI imports
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = ()=> {

    return (
        <Navbar 
            expand="lg" 
            variant="dark" 
            bg="primary"
            className= 'p-2'
        >
            <Navbar.Brand href="#">
                Noodles Web App
            </Navbar.Brand>
        </Navbar>
    );
}

export default NavigationBar;