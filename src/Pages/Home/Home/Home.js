import React from 'react';
import Footer from '../../SharePage/Footer/Footer';
import CreatePost from '../CreatePost/CreatePost';
import TopPost from '../TopPost/TopPost';

const Home = () => {
    return (
        <>
            <CreatePost></CreatePost>
            <TopPost></TopPost>
            <Footer></Footer>
        </>
    );
};

export default Home;