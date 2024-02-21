import React from 'react'
import styled from 'styled-components'
import event1 from '../Assets/events/event1.png'
import event2 from '../Assets/events/event2.png'
import event3 from '../Assets/events/event3.png'
import event4 from '../Assets/events/event4.png'
import event5 from '../Assets/events/event5.png'
import event6 from '../Assets/events/event6.png'
import event7 from '../Assets/events/event7.png'
import event8 from '../Assets/events/event8.png'

const Event = () => {
  return (
    <EventContainer>
        <ul>
        <li>
                <div className="event">
                    <div className="image">
                        <img src={event8} alt="" />
                    </div>
                    <div className="title">
                        <h3>DAO</h3>
                    </div>
                    <div className="details">
                        <p>"Embracing Decentralization: Together We Build the Future with DAOs!" 🚀🌍</p>
                        <p style={{color: "#af4b5c"}}>Date & Time:20 October & 12:00PM - 2:00PM (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event7} alt="" />
                    </div>
                    <div className="title">
                        <h3>PAIR-A-THON</h3>
                    </div>
                    <div className="details">
                    <p>A mini hackathon using the concept of Pair Programming organised by Techwiz club</p>
                        <p style={{color: "#af4b5c"}}>Date & Time:21st April & 12:00PM - 2:00PM (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event6} alt="" />
                    </div>
                    <div className="title">
                        <h3>Metaverse</h3>
                    </div>
                    <div className="details">
                    <p>A glimpse into the limitless possibilities of the metaverse at our event! We gave a clear understanding of #blockchain & #NFTs with simple live examples....</p>
                        <p style={{color: "#af4b5c"}}>Date & Time: 14.03.2021, 4.00Pm-5.30Pm (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event5} alt="" />
                    </div>
                    <div className="title">
                        <h3>Artificial Intelligence Part - 1</h3>
                    </div>
                    <div className="details">
                        <p>Online WORKSHOP on "Artificial Intelligence in Farming" organised by Techwiz club</p>
                        <p style={{color: "#af4b5c"}}>Date and Time: 28th September 2022 at 4:00 pm (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event4} alt="" />
                    </div>
                    <div className="title">
                        <h3>Building An API</h3>
                    </div>
                    <div className="details">
                        <p>Online WORKSHOP on "Building An API" organised by Techwiz club</p>
                        <p style={{color: "#af4b5c"}}> Date and Time: 10th March 2022 at 4:00 pm (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event3} alt="" />
                    </div>
                    <div className="title">
                        <h3>IGNITE'22</h3>
                    </div>
                    <div className="details">
                        <p>Online WORKSHOP on "Machine Learning" organised by Techwiz club</p>
                        <p style={{color: "#af4b5c"}}>Date & Time: 11.03.2022 & 5.00Pm-6.00Pm (IST)</p>
                    </div>
                </div>
            </li>
            <li>
                <div className="event">
                    <div className="image">
                        <img src={event1} alt="" />
                    </div>
                    <div className="title">
                        <h3>IGNITE'21</h3>
                    </div>
                    <div className="details">
                        <p>Online WORKSHOP on "3D MODELING" organised by Techwiz club</p>
                        <p style={{color: "#af4b5c"}}>Date & Time: 18.05.2021, 4.00Pm-5.30Pm (IST)</p>
                    </div>
                </div>
            </li>
            
        </ul>
    </EventContainer>
  )
}

const EventContainer = styled.div`
    ul{
        width: 100%;
        padding: 0;
        margin: 0;
        list-style-type: none;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        li{
            margin: 1rem;
            .event{
                width: 280px;
                height: 180px;
                border: 3px solid #ffffff57;
                background-color: #570857;
                overflow: hidden;
                color:white;
                border-radius: 0.5rem;
                transition: all ease-in;
                &:hover{
                    backdrop-filter: blur(2px);
                    background-color: #ffffff2e;
                    .image{
                        display: none;
                    }
                }
                .image{
                    width: 100%;
                    height:85%;
                    img{
                        width:100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    
                }
                .title{
                    width:100%;
                    height:15%;
                    h3{
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                }
                .details{
                    width: 100%;
                    height:85%;
                    margin-top: 20px;
                    font-size: small;
                    p{
                        margin: 0;
                        padding: 0;
                        text-align: center;
                    }
                }
                @media only screen and (max-width: 600px){
                    width: 150px;
                    height: 100px;
                    border: 2px solid white;
                    .image{
                        height: 80%;
                    }
                    .title{
                        height: 20%;
                        h3{
                            font-size: small;
                        }
                    }
                    .details{
                        height: 80%;
                    }
                }
            }
        }
    }
`

export default Event