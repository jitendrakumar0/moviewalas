import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import PosterFallback from "../../assets/no-poster.png";
// import ProfileFallback from "../../assets/avatar.png";
import Genres from "../genres/Genres";

const CollectionCard = ({ data, fromSearch, className }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const NavigatePage = () => {
        navigate(`/collection/${data.id}`);
    };
    return (
        <div
            className={`CollectionCard cursor-pointer delay-75 duration-300 hover:scale-95 ${className}`}
            onClick={NavigatePage}
        >
        <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-7 flex items-end justify-between p-2">
            <Img
                src={
                    data?.poster_path
                        ? url.poster_sizes_w92 + data?.poster_path
                        : PosterFallback
                }
                srcSet={`${
                    data?.poster_path
                        ? url.poster_sizes_w92 + data?.poster_path
                        : PosterFallback
                } 300w, ${
                    data?.poster_path
                        ? url.poster_sizes_w154 + data?.poster_path
                        : PosterFallback
                } 400w, ${
                    data?.poster_path
                        ? url.poster_sizes_w185 + data?.poster_path
                        : PosterFallback
                } 500w, ${
                    data?.poster_path
                        ? url.poster_sizes_w342 + data?.poster_path
                        : PosterFallback
                } 600w, ${
                    data?.poster_path
                        ? url.poster_sizes_w500 + data?.poster_path
                        : PosterFallback
                } 7000w, ${
                    data?.poster_path
                        ? url.poster_sizes_w780 + data?.poster_path
                        : PosterFallback
                } 800w`}
                width={"196"}
                height={"294"}
                alt={"movie poster image"}
                className="w-full h-full object-cover object-center"
            />
            {/* {!fromSearch && ( */}
            <>
                {data?.vote_average > 0 ? (
                    <CircleRating
                        className={`w-7 md:w-8 h-w-7 md:h-8 relative top-7 shrink-0 bg-black1 rounded-full p-[2px] text-3xl`}
                        rating={data?.vote_average.toFixed(1)}
                    />
                ) : (
                    ""
                )}
                <Genres
                    data={data?.genre_ids?.slice(0, 2)}
                    classNameGenres={`genres hidden md:flex gap-[5px] mb-[15px] flex-wrap flex-row z-[1]`}
                    classNameGenre={`genre bg-black3 border border-gray py-[1px] px-[5px] text-[10px] rounded-[4px] text-white whitespace-nowrap`}
                />
            </>
            {/* )} */}
        </div>
            <div className="textBlock text-white flex flex-col">
                <span className="title text-sm md:text-base mb-1 leading-6 line-clamp-1 font-semibold">
                    {data.title || data.name}
                </span>
                <span className="date text-xs opacity-50">
                    {data?.media_type === "person"
                        ? data?.known_for_department
                        : dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default CollectionCard;
