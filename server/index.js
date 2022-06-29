const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
});

const rooms = []

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        rooms.forEach(room => {
            room.players.forEach((player, index) => {
                if (socket.id == player) {
                    room.players.splice(index, 1)
                }             
            })
        });
    })

    socket.on("create_room", (nbrPlayers) => {
        var token = Math.random().toString(36).substring(2, 9);
        const roomData = {
            id : token + token,
            author : socket.id,
            players : [socket.id],
            nbrPlayers : nbrPlayers
        };
        rooms.push(roomData)
    })

    socket.on("check_rooms", () => {
        console.log("chargement des rooms...")
        io.emit("load_rooms", rooms)
    })

    socket.on("join_room", (player) => {
        console.log(`un joueur a rejoint la partie`)
        rooms.forEach(room => {
            if (room.id === player.roomID) {
                if (room.players.includes(socket.id)) {
                    return;
                } else {
                    room.players.push(socket.id)
                }
                
            }
        });
    })

    socket.on("settings_room", () => {
        console.log(`récupération des données de la room... de la part du socket : ${socket.id}`);
        rooms.forEach(room => {
            console.log(room)
            if (room.players.includes(socket.id)) {
                
                io.emit("receive_settings", room)
            }
        });
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});