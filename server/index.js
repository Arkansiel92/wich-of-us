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
        console.log(room)
        rooms.push(room)

        socket.to(room.ID).emit("load_rooms", rooms)
    })
})


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});