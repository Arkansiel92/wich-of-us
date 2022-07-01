import React, { useEffect, useContext } from 'react';
import {socketContext} from "../context/socket"


const CardPlayer = ({player}) => {

    const socket = useContext(socketContext);
    const [name, setName] = React.useState("");

    const readyPlay = () => {
        socket.emit("ready", {socket: player.socket, name: name})
    }

    return (
        <div>
            <ul>
                <li>Socket : {player.socket}</li>
                {
                player.socket === socket.id 
                ? <li><input type="text" value={name} onChange={(e)=> {setName(e.target.value)}} placeholder='Nom du joueur' required/></li>
                : <li><input type="text" value={player.name} placeholder='Nom du joueur' required disabled/></li>
                }
                {
                player.socket === socket.id 
                ? <li><input type="button" value="prêt" onClick={readyPlay} style={player.ready ? {background: "#367000"} : {background: "#B26700"}} /></li>
                : <li><input type="button" value="prêt" style={player.ready ? {background: "#367000"} : {background: "#B26700"}} disabled /></li>
                }   
            </ul>
        </div>
    );
};

export default CardPlayer;