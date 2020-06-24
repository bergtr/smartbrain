import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signOut')} className='f3 link dim white underline pointer pa3'> Sign Out </p>
            </nav>
        )
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signIn')} className='f3 link dim white underline pointer pa3'> Sign In </p>
                <p onClick={() => onRouteChange('Register')} className='f3 link dim white underline pointer pa3'> Register </p>
            </nav>)
    }
}

export default Navigation;