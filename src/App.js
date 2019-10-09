import React, { useState } from "react";
import "./App.css";
import TeamMembers from "./TeamMembers";
import Form from "./Form";

const initialTeamMembers = [
  {
    id: 1,
    name: "Amy",
    email: "amy@email.com",
    role: "UI/UX Designer"
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@email.com",
    role: "Marketer"
  },
  {
    id: 3,
    name: "Chris",
    email: "chris@email.com",
    role: "Front-End Developer"
  }
];

function App() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const addTeamMember = teamMember => {
    const { name, email, role } = teamMember;

    const newTeamMember = {
      id: Date.now(),
      name,
      email,
      role
    };

    setTeamMembers([...teamMembers, newTeamMember]);
  };

  return (
    <div className="App">
      <h1>Team Builder</h1>

      <div className="container">
        <TeamMembers teamMembers={teamMembers} />
        <Form addTeamMember={addTeamMember} />
      </div>
    </div>
  );
}

export default App;
