import React, { useEffect, useState } from "react";

function Chat({ socket, userName, room }) {
    const [currentMessage, setCurrentMessage] = useState('');

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
        
        const response = await fetch('https://node-server-test-omega.vercel.app/webhook',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(messageData)
        })
        response.json().then(data => console.log('test 11'))
    }
        
    }
    useEffect(() => {
        console.log('socket changed')
        socket.on("receive_message", (data) => {
            console.log('testing msg',data)
        });
    }, [socket]);

    return <div>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input type="text" placeholder="Hey..." onChange={(e) => setCurrentMessage(e.target.value)} />
        </div>
        <button onClick={sendMessage}>&#9658;</button>
    </div>;
}

export default Chat;
