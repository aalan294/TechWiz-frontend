import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'

const MemberList = ({setSelectedUser}) => {
    const [users,setUsers] = useState(undefined)
    const [loader,setLoader] = useState(true)
    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const {data} = await api.get('/members')
                if(!data.status){
                    setLoader(false)
                    throw new Error(data.msg)
                }
                setUsers(data.users)
                setLoader(false)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchUsers()
    },[])
  return (
    <MemberContainer>
        {loader?(<div class="loader"></div>):(
        <div className="users">
            <ul>
                {users.map((item,index)=>(
                    <li onClick={()=>setSelectedUser(item)} key={index}>
                        <h4>{item.username}</h4>
                        <p>{item.email}</p>
                    </li>
                ))}
            </ul>
        </div>
         )}
    </MemberContainer>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const MemberContainer = styled.div`
    width:100%;
    height: 100%;
    overflow: hidden;
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
    .users{
        width:100%;
        height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 0.5rem;
        ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 90%;
            overflow: scroll;
            &::-webkit-scrollbar{
                width: 0.2rem;
                &-thumb{
                    background-color: #ffffff39;
                    width: 0.1rem;
                    border-radius: 1rem;
                }
            }
            li{    
                margin: 0.5rem 0;
                backdrop-filter: blur(6px);
                color: white;
                cursor: pointer;
                border: 1px solid white;
                border-radius: 10px;
                padding:1rem;
                h4{
                    padding: 0;
                    margin: 0;
                }
                p{
                    padding: 0;
                    margin: 0;
                    color: pink;
                }
            }
        }
    }
`

export default MemberList