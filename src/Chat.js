import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({socket,user,room}) => {

    const [msg,setMsg] = useState('')
    const[txt,setTxt] = useState([])
    const[onUsers,setOnUsers] = useState([])
    const [show,setShow] = useState(true)


    const sendMessage=  async ()=>{

        if (msg!=''){

            const date = new Date()
            const hour = date.getHours()
            const min = date.getMinutes()

            let minute = min<10 ? '0'+min:min
            let sendtime = hour<10?'0'+hour+':'+minute:hour+':'+minute

            setTxt((a)=>[...a,messageData])
            const messageData = {

                room:room,
                user:user,
                message:msg,
                time: sendtime
            }
           
            await socket.emit('send_message',messageData)
            setMsg('')
        }
        
    }

    useEffect(()=>{
        socket.on('received_msg',(data)=>{
            console.log(data);
            // setTxt(data.message)
            setTxt((a)=>[...a,data])
            // console.log(txt);
        })},[socket])

    useEffect(()=>{
        socket.on('setjoin_room', (data,user,id)=>{

           const userCheck = {
                id:id,
                newuser:user,
                room:data,
            }
            
            // setOnUsers(userCheck)
            setTxt((a)=>[...a,userCheck])
            // setTxt(f)
           
        })},[socket])
       
        // setTimeout(()=>{
        //         setShow(false)
        // },1500)
        // console.log(onUsers);
  return (
    <div className='chatbox'>
        <div className="chatheader">
            <p className='app'>Live Chat </p>
            <p className='username'>{user}</p>
        </div>
                <div className="chatbody">
                    {/* {console.log(user)}
                    {console.log(txt)} */}
                  
    
                     {/* {show?<p style={{color:'white'}}>{onUsers.user}</p>:null} */}
                    <ScrollToBottom className='scrollbottom'>
                    {txt.map((a,i)=>(
                                <div>{a.newuser?<p className='enter'>{a.newuser==user?' you joined the chat': a.newuser+' joined the chat'}</p>:
                                            <div key={i} className={a.user==user?'chatContainer left':'chatContainer right'}> 
                                                {/* <p style={{color:'white'}}>{a.id}</p> */}
                                                <div className={a.user == user?'chatflex you':'chatflex notyou'}>
                                                    <p className='name'>{a.user==user?'You':a.user} </p>
                                                    <p className={a.user==user?'mychat':'otherchat'}>{ a.message}</p>
                                                    <p className='time'>{a.time}</p>
                                                </div>
                                            </div>}
                                </div>

                    
                        
                    ))}
                    </ScrollToBottom>
                </div>
        <div className="chatfooter">
                        <div className="ipbox">
                        <textarea className='txt' value={msg} type="text" onChange={(e)=>setMsg(e.target.value)} placeholder='Type something...' />
            <button onClick={sendMessage}><span class="material-symbols-outlined">
send
</span></button>
                        </div>
        </div>
    </div>
  )
}

export default Chat