import React, { useContext, useEffect } from 'react';
import Player from '../components/Player';
import {socketContext} from "../context/socket"

const GamePlay = () => {

    const socket = useContext(socketContext);
    const [room, setRoom] = React.useState("");
    const [questions, setQuestions] = React.useState([]);

    var rand = Math.floor(Math.random()*questions.length);

    useEffect(() => {
        if (room === "") {
            socket.emit("settings_room");
            socket.emit("settings_questions");
        }

        socket.on("receive_settings", (room) => {
            setRoom(room);
            console.log("récupération des données de la room");
        })

        socket.on("receive_questions", (questions) => {
            setQuestions(questions);
            console.log("récupération des données des questions");
        })

    })
    return (
        <div className='game'>
            <h1>Qui de nous...</h1>
            <h2>...{questions[rand]} ?</h2>
            <div className='players'>
            {
                room !== ""
                ? room.players.map((player, index) => (<Player key={index} player={player}/>)) 
                : <p style={{display : "none"}}></p>
            }
            </div>
        </div>
    );
};

export default GamePlay;