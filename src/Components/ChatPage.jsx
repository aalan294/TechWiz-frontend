import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import {IoMdSend} from 'react-icons/io'
import logo from '../Assets/01_MAIN_Logo_Dark.png'

const ChatPage = ({socket}) => {
    const [msg,setMsg] = useState('')
    const [messages,setMessages] = useState([])
    const [currentUser,setCurrentUser] = useState(undefined)
    const [loader,setLoader]= useState(false)
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    //socket.io integration

    useEffect(()=>{
        if (socket.current) {
            socket.current.on("msg-receive", (message) => {
                setArrivalMessage({ fromSelf: false, message: message.message, sender: message.sender });
            });
        }
    
        return () => {
            if (socket.current) {
                socket.current.off("msg-receive");
            }
        };
    },[socket])
    useEffect(()=>{
        arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage])

    /////////////
     useEffect(()=>{
        const fetchMessages =async()=>{
            if(localStorage.getItem('TechWiz-details')){
                try {
                    setLoader(true)
                    const user = JSON.parse(localStorage.getItem('TechWiz-details'))
                    setCurrentUser(user)
                    const {data} = await api.post('/chat/inbox',{
                        from:user._id
                    })
                    if(!data.status){
                        setLoader(false)
                        throw new Error(data.msg)
                    }
                    setMessages(data.messages)
                    setLoader(false)
                    scrollToBottom()
                    
                } catch (error) {
                    console.log(error.message)
                }
            }
        }
        fetchMessages()
    },[])

    const handleSendMsg =async(e)=>{
        if(msg!==""){
            try {
                let message = msg
                setMessages([...messages,{fromSelf:true,sender:"You",message:message}])
                e.preventDefault()
                setMsg("")
                if(currentUser){
                    socket.current.emit("send-msg",{
                        "message" : message,
                        "sender": currentUser.username
                    })
                }

                scrollToBottom()
                await api.post('/chat',{
                    from: currentUser._id,
                    message: message
                })
        } catch (error) {
            console.log(error.message)
        }
        }  
    }

  return (
    <ChatContainer>
                <div  className="chat-header">
                    <div className="chatUser">
                        <img src={logo} alt="" />
                        <h3>TechWiz Group Chat</h3>
                    </div>
                    <div className="logout">
                    </div>
                </div>
        <div className="messages" >
        {loader?(<div class="loader"></div>):(
            <div className="chats">
            {messages.map((message,index)=>(
                <div key={index} className={`message ${message.fromSelf?"sended":"recieved"}`}>
                    <p><span className='sname'>{message.fromSelf?"You":message.sender}</span><span className='text'>{message.message}</span></p>
                </div>
            ))}
            <div ref={messagesEndRef}></div>
        </div>
        )}
        </div>
        
        <div className="chat-sender">
            <form onSubmit={handleSendMsg}>
                <input type='text' placeholder='Type to send message...' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                <button type='submit'><IoMdSend/></button>
            </form>
        </div>
    </ChatContainer>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const ChatContainer = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 8% 85% 7%;
    color: white;
    border-radius: 0 1rem 1rem 0;
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #252547;
        padding: 1rem;
        border-radius: 1rem 1rem 0 0;
        overflow: hidden;
        .chatUser{
            height: 100%;
            display: flex;
        justify-content: left;
        align-items: center;
        gap: 1rem;
        background-color: #252547;
        img{
            width: 3rem;
            border-radius: 50%;
        }
        }
    }
    .messages{
        height: 100%;
        overflow-y: scroll;
        background-color: #ffffff1e;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .loader {
          margin: 10rem auto;
          width: fit-content;
          font-weight: bold;
          font-family: monospace;
          font-size: 30px;
          background: radial-gradient(circle closest-side,purple 94%,#0000) right/calc(200% - 1em) 100%;
          animation: ${slideLeft} 1s infinite alternate linear;

          &::before {
            content: "Loading...";
            line-height: 1em;
            color: #0000;
            background: inherit;
            background-image: radial-gradient(circle closest-side,#fff 94%,purple);
            -webkit-background-clip:text;
            background-clip:text;
          }
        }
        .chats{
        display: flex;
        gap: 10px;
        flex-direction: column;
        width: 100%;
        .message{
            display: flex;
            p{
                max-width: 40%;
                margin: 0.7rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                .text{
                    max-width: 100%;
                    overflow-wrap: break-word;
                    padding: 0.2rem 1rem;
                    font-size: 1.1rem;
                    border-radius: 1rem;
                }  
                .sname{
                    color: #ffffff;
                    font: small-caption;
                    padding: 0;
                    margin: 0;
                    margin-left: 0.2rem;
                }
            }
        }
        .sended{
            justify-content: flex-end;
            p{
                align-items: flex-end;
                .sname{
                    margin-right: 0.3rem;
                }
                .text{
                    background-color: purple;
                }
            }
            }
        .recieved{
            justify-content: flex-start;
            p{
                .text{
                    background-color: #151551;
                }
            }
        }
    }
    }
    .chat-sender{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #ffffff1e;
        form{
            display: flex;
            justify-content: space-between;
            width: 90%;
            color: white;
            padding: 0.5rem;
            backdrop-filter:(8px);
            border: 1px solid white;
            border-radius: 1.5rem;
            input{
                width: 90%;
                outline: none;
                border: none;
                background-color: inherit;
                color: white;
                font-size: 1rem;
            }
            button{
                cursor: pointer;
                color: white;
                border: none;
                outline: none;
                background-color: inherit;
                font-size: 1rem;
            }
        }
    }
`

export default ChatPage
