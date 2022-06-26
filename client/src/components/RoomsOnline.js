import React, { useEffect } from 'react';
import io from "socket.io-client";
import Room from './Room';

const socket = io.connect("http://localhost:3001");

const RoomsOnline = () => {

    const [rooms, setRooms] = React.useState([])

    useEffect(() => {
        socket.on("load_rooms", (data) => {
            console.log(data)
            setRooms(data);
            console.log(`liste des rooms : ${rooms}`)
        })

        socket.emit("check_rooms", () => {

        })
    }, [socket])

    const HowMany = () => {
        console.log(rooms)
    }

    return (
        <div>
            <h2>Rooms en ligne : </h2>
            {rooms.map((room, index) => (
                <Room key={index} room={room} />
            ))}
            <button onClick={HowMany}></button>
        </div>
    );
};

export default RoomsOnline;