import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png'; 
import './Logo.css';
const Logo = () => {
    return (
        <div className='ma3 mt0'>
            <Tilt className=" br2 Tilt shadow-2" options={{ max: 25 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3 br2"> 
                    <img style={{paddingTop:'10px'}} src={brain} alt="brain"/> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;