import io from "socket.io-client";
let socket = io("http://localhost:8000/chat");
export default socket;
