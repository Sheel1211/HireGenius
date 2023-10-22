import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import Routes from "./routes/index.js";
import "./config/db.js";
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import AptitudeRoute from "./routes/aptiRoutes.js";
import http from 'http';
import { Server } from "socket.io";
import moment from "moment";
import path from "path";
import ejs from 'ejs';


dotenv.config();

app.set('view engine','ejs');

const __dirname = path.join(process.env.BACKEND_FOLDER_PATH);

app.use(express.static(path.join(__dirname, 'public')));

connectDB();

const hostname = process.env.HOST_NAME || "127.0.0.1";
const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server)

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173","http://localhost:4000", "http://127.0.0.1:4000"],
    credentials: true,
  })
);

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);




app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Hii I'm Running</h1>`);
});

app.use("/api", Routes);
app.use("/api", AptitudeRoute);

let rooms = {};
let socketroom = {};
let socketname = {};
let micSocket = {}; 
let videoSocket = {};
let roomBoard = {};

io.on('connect', socket => {

  socket.on("join room", (roomid, username) => {

      socket.join(roomid);
      socketroom[socket.id] = roomid;
      socketname[socket.id] = username;
      micSocket[socket.id] = 'on';
      videoSocket[socket.id] = 'on';

      if (rooms[roomid] && rooms[roomid].length > 0) {
          rooms[roomid].push(socket.id);
          socket.to(roomid).emit('message', `${username} joined the room.`, 'Bot', moment().format(
              "h:mm a"
          ));
          io.to(socket.id).emit('join room', rooms[roomid].filter(pid => pid != socket.id), socketname, micSocket, videoSocket);
      }
      else {
          rooms[roomid] = [socket.id];
          io.to(socket.id).emit('join room', null, null, null, null);
      }

      io.to(roomid).emit('user count', rooms[roomid].length);

  });

  socket.on('action', msg => {
      if (msg == 'mute')
          micSocket[socket.id] = 'off';
      else if (msg == 'unmute')
          micSocket[socket.id] = 'on';
      else if (msg == 'videoon')
          videoSocket[socket.id] = 'on';
      else if (msg == 'videooff')
          videoSocket[socket.id] = 'off';

      socket.to(socketroom[socket.id]).emit('action', msg, socket.id);
  })

  socket.on('video-offer', (offer, sid) => {
      socket.to(sid).emit('video-offer', offer, socket.id, socketname[socket.id], micSocket[socket.id], videoSocket[socket.id]);
  })

  socket.on('video-answer', (answer, sid) => {
      socket.to(sid).emit('video-answer', answer, socket.id);
  })

  socket.on('new icecandidate', (candidate, sid) => {
      socket.to(sid).emit('new icecandidate', candidate, socket.id);
  })

  socket.on('message', (msg, username, roomid) => {
      io.to(roomid).emit('message', msg, username, moment().format(
          "h:mm a"
      ));
  })

  socket.on('getCanvas', () => {
      if (roomBoard[socketroom[socket.id]])
          socket.emit('getCanvas', roomBoard[socketroom[socket.id]]);
  });

  socket.on('draw', (newx, newy, prevx, prevy, color, size) => {
      socket.to(socketroom[socket.id]).emit('draw', newx, newy, prevx, prevy, color, size);
  })

  socket.on('clearBoard', () => {
      socket.to(socketroom[socket.id]).emit('clearBoard');
  });

  socket.on('store canvas', url => {
      roomBoard[socketroom[socket.id]] = url;
  })

  socket.on('disconnect', () => {
          if (!socketroom[socket.id]) return;
          socket.to(socketroom[socket.id]).emit('message', `${socketname[socket.id]} left the chat.`, `Bot`, moment().format(
              "h:mm a"
          ));
          socket.to(socketroom[socket.id]).emit('remove peer', socket.id);
          var index = rooms[socketroom[socket.id]].indexOf(socket.id);
          rooms[socketroom[socket.id]].splice(index, 1);
          io.to(socketroom[socket.id]).emit('user count', rooms[socketroom[socket.id]].length);
          delete socketroom[socket.id];
          console.log('--------------------');
          console.log(rooms[socketroom[socket.id]]);
          
          //toDo: push socket.id out of rooms
  });
})

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
