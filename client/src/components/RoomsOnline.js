import React, { useEffect } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const RoomsOnline = () => {

    const [rooms, setRooms] = React.useState([])

    useEffect(() => {
        socket.on("load_rooms", (data) => {
            console.log(data)
        })
    }, [socket])

    return (
        <div>
            <h2>Rooms en ligne : </h2>
        </div>
    );
};

export default RoomsOnline;