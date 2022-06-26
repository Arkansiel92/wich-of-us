import React, { useEffect } from 'react';
import io from "socket.io-client";
import CreateRooms from '../components/CreateRooms';
import RoomsOnline from '../components/RoomsOnline';

const socket = io.connect("http://localhost:3001");

const Home = ({ player }) => {

    const [rooms, setRooms] = React.useState([])

    useEffect(() => {
        socket.on("load_rooms", (data) => {
            setRooms(data);
        })

        socket.emit("check_rooms", () => {

        })
    }, [])

    return (
        <div>
            <CreateRooms player={player}/>
            <RoomsOnline rooms={rooms} player={player} />
        </div>
    );
};

export default Home;