const express = require('express');
const path = require('path');
const morgan = require('morgan');
const http = require('http'); // add by yongsHub
const SocketIO = require("socket.io"); // add by yongsHub

const { sequelize } = require('./models/index');
/* mongodb by YongsHub */
const mongo = require('mongodb').MongoClient;
///////////////////////////////////////////////


const app = express();

/* by Taeyong npm i ws pug 할 것!*/
const postRouter = require('./router/postRouter');
const chatRouter = require('./router/chatRouter');
const loginRouter = require('./router/loginRouter');
const registerRouter = require('./router/registerRouter');

app.set("view engine", "pug"); // view engine pug로 지정
app.set("views", __dirname + "/views"); // views 실행중인 폴더 /views
app.use("/public", express.static(__dirname + "/public"));
app.use('/post', express.static(__dirname + "/uploads"));
app.set('port', process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.render("home"); // home.pug
});

app.set('/login', loginRouter); // login router
app.set('/register', registerRouter); // register router

//app.get("/*", (_, res) => res.redirect("/"));
/* by Taeyong */

app.set('port', process.env.PORT || 3000);

sequelize.sync({ force: false })
    .then(() => {
        console.log('DB Connect Success');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/post', postRouter); // add by khsexk
app.use('/post/content/chat', chatRouter); // add by YongsHub
//////////////// Mongo DB ////////////////////////

/* 2022/02/16 add by YongsHub */
const httpServer = http.createServer(app);
const io = SocketIO(httpServer);



function roomCount(room, check) {
    if(check === 'add') return `room name: ${room} 참여인원${io.sockets.adapter.rooms.get(room)?.size}명`;
    else return `room name: ${room} 참여인원${io.sockets.adapter.rooms.get(room)?.size - 1}명`;
}

function publicRooms() {
    const rooms = io.sockets.adapter.rooms;
    const sids = io.sockets.adapter.sids;

    const publicRooms = [];

    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        };
    });
    return publicRooms;
};
mongo.connect('mongodb://127.0.0.1/mongochat', function(err, db){
    if(err){
        throw err;
    }
    console.log('MongoDB connected...');

    io.on("connection", (socket) => { // 소컷이 연결되었을 때
        let chat = db.collection('chat');
        socket.onAny((event) => { // 소켓에서 일어나는 event middleware 역할
            console.log(`got event : ${event}`);
            console.log(io.sockets.adapter);
        });
        
        socket.on("nickname", (nick, done) => { // nickname이라는 event 발생시, 소켓의 이름 지정
            console.log(`nickName:`, nick);
            socket['nickName'] = nick;
            done(socket['nickName']); // 프론트에서 보낸 마지막 인자인 함수 실행시켜줌
        });
    
        socket.on("enter_room", (message, done) => { // enter_room event 발생 시
            socket.join(`${message.roomName}`);
            done(message.roomName);
            console.log(socket.rooms);
            socket.to(message.roomName).emit("welcome", socket['nickName'], roomCount(message.roomName, 'add'));
            io.sockets.emit("room_change", publicRooms());
        });
    
        socket.on("disconnecting", () => { // 사용자가 브라우저 닫았을 때
            socket.rooms.forEach(room => {
                socket.to(room).emit("bye", socket['nickName'], roomCount(room, 'minus'));
            });
        });
    
        socket.on("disconnect", () => {
            io.sockets.emit("room_change", publicRooms());
        });
    
        
        socket.on("new_message", (msg, room, done) => { // new_message event 발생시
            socket.to(room).emit("new_message",socket['nickName'], msg);
            done();
        });
    });
});

httpServer.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});


/////////////////////////////////// add by YongsHub