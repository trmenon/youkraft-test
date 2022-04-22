import React from "react";
import { BrowserRouter, Routes, Route,} from 'react-router-dom';

// Components imports
import { NavigationBar } from '../common';
import { MainWidget, CountryWidget } from '../widgets';

function AppComponent(){
    return (
        <React.Fragment>
            <NavigationBar className='mb-4'/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainWidget/> }/>
                    <Route path="/:country" element={<CountryWidget/>}/>
                </Routes>        
        </BrowserRouter>
        </React.Fragment>
        
    );
}


export default AppComponent;