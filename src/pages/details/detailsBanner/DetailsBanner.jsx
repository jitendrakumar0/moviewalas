import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres.map((g) => g?.id);

    const director = crew?.filter((f) => f?.job === "Director");
    const writer = crew?.filter(
        (f) =>
            f?.job === "Screenplay" || f?.job === "Story" || f?.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner w-full bg-black1 pt-[100px] md:pt-[120px] mb-[50px] md:mb-0 md:min-h-[700px] before:absolute before:inset-0 before:z-[1] z-0 before:bg-gradient1 before:mix-blend-color">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                                <Img
                                    className={`w-full h-full object-cover object-center`}
                                    src={url?.backdrop + data?.backdrop_path}
                                />
                            </div>
                            <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0"></div>
                            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between relative z-[1]">
                                <div className="content flex relative flex-col md:flex-row gap-[25px] md:gap-[50px]">
                                    <div className="left shrink-0 w-full md:max-w-[350px]">
                                        {data?.poster_path ? (
                                            <Img
                                                className="posterImg w-full block rounded-xl md:max-w-[350px] aspect-[20/30]"
                                                src={
                                                    url?.backdrop +
                                                    data?.poster_path
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg w-full block rounded-xl md:max-w-[350px] aspect-[20/30]"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                    <div className="right text-white">
                                        <div className="title font-bold text-[28px] md:text-[34px] leading-[40px] md:leading-[44px]">
                                            {`${
                                                data?.name || data?.title
                                            } (${dayjs(
                                                data?.release_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle text-base md:text-xl leading-6 md:leading-7 mb-[15px] italic text-white/[0.6]">
                                            {data?.tagline}
                                        </div>
                                        <Genres data={_genres} />

                                        <div className="row flex items-center gap-[25px] mb-[25px]">
                                            <CircleRating
                                                className={`w-7 md:w-12 h-w-7 md:h-12 shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px] bg-black2`}
                                                rating={data?.vote_average.toFixed(
                                                    1
                                                )}
                                            />
                                            <div
                                                className="playbtn flex items-center gap-5 cursor-pointer hover:text-pink"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video?.key);
                                                }}
                                            >
                                                <PlayIcon className="w-7 md:w-12 h-w-7 md:h-12" />{" "}
                                                <span className="text text-lg transition-[all] duration-[0.7s]">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>
                                        <div className="overview mb-[25px]">
                                            <div className="heading text-2xl mb-[10px]">
                                                Overview
                                            </div>
                                            <div className="description leading-6 md:pr-[100px]">
                                                {data?.overview}
                                            </div>
                                        </div>
                                        <div className="info py-[15px] px-0 flex border-b border-solid border-b-[rgba(255,_255,_255,_0.1)]">
                                            {data?.status && (
                                                <div className="infoItem mr-[10px] flex-row flex-wrap">
                                                    <span className="text mb-[10px] leading-6 bold font-semibold opacity-100">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text mb-[10px] opacity-50 leading-6">
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.release_date && (
                                                <div className="infoItem mr-[10px] flex-row flex-wrap">
                                                    <span className="text mb-[10px] leading-6 bold font-semibold opacity-100">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text mb-[10px] opacity-50 leading-6">
                                                        {dayjs(
                                                            data?.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.runtime && (
                                                <div className="infoItem mr-[10px] flex-row flex-wrap">
                                                    <span className="text mb-[10px] leading-6 bold font-semibold opacity-100">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text mb-[10px] opacity-50 leading-6">
                                                        {toHoursAndMinutes(
                                                            data.runtime
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-[15px] px-0">
                                                <span className="text bold">
                                                    Director:{" "}
                                                </span>
                                                <span className="text">
                                                    {director.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.name}
                                                            {director.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-[15px] px-0">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer.map((d, i) => (
                                                        <span key={i}>
                                                            {d?.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                        {data?.created_by?.length > 0 && (
                                            <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-[15px] px-0">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d?.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton flex relative flex-col md:flex-row gap-[25px] md:gap-[50px]">
                    <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between gap-6">
                        <div className="left shrink-0 w-full block rounded-xl aspect-[1/1.5] md:max-w-[350px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                        <div className="right w-full">
                            <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-3/4 h-[25px] mb-12 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-2/4 h-[25px] mb-12 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                            <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
