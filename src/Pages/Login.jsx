import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'

const Login = () => {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(false)

    useEffect(()=>{
        var user = JSON.parse(localStorage.getItem('TechWiz-details'))
        if(user){
            if(user.isAdmin){
                navigate('/admin')
            }
            else{
                navigate('/newportfolio')
            }
        }
    },[])
    const [values,setValues] = useState({
        email:"",
        password:""
    })
    const handleChange =(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
    }
    const handleValidation =()=>{
        const {email,password} = values
        if(email === ""){
            alert("username is required")
            return false
        }
        else if(password === ""){
            alert("password is required")
            return false
        }
        return true
    }
    const handleSubmit =async(e)=>{
        setLoader(true)
        e.preventDefault()
        if(handleValidation()){
            try {
                const {email,password} = values
                const userData = {email,password}
                const {data} = await api.post('/auth/login',userData)
                if(data.status === false){
                    setLoader(false)
                    alert(data.msg)
                    console.log(data)
                }
                if(data.status === true){
                  localStorage.setItem('TechWiz-details',JSON.stringify(data.user))
                    setLoader(false)
                    if(data.user.isAdmin){
                        navigate('/admin')
                    }
                    else{
                        navigate('/newportfolio')
                    }
                }
            } catch (error) {
                alert(error.message)
                setLoader(false)
            }
            
        }
    }
  return (
    <>
    <Container>
    <Link to={'/'}><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left-circle"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 8 12 12 16"></polyline><line x1="16" y1="12" x2="8" y2="12"></line></svg></Link>
        <form onSubmit={e=>handleSubmit(e)}>
        {loader?(<div class="loader"></div>):(
            <div className="cont">
            <div className="brand">
                <h1 style={{color:'white'}}>Member Sign In</h1>
            </div>
            <input type='email' placeholder='E-Mail' name='email' onChange={e=>handleChange(e)} />
            <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)} />
            <button type='submit' className='submit'>Sign In</button>
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
    a{
        position: absolute;
        top:2rem;
        left: 2rem;
        color: white;
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

export default Login