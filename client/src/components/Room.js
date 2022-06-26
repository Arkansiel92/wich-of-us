import React from 'react';

const Room = ({ room }) => {

    return (
        <div>
            <ul>
                <li>Nom de l'host : {room.author}</li>
                <li>salle : {room.id}</li>
                <li>Nombre de joueur : 1 / {room.nbrPlayers} </li>
                <button>Rejoindre</button>
            </ul>
        </div>
    );
};

export default Room;