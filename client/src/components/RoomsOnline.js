import React from 'react';
import Room from './Room';

const RoomsOnline = ({ rooms }) => {

    return (
        <div className='rooms-online'>
            {rooms.map((room, index) => (
                <Room key={index} room={room} />
            ))}
        </div>
    );
};

export default RoomsOnline;