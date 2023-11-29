import io from 'socket.io-client'
import './App.css';
import React, {useEffect, useState } from 'react'
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
      socket.emit('join_room', room,user)
    }
    setShowchat(true)
  }



  return (
    <div className="chatApp">
      {!showChat?<form className='join' onSubmit={handleSubmit} >
        <h2>FUN chat </h2>
        <input required className='usname jn' placeholder='user name' onChange={(e)=>setUser(e.target.value)} type="text" />
        <input required className='roomid jn' placeholder='Room ID' onChange={(e)=>setRoom(e.target.value)} type="text" />
        <button className='joinbtn' type='submit'>Join room</button>
      </form>:<Chat socket={socket}user={user} room={room} />}
      {!showChat?<div className="footer">
      <p> &copy; copyright 2023 <span>|| </span>Designed and created by <span>chandru</span></p>
      </div>:''}
      <img className={showChat?'img':'noimg'} src="https://firebasestorage.googleapis.com/v0/b/shopyecommerce-e73af.appspot.com/o/ProductImages%2Faeeeb567-dec8-451c-8295-4845bce23362?alt=media&token=95b3b7c8-c199-4564-8198-81ed89faeb5f" alt="" />
    </div>
  );
}

export default App;
