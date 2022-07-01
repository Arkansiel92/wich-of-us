import React, { useContext, useEffect } from 'react';
import CardPlayer from '../components/CardPlayer';
import {socketContext} from "../context/socket"
import { useNavigate } from "react-router-dom";


const GameSettings = () => {

    const socket = useContext(socketContext);
    const navigate = useNavigate();

    const [room, setRoom] = React.useState("");
    const [ready, setReady] = React.useState(false);

    useEffect(() => {
        if (room === "") {
            socket.emit("settings_room");
        }

        socket.on("receive_settings", (room) => {
            setRoom(room);
            console.log("récupération des données de la room");
        })

        socket.on("readyToPlay", (data) => {
            console.log("tout le monde est prêt à jouer !")
            setReady(data);
        })

        socket.on("start_game", data => {
            if (data) {
                navigate("/GamePlay")
            };
        });
    })

    const startGame = () => {
        socket.emit("play_game", room.id)

    }

    return (
        <div>
            <h1>Préparation de la partie</h1>
            <div className='card-players'>
            {
                room !== ""
                ? room.players.map((player, index) => (<CardPlayer key={index} player={player} />)) 
                : <p style={{display : "none"}}></p>
            }
            </div>
            <div className='btnGame'>
            {
                ready === true && socket.id === room.author
                ?   <input type="button" onClick={startGame} value="LANCER LA PARTIE" />
                :   <input type="button" value={"LANCER LA PARTIE (" + room.playersReady+"/"+room.nbrPlayers+")"} disabled />
            }
            </div>
            
        </div>
    );
};

export default GameSettings;