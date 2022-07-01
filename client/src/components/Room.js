import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {socketContext} from "../context/socket"


const Room = ({room}) => {

    const socket = useContext(socketContext);

    const navigate = useNavigate();

    const joinRoom = () => {
        if (room.players.length < room.nbrPlayers) {
            socket.emit("join_room", room.id);
            navigate("/GameSettings");
        }
    };

    return (
        <div className='rooms-div'>
            <ul className='room-list'>
                <li>salle : {room.id}</li>
                <li>Joueurs : {room.players.length} sur {room.nbrPlayers} </li>
                <button onClick={joinRoom}>Rejoindre</button>
            </ul>
        </div>
    );
};

export default Room;