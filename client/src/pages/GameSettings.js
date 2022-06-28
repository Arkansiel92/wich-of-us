import React, { useContext, useEffect } from 'react';
import CardPlayer from '../components/CardPlayer';
import {socketContext} from "../context/socket"


const GameSettings = ({player}) => {

    const socket = useContext(socketContext);

    const [room, setRoom] = React.useState("");

    useEffect(() => {
        if (room === "") {
            socket.emit("settings_room", player)
        }

        socket.on("receive_settings", (room) => {
            setRoom(room);
        })
    })
    console.log(room.players);
    return (
        <div>
            <div>
                <h1>Paramètre de la partie</h1>
                <p>host de la partie : {room.author} dans la room : {room.id} </p>
            </div>
        </div>
    );
};

export default GameSettings;