import React, { useContext } from 'react';
import {socketContext} from "../context/socket"

const Player = ({player}) => {

    const socket = useContext(socketContext);

    const votePlayer = (socketP, name, room) => {
        socket.emit("vote", {player : socket.id, vote : socketP, name : name, room : room})
    };

    return (
        <div className='card-player'>
            <p>a été voté {player.points} fois</p>
            <h3>{player.name}</h3>
            <input type="button" onClick={() => votePlayer(player.socket, player.name, player.room)} value={"voter pour "+player.name} />
            {player.vote === "" ? <p></p> : <p>a voté pour {player.vote}</p>}
            
        </div>
    );
};

export default Player;