import io from 'socket.io-client'
import './App.css';
import React, {useState } from 'react'
import Chat from './Chat';
const socket = io.connect('https://chatappbackend-t15w.onrender.com')
function App() {

  const[user,setUser] = useState('')
  const[room,setRoom] = useState('')
  const[showChat,setShowchat] = useState(false);

  function handleSubmit(e){

    e.preventDefault()
    // console.log(user,room);
    if(user !== '' && room !== ''){
      socket.emit('join_room', room)
    }
    setShowchat(true)
  }
  return (
    <div className="chatApp">
      {!showChat?<form className='join' onSubmit={handleSubmit} >
        <h2>join a chat</h2>
        <input required className='usname jn' placeholder='user name' onChange={(e)=>setUser(e.target.value)} type="text" />
        <input required className='roomid jn' placeholder='Room ID' onChange={(e)=>setRoom(e.target.value)} type="text" />
        <button className='joinbtn' type='submit'>Join room</button>
      </form>:<Chat socket={socket}user={user} room={room} />}
    </div>
  );
}

export default App;
