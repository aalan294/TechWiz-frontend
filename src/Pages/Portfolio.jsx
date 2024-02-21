import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'
import profile from '../Assets/profileImage.jpg'


const Portfolio = () => {

  const [currentuser,setCurrentuser]  = useState(undefined)
  const [loader,setLoader] = useState(true)
  const [portfolio,setPortfolio] = useState(undefined)
  const [isChecked, setIsChecked] = useState(false)
  const [rel,setRel] = useState(true)
  const navigate = useNavigate()


  useEffect(()=>{
    if(localStorage.getItem('TechWiz-details')){
      setCurrentuser(JSON.parse(localStorage.getItem('TechWiz-details')))
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
  useEffect(()=>{
    const fetchPortfolio = async(req,res)=>{
      try {
        if(localStorage.getItem('TechWiz-details')){
          const user = JSON.parse(localStorage.getItem('TechWiz-details'))
          const {data} = await api.get(`/portfolio/${user._id}`)
          if(!data.status){
            throw new Error(data.msg)
          }
          setPortfolio(data.data)
          setLoader(false)
        }
        else{
          navigate('/login')
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchPortfolio()
  },[])

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
            <Link to={'/groupchat'}  ><li>GroupChat</li></Link>
            <Link><li onClick={handleLogOut} >Log Out</li></Link>
          </ul>
        </div>
      {loader?(<div class="loader"></div>):(
        <div className="portfolio">
        <div className="profile">
          <div className="image">
            <img src={profile} alt="" />
          </div>
          <h2>{portfolio.personalInfo.name}</h2>
          <p>{portfolio.personalInfo.email}</p>
          <p>{portfolio.personalInfo.personalEmail}</p>
          <p>{portfolio.personalInfo.mobile}</p>
        </div>
        <div className="bio">
          <h3>Bio</h3>
          <p>{portfolio.bio}</p>
        </div>
        <div className="education">
          <h3>Education</h3>
          {portfolio.education.map(({ school, degree, field, startYear, endYear, percentage }) => (
            <div key={school} className="education-item">
              <h4>{school}</h4>
              <p>{degree}</p>
              <p>{field}</p>
              <p>{`${startYear} - ${endYear}`}</p>
              <p>{percentage}%</p>
            </div>
          ))}
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <ul>
            {portfolio.skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="projects">
          <h3>Projects</h3>
          {portfolio.projects.map(({ title, description, link}) => (
            <div key={title} className="project-item">
              <h4>{title}</h4>
              <p>{description}</p>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Visit Project
              </a>
            </div>
          ))}
        </div>
      </div>
      )}
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
  overflow-y: scroll;
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
        .portfolio {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 20px;
            padding: 20px;
            .profile{
              .image{
                width: 200px;
                height: 200px;
                margin: 0 auto;
                border-radius: 50%;
                border: 1px solid white;
                img{
                  border-radius: 50%;
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
            }
            .profile.bio,.education,.skills,.projects{
              h2{
                color: #8e44ad;
              }
              h3{
                color: white;
              }
              p{
                color: #ddd;
              }
              a{
                color: #8e44ad;
              }
            }
            .profile,.bio,.education,.skills,.projects {
              padding: 20px;
              border: 2px solid #ffffff57;
              backdrop-filter: blur(2px);
              border-radius: 10px;
              color: white;
              @media only screen and (max-width: 600px){
                  background-color: #ffffff16;
                  backdrop-filter: none;
                  border: 1px solid white;
              }
            }
            .skills{
              ul {
                list-style-type: none;
                padding: 0;
                li {
                  margin-bottom: 10px;
                  color: red;
                }
              }
            }
            .education{
              .education-item{
                  margin-bottom: 20px;
                  h4{
                    color: #8e44ad;
                  }
                }
            }
            .projects{
              .project-item {
                margin-bottom: 20px;
                h4{
                  color: #ddd;
                }
              }
            }
        }
`

export default Portfolio