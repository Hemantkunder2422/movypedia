import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  cursor: pointer;
  /* border: 5px solid #fff; */
  &:hover {
    /* border: 5px solid #2097f3; */
    transition: 0.2s ease-in;
    transform: scale(1.05);
    z-index: 1;
  }
`;

const CardImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  &:hover {
    transition: 0.2s ease-in;
  }
`;
const MovieCard = ({ poster, height, movie_id, media_type }) => {
  return (
    <Link to={movie_id ? `/${media_type}/${movie_id}` : ""}>
      <Card style={{ height: `${height}` }}>
        <CardImg
          src={
            poster
              ? `https://image.tmdb.org/t/p/original/${poster}`
              : "https://image.tmdb.org/t/p/original/bT3IpP7OopgiVuy6HCPOWLuaFAd.jpg"
          }
        />
      </Card>
    </Link>
  );
};

export default MovieCard;
