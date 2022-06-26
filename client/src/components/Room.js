import React from 'react';
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Room = (props) => {

    const room = props.room;
    const player = props.player;

    const navigate = useNavigate();

    const joinRoom = () => {
        player.roomID = room.id;
        socket.emit("join_room", player);
        navigate("/GameSettings");
    };

    return (
        <div className='rooms-div'>
                {player.username !== room.author 
                   ? <p>pas le même username {player.username}</p>
                   : <p>le même username {player.username}</p>
                }
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