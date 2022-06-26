import React from 'react';
import Room from './Room';

const RoomsOnline = (props) => {

    const rooms = props.rooms;
    const player = props.player;

    return (
        <div className='rooms-online'>
            {rooms.map((room, index) => (
                <Room key={index} room={room} player={player}/>
            ))}
        </div>
    );
};

export default RoomsOnline;