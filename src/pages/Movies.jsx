import React from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import MovieList from "../components/MovieList";
import List from "../components/List";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background-color: #000;
`;
const Wrapper = styled.div`
  display: flex;
`;
const MovieBox = styled.div`
  position: relative;
`;

const Main = styled.div`
  flex: 10;
`;

const Movies = () => {
  return (
    <Container>
      <Wrapper>
        <Sidebar />
        <Main>
          <MovieBox>
            <Banner media_type="movie" />
          </MovieBox>
          <MovieList type="trending" media_type="movie" />
          <List media_type="movie" type="top_rated" />
          <List media_type="movie" type="popular" />
        </Main>
      </Wrapper>
    </Container>
  );
};

export default Movies;
