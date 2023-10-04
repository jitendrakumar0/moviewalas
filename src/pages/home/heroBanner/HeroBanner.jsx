import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    // eslint-disable-next-line no-unused-vars
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg =
            url?.backdrop +
            data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
        console.log(bg);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const searchQueryBtn = () => {
        if (query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    return (
        <div className="heroBanner w-full h-[450px] md:h-[700px] bg-black1 flex items-center relative">
            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-40 overflow-hidden before:absolute before:inset-0 before:z-[1] z-0 before:bg-gradient1 before:mix-blend-color">
                <Img
                    className={`w-full h-full object-cover object-center`}
                    src={background}
                />
            </div>

            <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0 bg-gradient2"></div>

            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5">
                <div className="heroBannerContent flex flex-col items-center text-white relative max-w-[800px] my-0 mx-auto text-center md:-mt-40">
                    <span className="title text-4xl md:text-7xl font-bold mb-1 md:mb-5 box-shadow-custom1">
                        Welcome.
                    </span>
                    <span className="subTitle text-sm md:text-2xl mb-10">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput flex items-center w-full rounded-full bg-white p-[3px] md:p-[5px]">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                            className="w-[calc(100%-100px)] bg-gray-light md:w-[calc(100%-150px)] h-10 md:h-14 lg:h-16 text-black1 outline-none border-none rounded-l-4xl py-0 px-3 md:px-8 text-sm md:text-lg lg:text-xl"
                        />
                        <button
                            onClick={searchQueryBtn}
                            className="w-[100px] md:w-[150px] h-10 md:h-14 lg:h-16 bg-gradient1 text-white outline-none border-none rounded-r-4xl text-sm md:text-lg lg:text-xl font-semibold"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
