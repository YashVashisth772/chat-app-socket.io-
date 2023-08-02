import { useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect("https://node-server-test-one.vercel.app",{
  withCredentials: true
})
socket.on("notification",(data)=> console.log('testing notification data',data))
socket.on("send_message",(data)=> console.log('testing send_message',data))

function App() {

  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("")

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Join A Chat</h3>
     <input type="text" placeholder="John..." onChange={(e) => setUsername(e.target.value)}/>
     <input type="text" placeholder='RoomId' onChange={(e)=> setRoom(e.target.value)}/>
     <button onClick={joinRoom}>Join A Room</button>

     <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
