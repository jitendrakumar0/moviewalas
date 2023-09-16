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
    return (
        <div className="heroBanner w-full h-[450px] md:h-[700px] bg-gradient1 flex items-center relative">
            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden">
                <Img
                    className={`w-full h-full object-cover object-center`}
                    src={background}
                />
            </div>

            <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0 bg-gradient2"></div>

            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-[20px]">
                <div className="heroBannerContent flex flex-col items-center text-white relative max-w-[800px] my-0 mx-auto">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
