import React from 'react';
import errorImg from '../../public/Animation-404-Page.gif'

const ErrorPage = () => {
    return (
        <div >
            <img className='min-h-screen min-w-full' src={errorImg} alt="" />
        </div>
    );
};

export default ErrorPage;