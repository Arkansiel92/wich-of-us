import React, { useContext, useEffect } from 'react';
import CardPlayer from '../components/CardPlayer';
import {socketContext} from "../context/socket"


const GameSettings = () => {

    const socket = useContext(socketContext);

    const [room, setRoom] = React.useState("");

    useEffect(() => {
        if (room === "") {
            socket.emit("settings_room");
        }

        socket.on("receive_settings", (room) => {
            setRoom(room);
            console.log("récupération des données de la room");
        })
    })
    console.log(room.sockets);
    return (
        <div>
            <div>
                <h1>Paramètre de la partie</h1>
                <p>host de la partie : {room.author} dans la room : {room.id} </p>
            </div>
            {
            room !== ""
            ? room.sockets.map((player, index) => (<CardPlayer key={index} player={player} />)) 
            : <p></p>
            }

        </div>
    );
};

export default GameSettings;