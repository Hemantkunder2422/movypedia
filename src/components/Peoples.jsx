import React, { useState, useEffect } from "react";
import styled from "styled-components";
import People from "./People";
import axios from "axios";

const Container = styled.div`
  margin: 50px 0 0 50px;
`;
const Box = styled.div`
  color: #fff;
`;
const PeopleBox = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 20%);
  overflow-x: scroll;
  overflow-y: hidden;
  grid-column-gap: 30px;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Title = styled.h1`
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 3px;
  margin: 15px 0;
`;

const Peoples = () => {
  const [peoples, setPeoples] = useState([]);
  const key = "ab69c7f4e5150c9c2a8fce5f9ed40815";
  const url = `https://api.themoviedb.org/3/person/popular?api_key=${key}&language=en-US`;

  const fetchData = async () => {
    const res = await axios.get(url);
    setPeoples(res.data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Box>
        <Title>Trending Stars</Title>
        <PeopleBox>
          {peoples?.map((person) => {
            return <People key={person.id} person={person} />;
          })}
        </PeopleBox>
      </Box>
    </Container>
  );
};

export default Peoples;
