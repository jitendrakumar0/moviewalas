import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import PosterFallback from "../../assets/no-poster.png";
import ProfileFallback from "../../assets/avatar.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    // const posterUrl = data.poster_path ? url.poster + data.poster_path : data.profile_path
    // ? url.profile + data.profile_path : PosterFallback;
    let posterUrl = "";
    if (data?.media_type === "person") {
        posterUrl = data.profile_path
            ? url.profile_sizes_w185 + data.profile_path
            : ProfileFallback;
    } else {
        posterUrl = data.poster_path
            ? url.poster_sizes_w185 + data.poster_path
            : PosterFallback;
    }
    const NavigatePage = () => {
        navigate(`/${data.media_type || mediaType}/${data.id}`);
    };
    return (
        <div
            className="movieCard"
            onClick={NavigatePage}
        >
            <div className="posterBlock">
                <Img
                    className={`posterImg`}
                    src={posterUrl}
                    width={"196"}
                    height={"294"}
                    alt={"movie poster image"}
                />
                {!fromSearch && (
                    <>
                        {data?.vote_average > 0 ? (
                            <CircleRating
                                rating={data?.vote_average.toFixed(1)}
                            />
                        ) : (
                            ""
                        )}
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {data?.media_type === "person"
                        ? data?.known_for_department
                        : dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
