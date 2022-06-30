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
    const user = {
        socket : socket.id,
        room : null,
        name : null,
        host : false,
        ready : false,
        points : 0
    };
    console.log(socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        rooms.forEach((room, i) => {
            room.sockets.forEach((player, index) => {
                if (socket.id == player) {
                    room.sockets.splice(index, 1) // supression du joueur si il était dans une room
                    room.players.splice(index, 1)
                    if (room.sockets.length == 0) {
                        rooms.splice(i, 1) // suppression de la room si elle est vide
                    };
                }   ;          
            });
        });
    });

    socket.on("create_room", (nbrPlayers) => {
        var token = Math.random().toString(36).substring(2, 9);
        var roomToken = token + token
        user.host = true;
        user.room = roomToken;
        const roomData = {
            id : roomToken,
            author : socket.id,
            players : [user],
            sockets : [socket.id],
            nbrPlayers : nbrPlayers
        };
        rooms.push(roomData)
    })

    socket.on("check_rooms", () => {
        console.log("chargement des rooms...")
        io.emit("load_rooms", rooms)
    })

    socket.on("join_room", (roomID) => {
        console.log(`un joueur a rejoint la partie`)
        rooms.forEach(room => {
            if (user.room !== room) {
                room.sockets.push(socket.id);
                room.players.push(user);
                user.room = roomID;
            } else {
                return;
            };
        });
    })

    socket.on("settings_room", () => {
        console.log(`récupération des données de la room... de la part du socket : ${socket.id}`);
        console.log(user);
        console.log(rooms)
        rooms.forEach(room => {
            if (room.sockets.includes(socket.id)) {
                io.emit("receive_settings", room)
            }
        });
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});