import React from 'react';

const CardPlayer = ({player}) => {
    return (
        <div>
            <ul>
                <li>Socket : {player}</li>
                <li><input type="text" placeholder='Nom du joueur' required/></li>
                <li><input type="button" value="Prêt" /></li>
            </ul>
        </div>
    );
};

export default CardPlayer;