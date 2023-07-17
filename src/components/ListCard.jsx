import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  cursor: pointer;
  border: 5px solid #666;
  &:hover {
    border: 5px solid #2097f3;
    transition: 0.2s ease-in-out;
  }
`;
const CardImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ListCard = ({ image, movie_id, media_type }) => {
  return (
    <Link to={movie_id ? `/${media_type}/${movie_id}` : ""}>
      <Card>
        <CardImg src={`https://image.tmdb.org/t/p/original/${image}`} />
      </Card>
    </Link>
  );
};

export default ListCard;
