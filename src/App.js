import { useEffect, useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';

// const URL = process.env.NODE_ENV === 'production' ? 'https://node-server-test-omega.vercel.app:9001' : 'http://localhost:9001/';
// const socket = io.connect(URL, {
//   origin: '*',
// }
// )
// console.info('test socket', socket);
// socket.on("notification", (data) => console.log('testing notification data', data))
// socket.on("send_message", (data) => console.log('testing send_message', data))


function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("")

  // const joinRoom = () => {
  //   if (username !== "" && room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };
  const URL = process.env.NODE_ENV === 'production' ? 'https://node-server-test-omega.vercel.app:9001' : 'http://localhost:9001/';
    let socket = io.connect(URL, {
      origin: '*',
    }
    )
  useEffect(() => {
    console.info('test ****',);
    socket.connect();
    console.info('test socket', socket);
    socket.on("notification", (data) => console.log('testing notification data', data))
    socket.on("send_message", (data) => console.log('testing send_message', data))
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
    socket.on("disconnect", () => {
      console.log(socket.disconnected); // false
    });
    socket.on("connect", () => {
      console.log(socket.id); // "G5p5..."
    });
  }, [socket])

  return (
    <div className="App">
      <h3>Join A Chat</h3>
      <input type="text" placeholder="John..." onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder='RoomId' onChange={(e) => setRoom(e.target.value)} />
      {/* <button onClick={joinRoom}>Join A Room</button> */}

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
