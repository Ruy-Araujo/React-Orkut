import React from 'react'
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

const ProfileRelationsBox = (props) => (
  <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
    <ul>
      {props.items.slice(0,6).map((i) => {
        return (
          <li key={i.id} className="ProfileRelationsBox">
            <a href={`/${props.type}/${i.id}`}>
              <img src={i.imageUrl} />
              <span>{i.title}</span>
            </a>
          </li>
        );
      })}
    </ul>
  </ProfileRelationsBoxWrapper>
);

  export default ProfileRelationsBox;