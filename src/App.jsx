import React from "react";
import Home from "./pages/Home";
import "./App.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import Stars from "./pages/Stars";

const Container = styled.div`
  background-color: #000;
  height: 100vh;
`;

export const PathContext = React.createContext();

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/:media/:id" index element={<Movie />} />
        <Route path="/movies" index element={<Movies />} />
        <Route path="/tv" index element={<Tv />} />
        <Route path="/person" index element={<Stars />} />
      </Routes>
    </Container>
  );
}

export default App;
