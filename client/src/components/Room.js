import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {socketContext} from "../context/socket"


const Room = (props) => {

    const socket = useContext(socketContext);

    const room = props.room;
    const player = props.player;

    const navigate = useNavigate();

    const joinRoom = () => {
        if (room.players.length < room.nbrPlayers) {
            player.roomID = room.id;
            socket.emit("join_room", player);
            navigate("/GameSettings");
        }
        console.log(room.players.length)
        console.log(room.nbrPlayers);
    };

    return (
        <div className='rooms-div'>
            <ul className='room-list'>
                <li>Nom de l'host : {room.author}</li>
                <li>salle : {room.id}</li>
                <li>Nombre de joueurs : {room.players.length} sur {room.nbrPlayers} </li>
                <button onClick={joinRoom}>Rejoindre</button>
            </ul>
        </div>
    );
};

export default Room;