import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {socketContext} from "../context/socket";

const CreateRooms = (props) => {

    const socket = useContext(socketContext);

    const player = props.player;

    const navigate = useNavigate();

    const [username, setUsername] = React.useState("")
    const [msg, setMsg] = React.useState("")
    const [nbrPlayers, setNbrPlayers] = React.useState(2)

    const create_room = () => {
        if (username !== "") {

            player.username = username
            player.host = true

            var token = Math.random().toString(36).substring(2, 9);
            const roomData = {
                id : token + token,
                author : player.username,
                players : [username],
                nbrPlayers : nbrPlayers
            };

            player.roomID = roomData.id
    
            socket.emit("create_room", roomData)

            navigate("/GameSettings");
        } else {
            setMsg("Entrez un nom d'utilisateur valide.")
        }
    }

    return (
        <div className='header-create-room'>
            <div className='create-room'>
                <h1 className='title'>Qui de nous ?</h1>
                <li><input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder="Nom d'utilisateur" required/></li>
                <label htmlFor="">Nombre de joueur : <select value={nbrPlayers} onChange={(e) => {setNbrPlayers(e.target.value)}} >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select></label>
                <li><button onClick={create_room}>Créer une partie</button></li>
            </div>
            <p>{msg}</p>
        </div>
    );
};

export default CreateRooms;