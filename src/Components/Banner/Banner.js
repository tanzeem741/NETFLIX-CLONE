import React, { useState, useEffect } from 'react';
import './Banner.css';

import instance from '../../Axios/axios';
import requests from '../../Axios/request';
import { Img_base_URL } from '../../Axios/request';



function Banner() {

    const [BannerImage, setBannerImage] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(requests.fetchNetflixOriginal);
            setBannerImage(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
            return request;
        }
        fetchData();
    }, [])
    return (
        <header className="banner"
            style={{
                backgroundImage: `url(${Img_base_URL}${BannerImage?.backdrop_path})`,
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{BannerImage?.title || BannerImage?.name || BannerImage?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h2 className="banner__description">{BannerImage?.overview}</h2>
            </div>
            <div className="banner__fadeBottom"></div>
        </header >
    )
}

export default Banner;