import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import ListCard from "./ListCard";

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
const CardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 25%);
  overflow-x: scroll;
  overflow-y: hidden;
  grid-column-gap: 30px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const List = ({ media_type, type }) => {
  const [ListData, setListData] = useState([]);

  const key = "ab69c7f4e5150c9c2a8fce5f9ed40815";
  const url = `https://api.themoviedb.org/3/${media_type}/${type}?api_key=${key}&region=IN`;
  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      setListData(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Box>
        <Title>{media_type + " " + type}</Title>
        <CardBox>
          {ListData?.map((item) => {
            return (
              <ListCard
                key={item.key}
                image={item.poster_path}
                movie_id={item.id}
                media_type={media_type}
              />
            );
          })}
        </CardBox>
      </Box>
    </Container>
  );
};

export default List;
