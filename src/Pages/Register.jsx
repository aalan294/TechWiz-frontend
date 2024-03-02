import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'

const Register = () => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [rel,setRel] = useState(true)

    useEffect(()=>{
      if(localStorage.getItem('TechWiz-details')){
      }
      else{
        navigate('/login')
      }
    },[rel])

    const [values,setValues] = useState({
        email:"",
        username:""
    })
    const handleChange =(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleValidation =()=>{
        const {email,username} = values
        if(email === ""){
            alert("email is required")
            return false
        }
        else if(username === ""){
            alert("username is required")
            return false
        }
        return true
    }
    const handleSubmit =async(e)=>{
        setLoader(true)
        e.preventDefault()
        if(handleValidation()){
            try {
                const {email,username} = values
                const userData = {email,username,isAdmin}
                const {data} = await api.post('/auth/register',userData)
                if(data.status === false){
                    setLoader(false)
                    alert(data.msg)
                }
                if(data.status === true){
                  setLoader(false)
                  navigate('/admin')
                  alert("User registered Successfully")
                }
            } catch (error) {
                alert(error.message)
                setLoader(false)
            }
            
        }
    }

    const handleLogOut=async()=>{
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (confirmLogout) {
        localStorage.removeItem('TechWiz-details')
        setRel(!rel)
        navigate('/login')
      }
    }

  return (
    <>
    <Container>
    <div className="nav">
          <div className="svg">
            <input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)} name="" id="check" />
            <label htmlFor="check">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </label>
          </div>
          <ul className={`menu ${isChecked?'show':'hide'}`}>
            <Link to={'/admin'}><li>Admin Page</li></Link>
            <Link><li onClick={handleLogOut} >Log Out</li></Link>
          </ul>
        </div>
        <form onSubmit={e=>handleSubmit(e)}>
        {loader?(<div class="loader"></div>):(
            <div className="cont">
              <div className="brand">
                  <h1 style={{color:'white'}}>New Member</h1>
              </div>
              <input type='email' placeholder='E-Mail' name='email' onChange={e=>handleChange(e)} />
              <input type="text" placeholder='username' name='username' onChange={e=>handleChange(e)} />
              <div className="checkbox">
                <input type="checkbox" name="isAdmin" id="admin" onChange={()=>setIsAdmin(!isAdmin)} value={isAdmin} /><label htmlFor='admin'>Make as Admin</label>
              </div>
              <button type='submit' className='submit'>Register</button>
          </div>
        )}
            </form>
    </Container>
    </>
  )
}

const slideLeft = keyframes`
  100% {
    background-position: left;
  }
`;

const Container = styled.div`
    height: 100vh;
    overflow: hidden;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
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
    form{
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
        .cont{
            height: 40vh;
        display: flex;
        flex-direction: column;
        backdrop-filter: blur(2px);
        border: 2px solid white;
        padding: 2rem;
        padding-bottom: 3rem;
        gap: 1rem;
        text-align: center;
        border-radius: 1.5rem;
        justify-content: center;
        .checkbox{
          color: white;
        }
        .submit{
                width: 50%;
                margin: 1rem auto;
                padding: 0.5rem;
                border-radius: 0.3rem;
                border: none;
                outline: none;
                background-color: purple;
                color: white;
                &:hover{
                    background-color: #490149;
                }
            }
        input{
            margin-top: 0.5rem;
            padding: 0.3rem;
            border-radius: 0.3rem;
            border: none;
            outline: none;
            &:active{
                border: 2px solid orange;
            }
        }
        span{
            a{
                text-decoration: none;
                color: #7f5606;
            }
        }
        @media only screen and (max-width: 600px){
        background-color: #ffffff16;
        backdrop-filter: none;
        border: 1px solid white;
    }
        }
    }
`

export default Register