import React, { useEffect } from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const CreateRooms = () => {

    const [username, setUsername] = React.useState("")

    const create_room = () => {
        if (username !== "") {
            var token = Math.random().toString(36).substring(2, 9);
            const roomData = {
                id : token + token,
                author : username,
            };
    
            socket.emit("create_room", roomData)
        }

    }

    return (
        <div>
            <div>
                <input type="text" onChange={(e) => {setUsername(e.target.value)}} required/>
                <button onClick={create_room}>Créer une room</button>
            </div>
        </div>
    );
};

export default CreateRooms;