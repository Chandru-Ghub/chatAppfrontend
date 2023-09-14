import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({socket,user,room}) => {

    const [msg,setMsg] = useState('')
    const[txt,setTxt] = useState([])


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
            // console.log(data);
            // setTxt(data.message)
            setTxt((a)=>[...a,data])
            // console.log(txt);
        })
},[socket])
  return (
    <div className='chatbox'>
        <div className="chatheader">
            <p className='app'>Live Chat </p>
            <p className='username'>{user}</p>
        </div>
                <div className="chatbody">
                    {/* {console.log(user)}
                    {console.log(txt)} */}
                    <ScrollToBottom className='scrollbottom'>
                    {txt.map((a,i)=>{
                    
                        return <div key={i} className={a.user==user?'chatContainer left':'chatContainer right'}> 
                                    <div className={a.user == user?'chatflex you':'chatflex notyou'}>
                                        <p className='name'>{a.user==user?'You':a.user}</p>
                                        <p className={a.user==user?'mychat':'otherchat'}>{a.message}</p>
                                        <p className='time'>{a.time}</p>
                                    </div>
                                </div>

                    }
                        
                    )}
                    </ScrollToBottom>
                </div>
        <div className="chatfooter">
            <textarea className='txt' value={msg} type="text" onChange={(e)=>setMsg(e.target.value)} placeholder='Type something...' />
            <button onClick={sendMessage}>send</button>
        </div>
    </div>
  )
}

export default Chat