import React, { useContext, useEffect } from 'react';
import {socketContext} from "../context/socket"
import CreateRooms from '../components/CreateRooms';
import RoomsOnline from '../components/RoomsOnline';
import News from '../components/News';

const Home = () => {

    const socket = useContext(socketContext);

    const [rooms, setRooms] = React.useState([]);

    useEffect(() => {
        socket.emit("check_rooms", () => {

        })     
        socket.on("load_rooms", (data) => {
            setRooms(data);
        })

    }, [socket])

    return (
        <div className='header-home'>
            <h1 className='title-Home'>Qui de nous ?</h1>
            <div className='Home-components'>
                <CreateRooms/>
                <News />
            </div>
            <div>
                <RoomsOnline rooms={rooms} />
            </div>
        </div>
    );
};

export default Home;