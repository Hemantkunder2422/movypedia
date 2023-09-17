import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import CircularProgress from "@mui/material/CircularProgress";

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

const MainWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 60px;
`;
const MainLeft = styled.div``;
const MainRight = styled.div`
  flex: 2;
`;

const MovieThumbnailBox = styled.div`
  height: 550px;
  margin-left: 50px;
`;
const MovieThumbnail = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;
const Title = styled.h2`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  margin-top: 35px;
  font-size: 50px;
`;

const Desc = styled.p`
  color: #918f8f;
  width: 60%;
  margin-top: 21px;
`;

const GenreList = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

const Genre = styled.span`
  text-align: center;
  background-color: #000;
  color: #fff;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid;
`;

const MovieStats = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-top: 18px;
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
  color: #fff;
`;

const MovieMins = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #eee;
  order: 2;
`;
const ReleaseDate = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  order: 1;
`;

const TrailerTitle = styled.h2`
  color: #fff;
  margin: 50px 0 20px 50px;
  letter-spacing: 2px;
`;

const TrailerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 36px;
`;

const WatchOn = styled.div``;

const Watchtitle = styled.h2`
  margin-top: 30px;
  letter-spacing: 2px;
  font-weight: 500;
  font-size: 20px;
  color: #2097f3;
`;
const WatchOnWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 15px;
`;

const WatchOnCard = styled.div`
  height: 60px;
  width: 60px;
`;

const WatchonImg = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [trailerKey, setTrailerKey] = useState([]);
  const [watchProvider, setWatchProvider] = useState([
    "sVBEF7q7LqjHAWSnKwDbzmr2EMY.jpg",
  ]);
  const movie_id = useParams().id;

  const media_type = useParams().media;
  const [loading, setLoading] = useState(false);
  const [readmore, setReadmore] = useState(false);

  const key = "ab69c7f4e5150c9c2a8fce5f9ed40815";
  const url = `https://api.themoviedb.org/3/${media_type}/${movie_id}?api_key=${key}&language=en-US`;
  const trailer_url = `https://api.themoviedb.org/3/${media_type}/${movie_id}/videos?api_key=${key}&language=en-US`;
  const watchProviderUrl = `https://api.themoviedb.org/3/${media_type}/${movie_id}/watch/providers?api_key=${key}`;
  const trailerVideo = trailerKey.filter(
    (trailer) => trailer.type === "Trailer"
  );

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      setMovie(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTrailerData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(trailer_url);
      setTrailerKey(res.data.results);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchWatchProvider = async () => {
    try {
      const res = await axios.get(watchProviderUrl);
      setWatchProvider(res.data.results.US.flatrate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTrailerData();
    fetchWatchProvider();
  }, []);
  return (
    <Container>
      <Wrapper>
        <Sidebar />
        <Main>
          <MainWrapper>
            <MainLeft>
              <MovieThumbnailBox>
                <MovieThumbnail
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
              </MovieThumbnailBox>
            </MainLeft>
            <MainRight>
              <Title>
                {media_type === "movie" ? movie?.title : movie?.name}
              </Title>
              <MovieStats>
                <IMDBBox>
                  <IMDBIcon
                    src="https://i.ibb.co/fF1PVTd/imdb.png"
                    alt="imdb icon"
                  />
                  <IMDBRating>{movie?.vote_average?.toFixed(1)}</IMDBRating>
                </IMDBBox>
                <MovieMins>
                  {media_type === "movie"
                    ? movie?.runtime + " mins"
                    : movie?.number_of_seasons + " Season"}
                </MovieMins>
                <ReleaseDate>
                  {media_type === "movie"
                    ? movie?.release_date?.split("-")[0]
                    : movie?.first_air_date?.split("-")[0]}
                </ReleaseDate>
              </MovieStats>
              <Desc>{movie?.overview}</Desc>
              <GenreList>
                {movie?.genres?.map((genre) => {
                  return <Genre key={genre.id}>{genre.name}</Genre>;
                })}
              </GenreList>

              <WatchOn>
                {watchProvider ? (
                  <Watchtitle>Watch On</Watchtitle>
                ) : (
                  <Watchtitle style={{ fontSize: "15px", fontStyle: "italic" }}>
                    no watch providers available
                  </Watchtitle>
                )}
                <WatchOnWrapper>
                  {watchProvider?.map((provider) => {
                    return (
                      <WatchOnCard key={provider.provider_id}>
                        <WatchonImg
                          src={`https://image.tmdb.org/t/p/original/${
                            provider.logo_path
                              ? provider.logo_path
                              : "/q6tl6Ib6X5FT80RMlcDbexIo4St.jpg"
                          }`}
                        />
                      </WatchOnCard>
                    );
                  })}
                </WatchOnWrapper>
              </WatchOn>
            </MainRight>
          </MainWrapper>
          <TrailerTitle>Trailers </TrailerTitle>

          {loading ? (
            <CircularProgress color="success" />
          ) : (
            <TrailerWrapper>
              {trailerVideo.map((trailer) => {
                return (
                  <YouTube
                    videoId={trailer.key}
                    length={trailer.length}
                    key={trailer.key}
                    // opts={opts}
                    // style={{ width: "20%" }}
                  />
                );
              })}
            </TrailerWrapper>
          )}
        </Main>
      </Wrapper>
    </Container>
  );
};

export default Movie;
