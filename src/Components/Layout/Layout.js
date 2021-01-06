import React from 'react'

import requests from '../../Axios/request';

import Aux from '../../HOC/auxiliary';

import Navbar from '../Navbar/Navbar';
import Banner from '../Banner/Banner';
import Movies from '../Movies/MoviesRow';

function Layout() {
    //<Movies title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    return (
        <Aux>
            <Navbar />
            <Banner />
            <Movies title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginal} isBigImage />
            <Movies title="Trending Now" fetchUrl={requests.fetchTrending} />
            <Movies title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Movies title="Action" fetchUrl={requests.fetchActionMovies} />
            <Movies title="Comedy" fetchUrl={requests.fetchComedyMovies} />
            <Movies title="Crime" fetchUrl={requests.fetchCrimeMovies} />
            <Movies title="Family" fetchUrl={requests.fetchFamilyMovie} />
            <Movies title="Horror" fetchUrl={requests.fetchHorrorMovies} />
            <Movies title="Mystery" fetchUrl={requests.fetchMysteryMovies} />
            <Movies title="Romance" fetchUrl={requests.fetchRomanceMovies} />
        </Aux>
    );
}

export default Layout;