import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../Assets/01_MAIN_Logo_Dark.png'
import background from '../Assets/background.jpg'
import Event from '../Components/Event'
import { Link } from 'react-router-dom'

const Home = () => {

  
  const [isChecked, setIsChecked] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <Container>
      <nav>
      <div className="mnav">
          <div className="svg">
            <input type='checkbox' checked={isChecked} onChange={()=>setIsChecked(!isChecked)} name="" id="check" />
            <label htmlFor="check">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </label>
          </div>
          <ul className={`menu ${isChecked?'show':'hide'}`}>
          <a onClick={() => scrollToSection('home')}><label htmlFor='check'><li>Home</li></label></a>
            <a onClick={() => scrollToSection('events')}><label htmlFor='check'><li>Events</li></label></a>
            <a onClick={() => scrollToSection('about')}><label htmlFor='check'><li>About</li></label></a>
            <Link to={'/login'}><label><li>Sign In</li></label></Link>
          </ul>
        </div>
        <div className="logo">
          <h1>TechWiz</h1>
        </div>
        <div className="nav">
          <ul>
            <li><a onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a onClick={() => scrollToSection('events')}>Events</a></li>
            <li><a onClick={() => scrollToSection('about')}>About</a></li>
            <li><Link to={'/login'}><button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> SignIn</button></Link></li>
          </ul>
        </div>
      </nav>
      <div className="container" id='home'>
        <div className="card">
            <h1>TechWiz Club</h1>
          <div className="div">
              <img src={logo} alt="" />
              <div className="text">
                <h2>Think Tech. Think Wizard!</h2>
                <h2>GET ! SET ! CODE !</h2>
              </div>
          </div>
        </div>
      </div>
      <div className="events" id='events'>
        <div className="heading">
            <h1>EVENTS</h1>
        </div>
          <Event/>
      </div>
      <div className="about" id='about'>
        <div className="heading">
            <h1>ABOUT US</h1>
        </div>
        <div className="det">
          <p>"Welcome to TechWiz Club, the preeminent technical community thriving within the vibrant campus of SRM Institute of Science and Technology, Ramapuram, Chennai. With a rich legacy of innovation and a steadfast commitment to excellence, TechWiz stands as a beacon of inspiration for students passionate about technology. Our club serves as a dynamic hub where aspiring engineers, developers, and tech aficionados converge to embark on a transformative journey of learning and exploration. Through a diverse array of activities, workshops, and events, we provide our members with unparalleled opportunities to delve into cutting-edge technologies, hone their skills, and realize their creative potential. From coding competitions to hackathons, from industry-led seminars to collaborative projects, TechWiz offers a stimulating environment where ingenuity thrives and ideas flourish. Join us as we continue to push the boundaries of innovation, empower the next generation of tech leaders, and leave an indelible mark on the ever-evolving landscape of technology. Together, let's embark on a remarkable odyssey of discovery, growth, and technological prowess!"</p>
        </div>
      </div>
      <footer>
      <p>&copy; 2024 TechWiz Club. All rights reserved.</p>
      <p>Designed and Developed by Aalan sason singarayan</p>
      </footer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  background-color: black;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  height: 100vh;
  background-attachment: fixed;
  overflow-y: scroll;
  &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: #ffffff58;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
  nav{
    .mnav{
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: none;
      flex-direction: column;
      align-items: end;
      z-index: 99;
      @media only screen and (max-width: 600px){
        display: flex;
      }
      .svg{
        input{
          display: none;
        }
        label{
          padding:0.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
          border-radius: 0.3rem;
          border: 1px solid white;
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
          label{
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
        }
        .hide{
          display: none;
        }
    }
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border-bottom: 1px solid #ffffff57;
    position: sticky;
    top: 0;
    z-index: 99;
    .logo{
      margin-left: 2rem;
      cursor: pointer;
    }
    .nav{
      @media only screen and (max-width: 600px){
        display: none;
      }
      ul{
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
        align-items: center;
        li{
          cursor: pointer;
          margin-right: 3rem;
          a{
            color: inherit;
            text-decoration: none;
            button{
              background-color: purple;
              border: 1px solid #ffffff57;
              border-radius: 8px;
              padding: 4px 8px;
              color: white;
              box-shadow: 2px 2px 10px #ffffff57;
              display: flex;
              align-items: center;
              justify-content: space-between;
              &:hover{
                background-color: #5e015e;
              }
            }
          }
        }
      }
    }
  }
  .container{
    width: 100%;
    height: 87vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    .card{
      width: 45%;
      padding: 1rem;
      border: 2px solid #ffffff57;
      backdrop-filter: blur(2px);
      border-radius: 1.5rem;
      h1{
        text-align: center;
        padding: 0;
        margin: 0;
      }
      .div{
        display: flex;
        justify-content: center;
        gap:2rem;
        align-items: center;
        img{
          width: 280px;
          height: 280px;
        }
        .text{
          display: flex;
          flex-direction: column;
          align-items: center;
          h2{
            font-weight: 300;
          }
        }
      }
      @media only screen and (max-width: 1300px){
          .div{
            img{
              width: 200px;
              height: 200px;
            }
          }
      }
      @media only screen and (max-width: 1100px){
          .div{
            img{
              width: 170px;
              height: 170px;
            }
          }
      }
      @media only screen and (max-width: 600px){
        background-color: #ffffff16;
        backdrop-filter: none;
        border: 1px solid white;
        width: 90%;
        height: 50%;
          .div{
            height: 100%;
            width:100%;
            margin-top: 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
              width: 120px;
              height: 120px;
            }
          }
      }
    }
  }
  .events{ 
  .heading{
        width: 100%;
        color: white;
        display: flex;
        justify-content: center;
        h1{
            width:fit-content;
            border-bottom: 4px solid purple;
            padding: 0 0.5rem;
        }
    }
  }
  .about{
    width: 100%;
    height:100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    .heading{
      margin-top: 4rem;
        width: 100%;
        color: white;
        display: flex;
        justify-content: center;
        h1{
            width:fit-content;
            border-bottom: 4px solid purple;
            padding: 0 0.5rem;
        }
    }
    .det{
      margin-top: 5rem;
      width: 75%;
      padding: 1rem;
      height: auto;
      backdrop-filter: blur(2px);
      color: white;
      border-radius: 1rem;
      border: 2px solid white;
      font-size: larger;
      p{
        text-align: center;
      }
    }
    @media only screen and (max-width: 600px){
      .det{
          background-color: #ffffff16;
          backdrop-filter: none;
        p{
          font-size: small;
        }
      }
    }
  }
  footer{
    width:100%;
    display: flex;
    justify-content: space-between;
    background-color: #302e2e;
    color:white;
    p{
      margin: 1rem;
    }
    @media only screen and (max-width: 600px){
      flex-wrap: wrap;
      justify-content: center;
      p{
        margin: 2px;
      }
    }
  }

`

export default Home