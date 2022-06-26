import React from 'react';

const Room = ({ room }) => {

    return (
        <div className='rooms-div'>
            <ul className='room-list'>
                <li>Nom de l'host : {room.author}</li>
                <li>salle : {room.id}</li>
                <li>Nombre de joueurs : {room.players.length} sur {room.nbrPlayers} </li>
                <button>Rejoindre</button>
            </ul>
        </div>
    );
};

export default Room;