import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import background from '../Assets/background.jpg'
import { useNavigate } from 'react-router-dom'
import api from '../API/axios'

const NewPortfolio = () => {
  const [currentuser,setCurrentuser]  = useState(undefined)
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('TechWiz-details')){
      setCurrentuser(JSON.parse(localStorage.getItem('TechWiz-details')))
      const user = JSON.parse(localStorage.getItem('TechWiz-details'))
      if(user.isAdmin){
        navigate('/admin')
      }
      else if(user.isPortfolio){
        navigate('/portfolio')
      }
    }
    else{
      navigate('/login')
    }
  },[])
  
  // overall main useStates
  const [personal,setPersonal] = useState(undefined)
  const [summary, setSummary] = useState('')
  const [education, setEducation] = useState([])
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [portfolio,setPortfolio] = useState(undefined)

  //handleing disabled states
  const [disableSch,setDisableSch] = useState(false)
  const [disableCol,setDisableCol] = useState(false)
  const [disableProj1,setDisableProj1] = useState(false)
  const [disableProj2,setDisableProj2] = useState(false)
  const [disableProj3,setDisableProj3] = useState(false)

  //personal info states
  const [name,setName] = useState('')
  const [official, setOfficial] =useState('')
  const [mail, setMail] = useState('')
  const [mobile,setMobile] = useState(null)

  //bio info states
  const [bio,setBio] = useState('')

  //school info useState
  const [school,setSchool] = useState('')
  const [sdegree,setSdegree] = useState('')
  const [sfield, setSfield] = useState('')
  const [sjyear,setSjyear] = useState(null)
  const [seyear,setSeyear] = useState(null)
  const [spercentage,setSpercentage] = useState(null)

  //college info states
  const [college,setCollege] = useState('')
  const [cdegree,setCdegree] = useState('')
  const [cfield, setCfield] = useState('')
  const [cjyear,setCjyear] = useState(null)
  const [ceyear,setCeyear] = useState(null)
  const [cpercentage,setCpercentage] = useState(null)

  //skills info states
  const [skill1, setSkill1] = useState('')
  const [skill2, setSkill2] = useState('')
  const [skill3, setSkill3] = useState('')
  const [skill4, setSkill4] = useState('')
  const [skill5, setSkill5] = useState('')

  //project1 info states
  const [title1,setTitle1] = useState('')
  const [description1,setDescription1] = useState('')
  const [domain1,setDomain1] = useState('')
  const [link1,setLink1]= useState('')
  const [git1,setGit1] = useState('')

  //project2 info states
  const [title2,setTitle2] = useState('')
  const [description2,setDescription2] = useState('')
  const [domain2,setDomain2] = useState('')
  const [link2,setLink2]= useState('')
  const [git2,setGit2] = useState('')

  //project3 info states
  const [title3,setTitle3] = useState('')
  const [description3,setDescription3] = useState('')
  const [domain3,setDomain3] = useState('')
  const [link3,setLink3]= useState('')
  const [git3,setGit3] = useState('')

  //handleing save changes
  
  //handle personal info
  const handlePersonal = (e)=>{
    e.preventDefault()
    const temp = {
      name: name,
      email : official,
      personalEmail: mail,
      mobile: mobile
    }
    setPersonal(temp)
  }

  //handle Summary
  const handleSummary = (e)=>{
    e.preventDefault()
    setSummary(bio)
  }
  
  //handling school section
  const handleSchool = (e)=>{
    setDisableSch(true)
    e.preventDefault()
    const temp = {
      school: school,
      degree: sdegree,
      field: sfield,
      startYear: sjyear,
      endYear: seyear,
      percentage: spercentage
    }
    setEducation([...education,temp])
    console.log(education)
  }
  //handle college ection
  const handleCollege= (e)=>{
    setDisableCol(true)
    e.preventDefault()
    const temp = {
      school: college,
      degree: cdegree,
      field: cfield,
      startYear: cjyear,
      endYear: ceyear,
      percentage: cpercentage
    }
    setEducation(education => [...education,temp])
    console.log(education)
  }

  //handling skills section
  const handleSkills = (e)=>{
    e.preventDefault()
    setSkills([skill1,skill2,skill3,skill4,skill5])
  }

  //handling project1 section
  const handelProject1 = (e)=>{
    setDisableProj1(true)
    e.preventDefault()
    const temp = {
      title: title1,
      description: description1,
      ProjectDomain: domain1,
      link: link1,
      github: git1
    }
    setProjects(projects => [...projects,temp])
  }

  //handling project2 section
  const handelProject2 = (e)=>{
    setDisableProj2(true)
    e.preventDefault()
    const temp = {
      title: title2,
      description: description2,
      ProjectDomain: domain2,
      link: link2,
      github: git2
    }
    setProjects(projects => [...projects,temp])
  }

  //handling project3 section
  const handelProject3 = (e)=>{
    setDisableProj3(true)
    e.preventDefault()
    const temp = {
      title: title3,
      description: description3,
      ProjectDomain: domain3,
      link: link3,
      github: git3
    }
    setProjects(projects => [...projects,temp])
  }

  //handling the form submition
  const handleFormSubmit = async(e)=>{
    e.preventDefault()
    setLoader(true)
    try {
      const temp = {
        userId:currentuser._id,
        personalInfo: personal,
        bio: summary,
        education: education,
        skills: skills,
        projects: projects
      }
      console.log(temp)
      setPortfolio(temp)
      const {data} = await api.post('/portfolio',temp)
      if(!data.status){
        setLoader(false)
        throw new Error(data.msg)
      }
      localStorage.setItem('TechWiz-details',JSON.stringify(data.user))
      setLoader(false)
      navigate('/portfolio')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container>
      {loader?(<div class="loader"></div>):(
      <form action="" onSubmit={handleFormSubmit}>
          <div className="personal">
            <div className="heading">
              <h1>Personal Information</h1>
            </div>
            <form action="">
            <label htmlFor="name">Name: </label>
            <input type="text" id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Full Name' /><br />
            <label htmlFor="offmail">Official mail: </label>
            <input type="email" id='offmail' value={official} onChange={(e)=>setOfficial(e.target.value)} placeholder='official@srmistedu.in'/><br />
            <label htmlFor="permail">Personal mail: </label>
            <input type="email" id='permail' value={mail} onChange={(e)=>setMail(e.target.value)} placeholder='xyz@gmail.com'/><br />
            <label htmlFor="mobile">Mobile Number: </label>
            <input type="number" id='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder='+91 0000000000'/><br />
            <button onClick={handlePersonal}>Save Changes</button>
            </form>
          </div>
          <div className="bio">
            <div className="heading">
              <h1>Your Summary</h1>
            </div>
            <form action="">
            <label htmlFor="bio">Summary: </label><br />
            <textarea  id="bio" cols="30" value={bio} onChange={(e)=>setBio(e.target.value)} rows="10"placeholder='Between  600 to 1800 characters' ></textarea><br />
            <button onClick={handleSummary} >Save Changes</button>
            </form>
          </div>
      <div className="education">
        <div className="heading">
          <h1>Educational Information</h1>
        </div>
            <div className="school">
              <div className="heading">
                <h2>Higher Secondary Information:</h2>
              </div>
              <form action="" disabled={disableSch}>
              <label htmlFor="schools">School/University: </label>
              <input type="text" name="" value={school} onChange={(e)=>setSchool(e.target.value)} id="schools" placeholder='your higher secondary school'/><br />
              <label htmlFor="sdegree">Degree: </label>
              <input type="text" name="" value={sdegree} onChange={(e)=>setSdegree(e.target.value)} id="sdegree" placeholder='Enter the degree' /><br />
              <label htmlFor="sfield">Field of Study: </label>
              <input type="text" value={sfield} onChange={(e)=>setSfield(e.target.value)} name="" id="sfield" placeholder='enter the field' /><br />
              <label htmlFor="syrs">Year of Joining: </label>
              <input type="text" name="" value={sjyear} onChange={(e)=>setSjyear(e.target.value)} id="syrs" placeholder='YYYY'/><br />
              <label htmlFor="syre">Year of Completion: </label>
              <input type="text" name="" value={seyear} onChange={(e)=>setSeyear(e.target.value)} id="syre" placeholder='YYYY'/><br />
              <label htmlFor="spercentage">Percentage: </label>
              <input type="number" value={spercentage} onChange={(e)=>setSpercentage(e.target.value)} max={100} placeholder='percentage' /><br />
              <button disabled={disableSch} onClick={handleSchool} >Save Changes</button>
              </form>
            </div>
            <div className="college">
              <div className="heading">
                <h2>UG Degree Information:</h2>
              </div>
              <form action="" disabled={disableCol}>
              <label htmlFor="colleges">School/University: </label>
              <input type="text" name="" value={college} onChange={(e)=>setCollege(e.target.value)} id="colleges" placeholder='Collage'/><br />
              <label htmlFor="cdegree">Degree: </label>
              <input type="text" name="" value={cdegree} onChange={(e)=>setCdegree(e.target.value)} id="cdegree" placeholder='Enter the degree' /><br />
              <label htmlFor="cfield">Field of Study: </label>
              <input type="text" name="" value={cfield} onChange={(e)=>setCfield(e.target.value)} id="cfield" placeholder='enter the field' /><br />
              <label htmlFor="cyrs">Year of Joining: </label>
              <input type="text" value={cjyear} onChange={(e)=>setCjyear(e.target.value)} name="" id="cyrs" placeholder='YYYY'/><br />
              <label htmlFor="cyre">Year of Graduation: </label>
              <input type="text" name="" value={ceyear} onChange={(e)=>setCeyear(e.target.value)} id="cyre" placeholder='YYYY'/><br />
              <label htmlFor="cpercentage">Percentage: </label>
              <input type="number" value={cpercentage} onChange={(e)=>setCpercentage(e.target.value)} id='cpercentage' max={100} placeholder='percentage' /><br />
              <button disabled={disableCol} onClick={handleCollege} >Save Changes</button>
              </form>
            </div>
      </div>
      <div className="skills">
        <div className="heading">
          <h1>Top 5 Skills</h1>
        </div>
        <form action="">
        <label htmlFor="skill1">Skill 1: </label>
        <input type="text" name="" value={skill1} onChange={(e)=>setSkill1(e.target.value)} id="skill1" /><br />
        <label htmlFor="skill2">Skill 2: </label>
        <input type="text" value={skill2} onChange={(e)=>setSkill2(e.target.value)} name="" id="skill2" /><br />
        <label htmlFor="skill3">Skill 3: </label>
        <input type="text" value={skill3} onChange={(e)=>setSkill3(e.target.value)} name="" id="skill3" /><br />
        <label htmlFor="skill4">Skill 4: </label>
        <input type="text" value={skill4} onChange={(e)=>setSkill4(e.target.value)} name="" id="skill4" /><br />
        <label htmlFor="skill5">Skill 5: </label>
        <input type="text" value={skill5} onChange={(e)=>setSkill5(e.target.value)} name="" id="skill5" /><br />
        <button onClick={handleSkills} >Save Changes</button>
        </form>
      </div>
      <div className="projects">
        <div className="heading">
          <h1>Top 3 Projects</h1>
        </div>
        <div className="project1">
          <div className="heading">
            <h2>Project 1:</h2>
          </div>
          <form action="" disabled={disableProj1}>
          <label htmlFor="title1">Project Title: </label>
          <input type="text" name="" value={title1} onChange={(e)=>setTitle1(e.target.value)} id="title1" /><br />
          <label htmlFor="description1">Project Description: </label><br />
          <textarea name="" id="description1" value={description1} onChange={(e)=>setDescription1(e.target.value)} cols="30" rows="10" placeholder='Between  600 to 1500 characters' ></textarea><br />
          <label htmlFor="domain1">Domain of the project: </label>
          <input type="text" name="" value={domain1} onChange={(e)=>setDomain1(e.target.value)} id="domain1" placeholder='ex: web development'  /><br />
          <label htmlFor="link1">Link to Project: </label>
          <input type="text" name="" value={link1} onChange={(e)=>setLink1(e.target.value)} id="link1" placeholder='place the hosted link if have' /><br />
          <label htmlFor="git1">GitHub Link: </label>
          <input type="text" value={git1} onChange={(e)=>setGit1(e.target.value)} name="" id="git1" placeholder='place the github link here' /><br />
          <button disabled={disableProj1} onClick={handelProject1} >Save Changes</button>
          </form>
        </div>
        <div className="project2">
          <div className="heading">
            <h2>Project 2:</h2>
          </div>
          <form action="" disabled={disableProj2}>
          <label htmlFor="title2">Project Title: </label>
          <input type="text" name="" value={title2} onChange={(e)=>setTitle2(e.target.value)} id="title2" /><br />
          <label htmlFor="description2">Project Description: </label><br />
          <textarea name="" value={description2} onChange={(e)=>setDescription2(e.target.value)} id="description2" cols="30" rows="10" placeholder='Between  600 to 1500 characters' ></textarea><br />
          <label htmlFor="domain2">Domain of the project: </label>
          <input type="text" value={domain2} onChange={(e)=>setDomain2(e.target.value)} name="" id="domain2" placeholder='ex: web development'  /><br />
          <label htmlFor="link2">Link to Project: </label>
          <input type="text" value={link2} onChange={(e)=>setLink2(e.target.value)} name="" id="link2" placeholder='place the hosted link if have' /><br />
          <label htmlFor="git2">GitHub Link: </label>
          <input type="text" value={git2} onChange={(e)=>setGit2(e.target.value)} name="" id="git2" placeholder='place the github link here' /><br />
          <button disabled={disableProj2} onClick={handelProject2} >Save Changes</button>
          </form>
        </div>
        <div className="project3">
          <div className="heading">
            <h2>Project 3:</h2>
          </div>
          <form action="" disabled={disableProj3}>
          <label htmlFor="title3">Project Title: </label>
          <input type="text" value={title3} onChange={(e)=>setTitle3(e.target.value)} name="" id="title3" /><br />
          <label htmlFor="description3">Project Description: </label><br />
          <textarea name="" value={description3} onChange={(e)=>setDescription3(e.target.value)} id="description3" cols="30" rows="10" placeholder='Between  600 to 1500 characters' ></textarea><br />
          <label htmlFor="domain3">Domain of the project: </label>
          <input type="text" value={domain3} onChange={(e)=>setDomain3(e.target.value)} name="" id="domain3" placeholder='ex: web development'  /><br />
          <label htmlFor="link3">Link to Project: </label>
          <input type="text" value={link3} onChange={(e)=>setLink3(e.target.value)} name="" id="link3" placeholder='place the hosted link if have' /><br />
          <label htmlFor="git3">GitHub Link: </label>
          <input type="text" value={git3} onChange={(e)=>setGit3(e.target.value)} name="" id="git3" placeholder='place the github link here' /><br />
          <button disabled={disableProj3} onClick={handelProject3} >Save Changes</button>
          </form>
        </div>
      </div>
      <div>
        <button type='submit'>Submit Here</button>
      </div>
      </form>)}
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
  overflow-x: hidden;
  color: white;
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
  form{
    width:100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    div{
      width: 100%;
      button{
              background-color: green;
              border: 1px solid #ffffff57;
              border-radius: 8px;
              padding: 8px 16px;
              color: white;
              box-shadow: 2px 2px 10px #ffffff57;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover{
                background-color: red;
              }
      }
      .heading{
        h1{
          border-top: 1px solid white;
          width: 100%;
          text-align: center;
        }
      }
      form{
        width:fit-content;
        input{
        background-color: black;
        padding: 0.3rem;
        border-radius: 4px;
        border: 1px solid white;
        outline: none;
        color: white;
      }
      textarea{
        color: white;
      }
      button{
              background-color: purple;
              border: 1px solid #ffffff57;
              border-radius: 8px;
              padding: 4px 8px;
              color: white;
              box-shadow: 2px 2px 10px #ffffff57;
              display: flex;
              align-items: center;
              justify-content: center;
              &:hover{
                background-color: #5e015e;
              }
              &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
              }
            }
      textarea{
        background-color: black;
      }
      }
    }
  }
`

export default NewPortfolio