import React from 'react';
import Room from './Room';

const RoomsOnline = ({rooms}) => {
    return (
        <div className='rooms-online'>
            <h2>Rooms en ligne ({rooms.length}) :</h2>
            {rooms.map((room, index) => (
                <Room key={index} room={room} />
            ))}
        </div>
    );
};

export default RoomsOnline;