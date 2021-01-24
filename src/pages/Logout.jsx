import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout() {

    localStorage.removeItem('token');

    return (
        <div>
            <Redirect to="login" />
        </div>
    );
}

export default Logout;