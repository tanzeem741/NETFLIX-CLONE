import React, { useState, useEffect } from "react";

import instance from "../../Axios/axios";
import "./moviesRow.css";

import DisplayDetails from "../Displaydetails/DisplayDetails";
import { Img_base_URL } from "../../Axios/request";

function Movies({ title, fetchUrl, isBigImage }) {
  const [movies, setMovies] = useState([]);
  const [details, showDetails] = useState({ show: false, movieID: null });

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const displayDetails = (show, id) => {
    showDetails({ show: !show, movieID: id });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="movie__row">
        {movies.map((movie) => (
          <img
            onClick={() => {
              displayDetails(details.show, movie?.id);
            }}
            key={movie.id}
            className={`movie__img ${isBigImage && "movie__img__big"}`}
            src={`${Img_base_URL}${
              isBigImage ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.name}
          ></img>
        ))}
      </div>
      {details.show && (
        <DisplayDetails
          movieID={details.movieID}
          isNetflixOriginal={isBigImage}
        />
      )}
    </div>
  );
}
export default Movies;