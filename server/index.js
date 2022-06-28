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
    })

    socket.on("create_room", (room) => {
        rooms.push(room)
    })

    socket.on("check_rooms", () => {
        console.log("chargement des rooms...")
        io.emit("load_rooms", rooms)
    })

    socket.on("join_room", (player) => {
        console.log(`le joueur ${player.username} a rejoint la partie`)
        rooms.forEach(room => {
            if (room.id === player.roomID) {
                if (room.players.includes(player.username)) {
                    return;
                } else {
                    room.players.push(player.username)
                }
                
            }
        });
    })

    socket.on("settings_room", (player) => {
        console.log("récupération des données de la room...");
        rooms.forEach(room => {
            if (room.id == player.roomID) {
                console.log(room)
                io.emit("receive_settings", room)
            }
        });
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});