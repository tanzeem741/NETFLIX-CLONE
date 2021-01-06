import React, { useState, useEffect } from 'react';

import Aux from '../../HOC/auxiliary';

import instance from '../../Axios/axios';
import { Img_base_URL } from '../../Axios/request';
import './DisplayDetails.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const API_KEY = "22ef11ba9f0fbba2054f4f1a749c21ea"

const DisplayDetails = ({ movieID, isNetflixOriginal }) => {
    const [display, setDisplay] = useState({})
    const [trailerUrl, setTrailerUrl] = useState('')

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(`${isNetflixOriginal ? 'tv' : 'movie'}/${movieID}?api_key=${API_KEY}&language=en-US`);
            setDisplay(request.data);
            return request;
        }
        fetchData();
    }, [isNetflixOriginal, movieID]);


    const gettingTrailer = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        }
        else {

            movieTrailer(movie?.name || movie?.original_title || movie?.original_name || "")
                .then((url) => {

                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                }).catch((error) => console.log(error));
        }
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }
    const trailerStyle = {
        playerVars: {
            autoplay: 1,
        },
    }

    return (
        <Aux>
            <div className="details"
                style={{
                    backgroundImage: `linear-gradient(to right,rgba(0,0,0,100%) ,70% ,transparent ) , url(${Img_base_URL}${display?.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",

                }}>
                <div className="details__container">
                    <div className="details__name">{display?.original_title || display?.original_name}</div>
                    <div className="details__small">
                        <span className="details_pop">{(display?.vote_average)}</span>
                        <span className="details_vote">({display?.vote_count})</span>
                        {isNetflixOriginal && <span className="details_seasons"> {display?.seasons?.length} seasons</span>}
                        <span className="details_date">{display?.release_date?.split('-')[0] || display?.first_air_date?.split('-')[0]}</span>
                        <br />
                        {!isNetflixOriginal && <span className="details_runtime">Runtime : {display?.runtime} mins</span>}
                        {isNetflixOriginal && <div className="details__lastair">season {display?.last_episode_to_air?.season_number} coming on
                    <span className="details_lastairdate">{display?.last_episode_to_air?.air_date}</span></div>}
                    </div>
                    <div className="details__description">
                        {truncate(display?.overview, 150)}
                    </div>
                    <div className="details__buttons">
                        <button className="details__button__play" onClick={() => gettingTrailer(display)}>Trailer</button>
                        <button className="details__button__myList">My List</button>
                    </div>
                </div>
            </div>
            {trailerUrl && <div className="trailer">
                <Youtube videoId={trailerUrl} style={trailerStyle} />
            </div>}
        </Aux>
    );
}

export default DisplayDetails;

