import React, { useState, useEffect } from "react";
import "./styles.css"

import {Card} from '../Components/Card/index';

export function Home() {

  const [studentName,setStudentName] = useState();
  const [students, setStudent] = useState([]);
  const [user, setUser] = useState({name:'', avatar:''});

  useEffect(() => {

    async function fetchData(){
      const response = await fetch('https://api.github.com/users/eudescpereira')
      const data = await response.json();

      console.log("DADOS: ",data);
      setUser({
        name: data.name,
        avatar: data.avatar_url
      });
    }

    fetchData();
    console.log('useEffect foi chamado!')
  },[])

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('en', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudent(prevState => [...prevState, newStudent])
  }

  return (
    <div className="container" >

      <header>
        <h1>Presence List</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile Picture" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Type the name..." 
        onChange={(e) => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>Add</button>

      {
        students.map(student => 
        <Card 
          key={student.time}
          name={student.name} 
          time={student.time} 
        />)
      }
      
    </div>
  );
}