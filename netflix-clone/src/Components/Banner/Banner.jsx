import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../../utils/axios";
import requests from "../../utils/requests";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const results = response.data.results;
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  const backgroundImage = movie?.backdrop_path
    ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
    : "none"; // leave as none, then handle gradient overlay in CSS

  const getTitle = () =>
    movie?.title || movie?.name || movie?.original_name || "Untitled";

  const truncate = (text, maxLength) =>
    text?.length > maxLength ? text.substring(0, maxLength - 1) + "…" : text;

  return (  
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{getTitle()}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 150)}</p>
      </div>
      {/* Gradient overlay */}
      <div className="banner--fadeBottom"></div>
    </header>
  );
};

export default Banner;
