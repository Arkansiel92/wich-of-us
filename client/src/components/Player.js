import React from 'react';

const Player = ({player}) => {
    return (
        <div>
            <p>{player.points}</p>
            <p>{player.name}</p>
            <button>Voter contre {player.name}</button>
        </div>
    );
};

export default Player;