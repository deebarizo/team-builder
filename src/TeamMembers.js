import React from "react";

const TeamMembers = props => {
  const { teamMembers } = props;

  return (
    <div className="team-member-list">
      {teamMembers.map(teamMember => {
        return (
          <div className="team-member" key={teamMember.id}>
            <h2>{teamMember.name}</h2>
            <p>
              <strong>Email:</strong> {teamMember.email}
            </p>
            <p>
              <strong>Role:</strong> {teamMember.role}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default TeamMembers;
