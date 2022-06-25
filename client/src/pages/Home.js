import React from 'react';
import CreateRooms from '../components/CreateRooms';
import RoomsOnline from '../components/RoomsOnline';

const Home = () => {

    return (
        <div>
            <h1>Wich of us</h1>
            <CreateRooms />
            <RoomsOnline />
        </div>
    );
};

export default Home;