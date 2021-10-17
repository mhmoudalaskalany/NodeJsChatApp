import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import * as http from "http";
import * as socketio from "socket.io";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.static("public"));
app.set('view engine', 'ejs');

const server = http.createServer(app);
const io = new socketio.Server(server);

app.get("/", (req, res) => {
    res.redirect(`/${uuid()}`);
});

app.get("/:roomId", (req, res) => {
    res.render("room", { roomId: req.params.roomId })
})

io.on("connection", (socket) => {
    console.log('connected');
    socket.on("join-room", (roomId, userId, userName) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId);
        socket.on("message", (message) => {
            io.to(roomId).emit("createMessage", message, userName);
        });
    });
});

server.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
