import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import axios from "axios";

const Container = styled.div`
  margin: 50px 0 0 50px;
`;
const Box = styled.div`
  color: #fff;
`;
const Title = styled.h1`
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 3px;
  margin: 15px 0;
`;

const MovieCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 25%);
  overflow-x: scroll;
  overflow-y: hidden;
  grid-column-gap: 50px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MovieList = ({ type, media_type }) => {
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(false);

  const key = "ab69c7f4e5150c9c2a8fce5f9ed40815";

  const url = `
  https://api.themoviedb.org/3/${type}/${media_type}/day?api_key=${key}&region=IN`;

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setTrending(res.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <Container>
      <Box>
        <Title>trending now</Title>
        {loading ? (
          "loading"
        ) : (
          <MovieCardBox>
            {trending?.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  poster={movie.poster_path}
                  height="600px"
                  movie_id={movie.id}
                  media_type={movie.media_type}
                />
              );
            })}
          </MovieCardBox>
        )}
      </Box>
    </Container>
  );
};

export default MovieList;
