import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../Assets/background.jpg'

const Admin = () => {
  const [users,setUsers] = useState(undefined)
  const [loader,setLoader] = useState(true)
  const [currentuser,setCurrentuser] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false)
  const [rel,setRel] = useState(true)
  const navigate = useNavigate()

    useEffect(()=>{
      if(localStorage.getItem('TechWiz-details')){
        setCurrentuser(JSON.parse(localStorage.getItem('TechWiz-details')))
        const user = JSON.parse(localStorage.getItem('TechWiz-details'))
        if(!user.isAdmin){
          navigate('/newportfolio')
        }
      }
      else{
        navigate('/login')
      }
    },[rel])

    useEffect(()=>{
        const fetchUsers = async()=>{
            try {
                const {data} = await api.get('/members/admin')
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
    const handleLogOut=async()=>{
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        localStorage.removeItem('TechWiz-details')
        setRel(!rel)
        navigate('/login')
      }
    }

    const handleRemoveUser = async(id)=>{
      const confirmLogout = window.confirm("Are you sure? Do you want to remove the user?")
      if(confirmLogout){
        setLoader(true)
        try {
          const {data} = await api.delete(`/members/${id}`)
          if(!data.status){
            setLoader(false)
            throw new Error("can't remove the member")
          }
          setUsers(users.filter((user)=> user._id !== id))
          setLoader(false)
        } catch (error) {
          alert(error.message)
        }
      }
    }

  return (
    <Container>
      <div className="nav">
          <div className="svg">
            <input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)} name="" id="check" />
            <label htmlFor="check">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </label>
          </div>
          <ul className={`menu ${isChecked?'show':'hide'}`}>
            <Link to={'/register'}><li>Add a Member</li></Link>
            <Link><li onClick={handleLogOut} >Log Out</li></Link>
          </ul>
        </div>
        
        <div className="users">
          <h1>Admin Page</h1>
        {loader?(<div class="loader"></div>):(
            <ul>
                {users.map((item,index)=>(
                    <li key={index}>
                        <h4>{item.username}</h4>
                        <p>{item.email}</p>
                        <div className="remove" onClick={()=>handleRemoveUser(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
         

    </Container>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
  width: 100%;
  background-color: black;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  .users{
    width:100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 0.5rem;
        h1{
          color: white;
        }
        ul{
            list-style-type: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            border: 1px solid white;
            border-radius: 1rem;
            height: 80%;
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
                margin: 0.5rem;
                backdrop-filter: blur(6px);
                color: white;
                cursor: pointer;
                border: 1px solid white;
                border-radius: 10px;
                padding:1rem;
                .remove{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  position: absolute;
                  right: 1rem;
                  top: 1.5rem;
                  border: 1px solid white;
                  border-radius: 50%;
                  padding: 7px;
                  &:hover{
                    background-color: red;
                  }
                }
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
  }
.nav{
      position: absolute;
      top: 2rem;
      right: 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: end;
      z-index: 99;
      .svg{
        input{
          display: none;
        }
        label{
          padding:0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border:6px solid black;
          border-radius: 50%;
        }
      }
      .menu{
        margin-top: 0;
        width:220px;
        backdrop-filter: blur(6px);
        list-style-type: none;
        display: flex;
        flex-direction: column;
        padding: 0;
        z-index: 99;
        border: 3px solid purple;
        a{
          text-decoration: none;
          color: inherit;
          li{
            margin:0;
            padding: 1rem 0.6rem;
            color: white;
            border: 1px solid white;
            text-align: center;
            &:hover{
              background-color: #80008041;
            }
          }
        }
        }
        .hide{
          display: none;
        }
    }
`

export default Admin