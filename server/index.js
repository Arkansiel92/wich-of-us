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

const questions = [
    "est le plus sensible",
    "est le plus fort physiquement",
    "est le plus fort mentalement",
    "est le plus intelligent",
    "est le plus riche",
    "peut trahir ses potes pour sa meuf",
    "peut se retrouver au milieu d'une bagarre",
    "a la plus grosse ;)",
    "a le plus de chance de se retrouver en prison",
    "est le meilleur aux jeux vidéos",
    "est le plus raciste",
    "a eu le pire date",
    "est le plus charismatique"
]

io.on("connection", (socket) => {
    const user = {
        socket : socket.id,
        room : null,
        name : "",
        host : false,
        ready : false,
        points : 0,
        vote : "",
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
        var roomToken = token + token;
        user.host = true;
        user.room = roomToken;
        const roomData = {
            id : roomToken,
            author : socket.id,
            players : [user],
            sockets : [socket.id],
            nbrPlayers : nbrPlayers,
            playersReady : 0
        };
        rooms.push(roomData);
    })

    socket.on("check_rooms", () => {
        console.log("chargement des rooms...")
        io.emit("load_rooms", rooms)
    })

    socket.on("join_room", (roomID) => {
        console.log(`un joueur a rejoint la partie`)
        rooms.forEach(room => {
            if (user.room !== roomID) {
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
        console.log(rooms);
        rooms.forEach(room => {
            if (room.sockets.includes(socket.id)) {
                io.emit("receive_settings", room)
            };
        });
    });

    socket.on("settings_questions", () => {
        rooms.forEach(room => {
            if (room.sockets.includes(socket.id)) {

                room.players.forEach(player => {
                    player.ready = false; // remise à zéro de la préparation des participants
                });

                room.playersReady = 0;
                io.emit("receive_questions", questions)
            };
        });
    });

    socket.on("ready", (data) => {
        rooms.forEach(room => {
            room.players.forEach(player => {
                if (data.socket == player.socket && data.name !== "" && room.players.length > 1) {
                    if (player.ready == false) {
                        player.name = data.name;
                        player.ready = true;
                        room.playersReady++;
                        console.log("Le joueur est pret "+room.playersReady);
                        console.log(room);
                        if (room.playersReady === room.nbrPlayers) {
                            console.log("tous les joueurs sont prêt")
                            io.emit("readyToPlay", true);
                        }
                    } else {
                        player.ready = false;
                        room.playersReady--;
                        io.emit("readyToPlay", false);
                    };
                    io.emit("receive_settings", room);
                };  
            });
        });
        // user.ready = true; (je sais pas encore si je dois mettre à jour dans la const user)
    }); 

    socket.on("play_game", (ID) => {
        rooms.forEach(room => {
            if (ID == room.id) {
                room.sockets.forEach(socketP => {
                    io.to(socketP).emit("start_game", true)
                });
            }
        }); 

        
    });

    socket.on("vote", (data) => {
        rooms.forEach(room =>{
            if (data.room == room.id) {
                room.players.forEach(player => {
                    if (data.player == player.socket) {
                        player.vote = data.name
                        player.ready = true;
                        room.sockets.forEach(socketP => {
                            io.to(socketP).emit("receive_settings", room)
                        });
                    };
                });
            };
        });
    });
});


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});