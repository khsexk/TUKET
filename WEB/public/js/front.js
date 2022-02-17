////////////////////////////////////////////////////////
// ADD BY YongsHub
////////////////////////////////////////////////////////
const socket = io();
const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");
const roomForm = room.querySelector("form");

room.hidden = true; // 처음에 감춰둔다.
let room_Name = '';


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


form.addEventListener("submit", (event) => { // 폼 입력 되었을 때
    event.preventDefault();
    const roomNum = form.querySelector("#roomName");
    const nick = form.querySelector("#nick");
    room_Name = roomNum.value;
    console.log(roomNum.value, nick.value);

    socket.emit("nickname", nick.value, () => { // nickname이라는 event 발생시켜서 -> app.js 서버로 발생시킴.
        console.log("nickname설정이 서버에서 실행되었습니다.");
    });

    socket.emit("enter_room", {roomName: roomNum.value}, (roomName) => {
        room.hidden = false;
        welcome.hidden = true;
        const h3 = room.querySelector("h3");
        h3.innerText = `room name: ${roomName}`;
    });
    roomNum.value ="";
});

roomForm.addEventListener("submit", (event) => { // 폼 입력되었을 때
    event.preventDefault();
    const input = room.querySelector("input");
    const message = input.value;

    socket.emit("new_message", message, room_Name, () => { // 메시지 작성 -> new_message event 발생시킴
        makeMessage(`You: ${message}`);
    });

    input.value = '';
})

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
////////////////////////////////////////////////////////