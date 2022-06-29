import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import {socketContext} from "../context/socket";

const CreateRooms = ({player}) => {
    const socket = useContext(socketContext);


    const navigate = useNavigate();

    const [nbrPlayers, setNbrPlayers] = React.useState(2)

    const create_room = () => {
        player.host = true   
        socket.emit("create_room", nbrPlayers)
        navigate("/GameSettings");
    }

    return (
        <div className='header-create-room'>
            <div className='create-room'>
                <h1 className='title'>Qui de nous ?</h1>
                <label htmlFor="">Nombre de joueur : <select value={nbrPlayers} onChange={(e) => {setNbrPlayers(e.target.value)}} >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select></label>
                <li><button onClick={create_room}>Créer une partie</button></li>
            </div>
        </div>
    );
};

export default CreateRooms;