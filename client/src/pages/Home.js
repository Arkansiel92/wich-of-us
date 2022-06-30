import React, { useContext, useEffect } from 'react';
import {socketContext} from "../context/socket"
import CreateRooms from '../components/CreateRooms';
import RoomsOnline from '../components/RoomsOnline';

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
        <div>
            <CreateRooms/>
            <RoomsOnline rooms={rooms} />
        </div>
    );
};

export default Home;