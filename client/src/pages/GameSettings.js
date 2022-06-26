import React from 'react';

const GameSettings = ({player}) => {

    console.log(player)
    return (
        <div>
            <h1>Paramètre de la partie</h1>
            <p>host de la partie : {player.username} dans la room : {player.roomID}</p>
        </div>
    );
};

export default GameSettings;