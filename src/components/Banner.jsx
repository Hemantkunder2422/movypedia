import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import "../App.css";
import { Link } from "react-router-dom";

const Box = styled.div`
  color: #fff;
  min-height: 650px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const BoxWrapper = styled.div`
  max-width: 40%;
  padding-left: 5%;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  letter-spacing: 2px;
`;
const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;
  justify-content: space-between;
`;

const ReviewText = styled.span`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-weight: 400;
  text-transform: capitalize;
`;
const AgeCert = styled.div`
  border: 3px solid #fff;
  padding: 5px;
`;

const Desc = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 200;
  margin-top: 15px;
`;

const HeroBtn = styled.a`
  color: #fff;
  padding: 15px;
  background-color: #202123;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 30%;
  margin-top: 50px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
  }
`;

const IMDBBox = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;
const IMDBIcon = styled.img`
  width: 25%;
`;
const IMDBRating = styled.h3`
  font-weight: 400;
  font-size: 16px;
`;

const ReadmoreButton = styled.button`
  color: #fff;
  background-color: #272323;
  border: none;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
`;

const Banner = ({ media_type }) => {
  const [BannerData, setBannerData] = useState({});
  const [readmore, setReadmore] = useState(false);

  const key = "ab69c7f4e5150c9c2a8fce5f9ed40815";

  const url = `
  https://api.themoviedb.org/3/trending/${media_type}/day?api_key=${key}&region=IN`;

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const movies = res.data.results;
      const movieIndex = Math.floor(Math.random() * movies.length) + 1;
      setBannerData(movies[movieIndex]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {BannerData && (
        <Box
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)),url(https://image.tmdb.org/t/p/original/${BannerData?.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            minHeight: "100dvh",
          }}
        >
          <BoxWrapper>
            <Title>
              {BannerData.title ||
                BannerData.original_title ||
                BannerData.original_name}
            </Title>

            <ReviewBox>
              <IMDBBox>
                <IMDBIcon src="https://i.ibb.co/fF1PVTd/imdb.png" alt="imdb" />
                <IMDBRating>
                  {BannerData.vote_average?.toFixed(1) || "not available"}
                </IMDBRating>
              </IMDBBox>
              <ReviewText>
                {BannerData.release_date?.split("-")[0] ||
                  BannerData.first_air_date?.split("-")[0]}
              </ReviewText>
              <ReviewText>{BannerData.media_type}</ReviewText>
              <AgeCert>
                <ReviewText color="#fff">
                  {BannerData.adult ? "A 18+" : "UA"}
                </ReviewText>
              </AgeCert>
            </ReviewBox>
            <Desc>
              {readmore
                ? BannerData.overview
                : `${BannerData?.overview?.substring(0, 150)}...`}
              <ReadmoreButton onClick={() => setReadmore(!readmore)}>
                {readmore ? "show less" : "show more"}
              </ReadmoreButton>
            </Desc>
            <Link
              to={
                BannerData.id
                  ? `/${BannerData.media_type}/${BannerData.id}`
                  : ""
              }
              style={{ textDecoration: "none" }}
            >
              <HeroBtn>
                <InfoOutlinedIcon />
                Info
              </HeroBtn>
            </Link>
          </BoxWrapper>
        </Box>
      )}
    </>
  );
};

export default Banner;
