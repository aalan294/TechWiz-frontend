import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import api from '../API/axios'
import background from '../Assets/background.jpg'
import profile from '../Assets/profileImage.jpg'


const Portfolio = ({selectedUser,setSelectedUser}) => {

  const [loader,setLoader] = useState(false)
  const [portfolio,setPortfolio] = useState(undefined)

  useEffect(()=>{
    const fetchPortfolio = async()=>{
      try {
        if(selectedUser !== undefined){
            setLoader(true)
          const {data} = await api.get(`/portfolio/${selectedUser._id}`)
          if(!data.status){
            setLoader(false)
            throw new Error(data.msg)
          }
          setPortfolio(data.data)
          setLoader(false)
        }
      } catch (error) {
        alert(error.message)
      }
    }
    fetchPortfolio()
  },[selectedUser])



  return (
    <Container>
      {loader?(<div class="loader"></div>):(
        <div className="div">
        {portfolio===undefined?(<div class="notselected"><h1 >Select a Member To see Their Portfolio</h1></div>):(
            <div className="portfolio">
        <div className="profile">
        <svg onClick={()=>setSelectedUser(undefined)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
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
  background-size: cover;
  background-position: center;
  height: 100%;
  background-attachment: fixed;
  overflow-y: scroll;
  border-left: 1px solid white;
  border-radius: 1rem;
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
        .div{
            width: 100%;
            height: 100%;
            .notselected{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                h1{
                    color:purple;
                    text-align: center;
                    font-style: italic;
                }
            }
            .portfolio {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            grid-gap: 20px;
            padding: 20px;           
            backdrop-filter: blur(6px);
            border-radius: 1rem;
            .profile{
              svg{
                position: absolute;
                display: none;
                @media only screen and (max-width: 600px){
                  display: flex;
                }
              }
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
                margin: 0;
                li {
                  padding: 0;
                  margin: 0;
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
        }
`

export default Portfolio