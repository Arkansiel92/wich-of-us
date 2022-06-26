import React from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const CreateRooms = () => {

    const [username, setUsername] = React.useState("")
    const [nbrPlayers, setNbrPlayers] = React.useState(4)

    const create_room = () => {
        if (username !== "") {
            var token = Math.random().toString(36).substring(2, 9);
            const roomData = {
                id : token + token,
                author : username,
                players : [username],
                nbrPlayers : nbrPlayers
            };
    
            socket.emit("create_room", roomData)
        }
    }

    return (
        <div>
            <div>
                <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Nom d'utilisateur (obligatoire)" required/>
                <input type="number" value={nbrPlayers} onChange={(e) => {setNbrPlayers(e.target.value)}} placeholder="Nombre de joueur" required/>
                <button onClick={create_room}>Créer une room</button>
            </div>
        </div>
    );
};

export default CreateRooms;