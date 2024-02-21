import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import background from '../Assets/background.jpg'
import SelectedProfile from '../Components/SelectedProfile'
import MemberList from '../Components/MemberList'

const Members = () => {
  const [selectedUser,setSelectedUser] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false)
  const [rel,setRel] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('TechWiz-details')){
      const user = JSON.parse(localStorage.getItem('TechWiz-details'))
      if(user.isAdmin){
        navigate('/admin')
      }
      else if(!user.isPortfolio){
        navigate('/newportfolio')
      }
    }
    else{
      navigate('/login')
    }
  },[rel])

  const handleLogOut=async()=>{
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('TechWiz-details')
      setRel(!rel)
      navigate('/login')
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
            <Link to={'/portfolio'}><li>Your Portfolio</li></Link>
            <Link to={'/members'} ><li>Members</li></Link>
            <Link to={'/groupchat'} ><li>GroupChat</li></Link>
            <Link><li onClick={handleLogOut} >Log Out</li></Link>
          </ul>
        </div>
      <div className="container">
        <div className={`member-list ${selectedUser===undefined?'show':'hide'}`}>
          <MemberList setSelectedUser={setSelectedUser} />
        </div>
        <div className={`selected-profile ${selectedUser===undefined?'hide':'show'}`}>
          <SelectedProfile setSelectedUser={setSelectedUser} selectedUser = {selectedUser} />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    .nav{
      position: absolute;
      top: 1rem;
      right: 1rem;
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
    .container{
      width:90%;
      height:90%;
      border:1px solid white;
      border-radius: 1rem;
      display: grid;
      grid-template-columns: 30% 70%;
      .member-list{
        width:100%;
        height:100%;
        overflow: hidden;
      }
      .selected-profile{
        width:100%;
        height:100%;
        overflow: hidden;
      }
      @media only screen and (max-width: 1100px){
        grid-template-columns: 40% 60%;
    }
    @media only screen and (max-width: 700px){
      display: flex;
      .member-list{
        width: 100%;
      }
      .hide{
        display: none;
      }
    }
    }

`

export default Members