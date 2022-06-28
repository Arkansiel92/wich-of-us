import React, { useContext, useEffect } from 'react';
import {socketContext} from "../context/socket"
import CreateRooms from '../components/CreateRooms';
import RoomsOnline from '../components/RoomsOnline';

const Home = ({ player }) => {

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
            <CreateRooms player={player}/>
            <RoomsOnline rooms={rooms} player={player} />
        </div>

    );
};

export default Home;