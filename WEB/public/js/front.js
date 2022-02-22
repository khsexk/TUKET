// ////////////////////////////////////////////////////////
// // front.js ADD BY YongsHub
// ////////////////////////////////////////////////////////
const socket = io();
const welcome = document.querySelector("#welcome");
const welcomeForm = welcome.querySelector("form");
const roomNumber = welcome.querySelector("#roomNumber");
const room = document.querySelector("#room");
const roomForm = room.querySelector('form');
const room_Name = roomNumber.value;
const exit = room.querySelector("#exit");
room.hidden = true;


function makeMessage(msg) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = msg;
    ul.append(li);
}

// Add by YongsHub -> 채팅방에 있는 인원수를 받아서 h3.innerText에 인원수 입력
function roomCount(roomInfo) {
    const h3 = room.querySelector("h3");
    h3.innerText = roomInfo;
}

welcomeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nick = welcome.querySelector('#nick');
    socket.emit("nickname", nick.value, (nickName, result) => { // nickname이라는 event 발생시켜서 -> app.js 서버로 발생시킴.
        console.log(`${nickName}으로 닉네임 설정 완료`);
        result.forEach((data) => {
            console.log(room_Name);
            if(data.room === room_Name) {
                console.log(data.room);
                makeMessage(`${data.nick}: ${data.msg}`);
            }
        });
    });
    room.hidden = false;
    welcome.hidden = true;
    socket.emit("enter_room", {roomName: room_Name}, (roomName) => {
        console.log(`${roomName} 방에 입장했습니다.`);
    });
});


roomForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = room.querySelector("input");
    const message = input.value;
    socket.emit("new_message", message, room_Name, () => { // 메시지 작성 -> new_message event 발생시킴
        makeMessage(`You: ${message}`);
    });
    input.value = '';
});

socket.on("welcome", (nick, roomInfo) => { // 자기 자신이 발생시킨 welcome에 대해서는 반응 X
    makeMessage(`${nick} 이 입장하였습니다.`);
    roomCount(roomInfo);
});

socket.on("bye", (nick, roomInfo) => {
    makeMessage(`${nick} 이 퇴장하였습니다.`);
    roomCount(roomInfo);
});

socket.on("new_message", (nickName, msg) => {
    console.log(nickName);
    makeMessage(`${nickName}: ${msg}`);
});

// Add by YongsHub
socket.on("room_change", (rooms) => { // 방목록을 보여주기 위한 이벤트 처리
    const ul = room.querySelector("ul:last-child");
    ul.innerHTML = "";
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        ul.append(li);
    });
}); // (msg) => console.log(msg)와 같음

