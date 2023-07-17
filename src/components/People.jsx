import React, { useState } from "react";
import styled from "styled-components";

const Avatar = styled.div`
  height: 300px;
  position: relative;
  cursor: pointer;
`;
const AvatarImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  color: #fff;
`;

const InfoBox = styled.div`
  backdrop-filter: blur(10px);
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  transition: all 0.5s ease-in-out 0s;
  border-radius: 50%;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Name = styled.h5`
  color: #fff;
  font-size: 20px;
  letter-spacing: 3px;
  text-align: center;
`;
const Role = styled.h6`
  color: #fff;
  letter-spacing: 2px;
  text-align: center;
`;

const People = ({ person }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Avatar
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <AvatarImg
        src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
      />
      <InfoBox style={{ display: `${isHover ? "block" : "none"}` }}>
        <Info>
          <Name>{person.name}</Name>
          <Role>{person.known_for_department}</Role>
        </Info>
      </InfoBox>
    </Avatar>
  );
};

export default People;
