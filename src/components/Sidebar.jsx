import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, Outlet, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  border-right: 1px solid rgb(44 43 43);
  padding: 0 20px;
  position: sticky;
  height: 100vh;
  top: 0;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 60px;
`;

const Icon = styled.div`
  color: "#989595";
  text-align: center;
  cursor: pointer;
  transition: all 0.3 ease-in;
  color: ${(props) => (props.active ? "#2097f3" : "#989595")};

  &:hover {
    color: #2097f3 !important;
  }
`;

const ModalSearchBox = styled.div`
  background-color: #1a1a1a;
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding: 30px;
  overflow-y: auto;
`;

const SearchBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  color: #fff;
  &::placeholder {
    color: #9f9e9e;
  }
  &:focus {
    border-color: #2097f3;
  }
  background-color: transparent;
  border: 0.5px solid #2097f3;
  border-radius: 25px;
`;

const SearchResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin: 30px 0;
`;

const MovieCard = styled.div`
  min-height: 300px;
`;
const MoviePoster = styled.img`
  height: 100%;
  width: 100%;
`;

const Sidebar = ({ path }) => {
  const location = useLocation().pathname;
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const apiKey = "ab69c7f4e5150c9c2a8fce5f9ed40815";
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`;

  const fetchSearchedMovie = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setMovies(res.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleMovieSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  useEffect(() => {
    fetchSearchedMovie();
  }, [query]);

  // https://image.tmdb.org/t/p/original/${movie.poster_path}

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "#989595" }}>
          <Icon path="home" active={location === "/"}>
            <HomeOutlinedIcon style={{ fontSize: "35px" }} />
          </Icon>
        </Link>
        <Link to="/movies" style={{ textDecoration: "none", color: "#989595" }}>
          <Icon path="movie" active={location === "/movies"}>
            <MovieCreationOutlinedIcon style={{ fontSize: "35px" }} />
          </Icon>
        </Link>
        <Link to="/tv" style={{ textDecoration: "none", color: "#989595" }}>
          <Icon path="tv" active={location === "/tv"}>
            <LiveTvOutlinedIcon style={{ fontSize: "35px" }} />
          </Icon>
        </Link>
        <Link
          to=""
          style={{ textDecoration: "none", color: "#989595" }}
          onClick={handleModalOpen}
        >
          <Icon style={{ textDecoration: "none", color: "#989595" }}>
            <SearchOutlinedIcon style={{ fontSize: "35px" }} />
          </Icon>
        </Link>
      </Wrapper>
      <Outlet />
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalSearchBox>
          <SearchBox>
            <SearchInput
              placeholder="Search Movies...."
              focus
              value={query}
              onChange={handleMovieSearch}
            />
          </SearchBox>
          <SearchResultsContainer>
            {movies?.map((movie) => {
              const { id, poster_path, media_type, title } = movie;
              return (
                <Link to={id ? `/${media_type}/${id}` : ""}>
                  <MovieCard style={{ color: "#fff" }}>
                    {loading ? (
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={300}
                      />
                    ) : (
                      <MoviePoster
                        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                        alt={title}
                      />
                    )}
                  </MovieCard>
                </Link>
              );
            })}
          </SearchResultsContainer>
        </ModalSearchBox>
      </Modal>
    </Container>
  );
};

export default Sidebar;
