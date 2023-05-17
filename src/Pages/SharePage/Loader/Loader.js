import React from 'react';
import loader from './../../../assets/loader/loader.gif'
const Loader = () => {
    return (
        <div className='flex justify-center items-center'>
            <img src={loader} alt="loader" className='w-52 h-auto' />
        </div>
    );
};

export default Loader;