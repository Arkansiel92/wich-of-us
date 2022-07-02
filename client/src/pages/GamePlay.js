import React, { useContext, useEffect } from 'react';
import Player from '../components/Player';
import {socketContext} from "../context/socket"

const GamePlay = () => {

    const socket = useContext(socketContext);
    const [room, setRoom] = React.useState("");
    const [questions, setQuestions] = React.useState([]);

    useEffect(() => {
        if (room === "") {
            socket.emit("settings_room");
            socket.emit("settings_questions");
        };

        socket.on("receive_settings", (room) => {
            setRoom(room);
            console.log("récupération des données de la room");
        });

        socket.on("receive_questions", (questions) => {
            setQuestions(questions);
            console.log("récupération des données des questions");
        });

    })

    console.log(room.vote)
    return (
        <div className='game'>
            <h1>Qui de nous...</h1>
            <h2>...{questions} ?</h2>
            <div className='players'>
            {
                room !== ""
                ? room.players.map((player, index) => (<Player key={index} player={player}/>)) 
                : <p style={{display: "none"}}></p>
            }
            </div>
            {
                room.vote !== ""
                ?   <p>{room.vote} a eu le plus de vote !</p>
                :   <p></p>
            }
        </div>
    );
};

export default GamePlay;