import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { FaEarthAmericas } from "react-icons/fa6";
import { PiShareNetworkDuotone } from "react-icons/pi";
// import useFetch from "../../../hooks/useFetch";
import { fetchDataFromApi } from "../../../utils/api";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DetailsBanner = ({
    data,
    loading,
    credits,
    videoData,
    mediaType,
    id,
}) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const BackdropFallback = "TFTfzrkX8L7bAKUcch6qLmjpLu.jpg";
    // const location = useLocation();

    const navigate = useNavigate();

    // console.log(location);

    const [providers, setProviders] = useState("");
    const [providersLoading, setProvidersLoading] = useState(false);
    const [ott, setOtt] = useState(false);

    const videoApiFunction = () => {
        setProvidersLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/watch/providers`).then((res) => {
            setProviders(res);
            setProvidersLoading(false);
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: data?.title || data?.name,
                    text: "Check out this awesome movie website!",
                    url: window.location.href,
                })
                .then(() => {
                    console.log("shared successfully");
                })
                .catch((error) => {
                    console.log("error" + error);
                });
        } else {
            console.log("web share api not supported in this browser");
        }
    };

    useEffect(() => {
        if (mediaType !== "person") {
            videoApiFunction();
        }
    }, [mediaType]);

    const relativeTime = require("dayjs/plugin/relativeTime");
    dayjs.extend(relativeTime);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g?.id);

    const director = credits?.crew?.filter((f) => f?.job === "Director");
    const writer = credits?.crew?.filter(
        (f) =>
            f?.job === "Screenplay" || f?.job === "Story" || f?.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <>
            {!loading ? (
                <div className="detailsBanner w-full bg-black1 pt-[70px] md:pt-[100px] mb-[50px] md:mb-0 md:min-h-[700px] before:absolute before:inset-0 before:z-[1] z-0 before:bg-gradient1 before:mix-blend-color">
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                                <Img
                                    className={`w-full h-full object-cover object-center`}
                                    width={`1280`}
                                    height={`720`}
                                    alt={data?.name || data?.title}
                                    src={
                                        data?.backdrop_path
                                            ? url.backdrop_sizes_w300 +
                                              data?.backdrop_path
                                            : url.backdrop_sizes_w300 +
                                              "/" +
                                              BackdropFallback
                                    }
                                    srcSet={`${
                                        data?.backdrop_path
                                            ? url.backdrop_sizes_w300 +
                                              data?.backdrop_path
                                            : url.backdrop_sizes_w300 +
                                              "/" +
                                              BackdropFallback
                                    } 250w, ${
                                        data?.backdrop_path
                                            ? url.backdrop_sizes_w780 +
                                              data?.backdrop_path
                                            : url.backdrop_sizes_w780 +
                                              "/" +
                                              BackdropFallback
                                    } 400w, ${
                                        data?.backdrop_path
                                            ? url.backdrop_sizes_w1280 +
                                              data?.backdrop_path
                                            : url.backdrop_sizes_w1280 +
                                              "/" +
                                              BackdropFallback
                                    } 600w`}
                                />
                            </div>
                            <div className="opacity-layer w-full h-[250px] bg-gradient3 absolute bottom-0 left-0 z-[1]"></div>
                            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between relative z-[1]">
                                <div className="content flex relative flex-col md:flex-row gap-[10px] md:gap-[50px] w-full">
                                    <div className="left shrink-0 w-full md:max-w-[350px] relative">
                                        <div className="posterImg w-full block rounded-xl md:max-w-[350px] aspect-[20/30]">
                                            {mediaType === "person" ? (
                                                <Img
                                                    className="posterImg w-full block rounded-xl md:max-w-[350px] aspect-[20/30]"
                                                    width={`400`}
                                                    height={`600`}
                                                    alt={
                                                        (data?.name ||
                                                            data?.title) &&
                                                        (data?.name ||
                                                            data?.title)
                                                    }
                                                    src={
                                                        data?.profile_path
                                                            ? url.profile_sizes_w45 +
                                                              data?.profile_path
                                                            : PosterFallback
                                                    }
                                                    srcSet={`${
                                                        data?.profile_path
                                                            ? url.profile_sizes_w45 +
                                                              data?.profile_path
                                                            : PosterFallback
                                                    } 250w, ${
                                                        data?.profile_path
                                                            ? url.profile_sizes_w185 +
                                                              data?.profile_path
                                                            : PosterFallback
                                                    } 250w, ${
                                                        data?.profile_path
                                                            ? url.profile_sizes_h632 +
                                                              data?.profile_path
                                                            : PosterFallback
                                                    } 400w`}
                                                />
                                            ) : (
                                                <Img
                                                    className="posterImg w-full block rounded-xl md:max-w-[350px] aspect-[20/30]"
                                                    width={`400`}
                                                    height={`600`}
                                                    alt={
                                                        (data?.name ||
                                                            data?.title) &&
                                                        (data?.name ||
                                                            data?.title)
                                                    }
                                                    src={
                                                        data?.poster_path
                                                            ? url.poster_sizes_w92 +
                                                              data?.poster_path
                                                            : PosterFallback
                                                    }
                                                    srcSet={`${
                                                        data?.poster_path
                                                            ? url.poster_sizes_w92 +
                                                              data?.poster_path
                                                            : PosterFallback
                                                    } 250w, ${
                                                        data?.poster_path
                                                            ? url.poster_sizes_w185 +
                                                              data?.poster_path
                                                            : PosterFallback
                                                    } 250w, ${
                                                        data?.poster_path
                                                            ? url.poster_sizes_w342 +
                                                              data?.poster_path
                                                            : PosterFallback
                                                    } 400w, ${
                                                        data?.poster_path
                                                            ? url.poster_sizes_w500 +
                                                              data?.poster_path
                                                            : PosterFallback
                                                    } 600w`}
                                                />
                                            )}
                                        </div>
                                        {!providersLoading &&
                                            providers?.results?.IN && (
                                                <div className="w-full -mt-4 relative z-[1]">
                                                    <div className="relative w-full">
                                                        {ott && (
                                                            <div className="w-full items-center justify-center flex-row-reverse absolute bottom-0 shadow-inner shadow-black1/40 z-[1] left-0 bg-white/20 backdrop-blur-md rounded-t-xl flex">
                                                                {console.log(
                                                                    providers
                                                                        ?.results
                                                                        ?.IN
                                                                        ?.rent
                                                                )}
                                                                {providers
                                                                    ?.results
                                                                    ?.IN?.rent
                                                                    ? providers?.results?.IN?.rent?.map(
                                                                          (
                                                                              item
                                                                          ) => (
                                                                              <div
                                                                                  key={
                                                                                      item?.provider_id
                                                                                  }
                                                                                  className="w-full max-w-[75px]"
                                                                              >
                                                                                  <div className="w-full p-3">
                                                                                      <Link
                                                                                          title={
                                                                                              (item?.provider_name ||
                                                                                                  item?.title) &&
                                                                                              (item?.provider_name ||
                                                                                                  item?.title)
                                                                                          }
                                                                                          target="_blank"
                                                                                          to={
                                                                                              providers
                                                                                                  ?.results
                                                                                                  ?.IN
                                                                                                  ?.link
                                                                                          }
                                                                                          className="w-full block rounded-xl overflow-hidden aspect-square relative border-2 border-black1/20 duration-300 cursor-pointer scale-90 hover:scale-100"
                                                                                      >
                                                                                          <Img
                                                                                              className="posterImg w-full block aspect-square"
                                                                                              width={`40`}
                                                                                              height={`40`}
                                                                                              alt={
                                                                                                  (item?.provider_name ||
                                                                                                      item?.title) &&
                                                                                                  (item?.provider_name ||
                                                                                                      item?.title)
                                                                                              }
                                                                                              src={
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w45 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              }
                                                                                              srcSet={`${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w45 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 250w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w92 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 280w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w154 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 300w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w185 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 340w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w300 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 370w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w500 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 400w`}
                                                                                          />
                                                                                      </Link>
                                                                                  </div>
                                                                              </div>
                                                                          )
                                                                      )
                                                                    : providers?.results?.IN?.flatrate?.map(
                                                                          (
                                                                              item
                                                                          ) => (
                                                                              <div
                                                                                  key={
                                                                                      item?.provider_id
                                                                                  }
                                                                                  className="w-full max-w-[75px]"
                                                                              >
                                                                                  <div className="w-full p-3">
                                                                                      <div
                                                                                          title={
                                                                                              (item?.provider_name ||
                                                                                                  item?.title) &&
                                                                                              (item?.provider_name ||
                                                                                                  item?.title)
                                                                                          }
                                                                                          onClick={() => {
                                                                                              navigate(
                                                                                                  ``
                                                                                              );
                                                                                          }}
                                                                                          className="w-full block rounded-xl overflow-hidden aspect-square relative border-2 border-black1/20 duration-300 cursor-pointer scale-90 hover:scale-100"
                                                                                      >
                                                                                          <Img
                                                                                              className="posterImg w-full block aspect-square"
                                                                                              width={`40`}
                                                                                              height={`40`}
                                                                                              alt={
                                                                                                  (item?.provider_name ||
                                                                                                      item?.title) &&
                                                                                                  (item?.provider_name ||
                                                                                                      item?.title)
                                                                                              }
                                                                                              src={
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w45 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              }
                                                                                              srcSet={`${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w45 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 250w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w92 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 280w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w154 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 300w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w185 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 340w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w300 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 370w, ${
                                                                                                  item?.logo_path
                                                                                                      ? url.logo_sizes_w500 +
                                                                                                        item?.logo_path
                                                                                                      : PosterFallback
                                                                                              } 400w`}
                                                                                          />
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          )
                                                                      )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        className="watchBtn w-full py-2 md:py-3 px-3 md:px-4 font-bold text-white bg-gradient-to-t from-black1 shadow-md shadow-gray/40 to-pink text-center cursor-pointer rounded-b-xl duration-300 md:hover:tracking-widest md:hover:from-black1 md:hover:to-blacklight"
                                                        onClick={() => {
                                                            setOtt(!ott);
                                                        }}
                                                    >
                                                        Watch Now
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                    <div className="right text-white shrink-1">
                                        {(data?.name || data?.title) && (
                                            <>
                                                <div className="title font-bold text-[20px] md:text-[34px] leading-[40px] md:leading-[44px]">
                                                    {`${
                                                        data?.name ||
                                                        data?.title
                                                    }`}

                                                    {data?.release_date && (
                                                        <>
                                                            {" "}
                                                            (
                                                            {dayjs(
                                                                data?.release_date
                                                            ).format("YYYY")}
                                                            )
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {data?.tagline ||
                                        data?.known_for_department ? (
                                            <div className="subtitle text-sm md:text-xl leading-6 md:leading-7 mb-[15px] italic text-white/[0.6]">
                                                {data?.known_for_department && (
                                                    <>Known For </>
                                                )}
                                                {data?.tagline ||
                                                    data?.known_for_department}
                                            </div>
                                        ) : (
                                            <div className="pb-4"></div>
                                        )}
                                        {_genres && (
                                            <>
                                                <Genres
                                                    data={_genres}
                                                    classNameGenres={`genres hidden md:flex gap-[5px] mb-4 md:mb-[25px] flex-wrap flex-row`}
                                                    classNameGenre={`genre backdrop-blur-xl border border-gray py-[1px] px-[5px] text-xs md:text-sm rounded-[4px] text-white whitespace-nowrap`}
                                                />
                                            </>
                                        )}
                                        {(data?.vote_average ||
                                            videoData?.results?.[0]?.key) && (
                                            <>
                                                <div className="row flex items-center gap-3 md:gap-[25px] mb-[25px]">
                                                    {data?.vote_average && (
                                                        <>
                                                            <CircleRating
                                                                className={`w-7 md:w-12 h-7 md:h-12 shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px] bg-black2`}
                                                                rating={data?.vote_average?.toFixed(
                                                                    1
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                    {data?.homepage && (
                                                        <Link
                                                            to={data?.homepage}
                                                            target="_blank"
                                                            className="w-7 md:w-12 h-7 md:h-12 grid items-center justify-center shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px]"
                                                        >
                                                            <FaEarthAmericas
                                                                className="text-2xl md:text-5xl cursor-pointer duration-300 hover:scale-90"
                                                                title={`Website : ${data?.homepage}`}
                                                            />
                                                        </Link>
                                                    )}
                                                    {videoData?.results?.[0]
                                                        ?.key && (
                                                        <>
                                                            <div
                                                                className="playbtn flex items-center gap-2 md:gap-5 cursor-pointer md:hover:text-blue"
                                                                onClick={() => {
                                                                    setShow(
                                                                        true
                                                                    );
                                                                    setVideoId(
                                                                        videoData
                                                                            ?.results?.[0]
                                                                            ?.key
                                                                    );
                                                                }}
                                                            >
                                                                <PlayIcon className="w-6 md:w-11 h-6 md:h-11" />{" "}
                                                                <span className="text text-sm md:text-base font-semibold transition-[all] duration-[0.7s]">
                                                                    Watch
                                                                    Trailer
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={handleShare}
                                                        className="w-7 md:w-12 h-7 md:h-12 grid items-center justify-center shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px]"
                                                    >
                                                        <PiShareNetworkDuotone
                                                            className="text-2xl md:text-4xl cursor-pointer duration-300 hover:scale-90"
                                                            title={`Website : ${data?.homepage}`}
                                                        />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {(data?.overview ||
                                            data?.biography) && (
                                            <div className="overview mb-[25px]">
                                                <div className="heading text-base md:text-lg mb-[10px] font-bold">
                                                    {data?.overview
                                                        ? "Overview"
                                                        : "Biography"}
                                                </div>
                                                <div className="description text-xs md:text-sm leading-6 md:pr-[100px]">
                                                    {data?.overview ||
                                                        data?.biography}
                                                </div>
                                            </div>
                                        )}
                                        <div className="info py-[15px] px-0 flex flex-wrap border-b border-solid gap-3 border-b-[rgba(255,_255,_255,_0.1)]">
                                            {(data?.status || data?.gender) && (
                                                <div className="infoItem shrink-0 grow md:grow-0 flex flex-col flex-wrap overflow-hidden border border-solid border-gray/[0.5] rounded-lg">
                                                    <span className="text lg:mb-[5px] max-xl:flex text-xs md:text-sm leading-6 bold font-semibold opacity-100 bg-gray/[0.3] px-2 py-1">
                                                        {data?.status
                                                            ? "Status"
                                                            : "Gender"}{" "}
                                                    </span>
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm opacity-50 leading-6 font-semibold px-2">
                                                        {data?.status && (
                                                            <>{data?.status}</>
                                                        )}
                                                        {data?.gender && (
                                                            <>
                                                                {data?.gender ===
                                                                1
                                                                    ? "Female"
                                                                    : "Male"}
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {(data?.release_date ||
                                                data?.birthday) && (
                                                <div className="infoItem shrink-0 grow md:grow-0 flex flex-col flex-wrap overflow-hidden border border-solid border-gray/[0.5] rounded-lg">
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm leading-6 bold font-semibold opacity-100 bg-gray/[0.3] px-2 py-1">
                                                        {data?.release_date
                                                            ? "Release Date"
                                                            : "Birthday"}{" "}
                                                    </span>
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm opacity-50 leading-6 font-semibold px-2">
                                                        {data?.release_date ? (
                                                            <>
                                                                {dayjs(
                                                                    data?.release_date
                                                                ).format(
                                                                    "MMM D, YYYY"
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {dayjs(
                                                                    data?.birthday
                                                                ).format(
                                                                    "MMM D, YYYY"
                                                                )}
                                                                &nbsp;&nbsp; (
                                                                {dayjs(
                                                                    data?.birthday
                                                                ).diff(
                                                                    dayjs(),
                                                                    "years"
                                                                ) -
                                                                    dayjs(
                                                                        data?.birthday
                                                                    ).diff(
                                                                        dayjs(),
                                                                        "years"
                                                                    ) *
                                                                        2}{" "}
                                                                old)
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {data?.deathday && (
                                                <div className="infoItem shrink-0 grow md:grow-0 flex flex-col flex-wrap overflow-hidden border border-solid border-gray/[0.5] rounded-lg">
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm leading-6 bold font-semibold opacity-100 bg-gray/[0.3] px-2 py-1">
                                                        Deathday{" "}
                                                    </span>
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm opacity-50 leading-6 font-semibold px-2">
                                                        {dayjs(
                                                            data?.deathday
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {(data?.runtime ||
                                                data?.place_of_birth) && (
                                                <div className="infoItem shrink-0 grow md:grow-0 flex flex-col flex-wrap overflow-hidden border border-solid border-gray/[0.5] rounded-lg">
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm leading-6 bold font-semibold opacity-100 bg-gray/[0.3] px-2 py-1">
                                                        {data?.runtime
                                                            ? "Runtime"
                                                            : "Birth Place"}{" "}
                                                    </span>
                                                    <span className="text lg:mb-[5px] text-xs md:text-sm opacity-50 leading-6 font-semibold px-2">
                                                        {data?.runtime ? (
                                                            toHoursAndMinutes(
                                                                data.runtime
                                                            )
                                                        ) : (
                                                            <>
                                                                {
                                                                    data?.place_of_birth
                                                                }
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="infoItem shrink-0 grow md:grow-0 w-full sm:w-auto flex-wrap flex justify-center sm:flex-col overflow-hidden border-2 border-solid border-gray/[0.5] bg-gray/[0.3] rounded-lg duration-300 hover:bg-gray-dark cursor-pointer">
                                                <span className="text lg:mt-[5px] text-xs md:text-sm leading-6 bold font-semibold sm:px-2 pr-1 sm:pt-1">
                                                    View
                                                </span>
                                                <span className="text lg:mb-[5px] text-xs md:text-sm leading-6 font-semibold sm:px-2 sm:pb-1">
                                                    More
                                                </span>
                                            </div>
                                        </div>
                                        {mediaType === "person" ? (
                                            <>
                                                {data?.also_known_as?.length >
                                                    0 && (
                                                    <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                                        <span className="text mb-[10px] text-xs md:text-sm leading-6 bold font-semibold opacity-100">
                                                            Also Known as:{" "}
                                                        </span>
                                                        <span className="text mb-[10px] text-xs md:text-sm text-white/60 leading-6 font-semibold">
                                                            {data?.also_known_as?.map(
                                                                (d, i) => {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {d}{" "}
                                                                            <span className="text-white font-bold">
                                                                                {" "}
                                                                                {data
                                                                                    ?.also_known_as
                                                                                    ?.length -
                                                                                    1 !==
                                                                                    i &&
                                                                                    " • "}{" "}
                                                                            </span>
                                                                        </span>
                                                                    );
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {director?.length > 0 && (
                                                    <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                                        <span className="text mb-[10px] text-xs md:text-sm leading-6 bold font-semibold opacity-100">
                                                            Director:{" "}
                                                        </span>
                                                        <span className="text mb-[10px] text-xs md:text-sm opacity-50 leading-6 font-semibold">
                                                            {director?.map(
                                                                (d, i) => {
                                                                    return (
                                                                        <span
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {d?.name ||
                                                                                d?.title}
                                                                            {director?.length -
                                                                                1 !==
                                                                                i &&
                                                                                ", "}
                                                                        </span>
                                                                    );
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {writer?.length > 0 && (
                                                    <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                                        <span className="text mb-[10px] text-xs md:text-sm leading-6 bold font-semibold opacity-100">
                                                            Writer:{" "}
                                                        </span>
                                                        <span className="text mb-[10px] text-xs md:text-sm opacity-50 leading-6 font-semibold">
                                                            {writer?.map(
                                                                (d, i) => (
                                                                    <span
                                                                        key={i}
                                                                    >
                                                                        {
                                                                            d?.name
                                                                        }
                                                                        {writer?.length -
                                                                            1 !==
                                                                            i &&
                                                                            ", "}
                                                                    </span>
                                                                )
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {data?.created_by?.length >
                                                    0 && (
                                                    <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                                        <span className="text mb-[10px] text-xs md:text-sm leading-6 bold font-semibold opacity-100">
                                                            Creator:{" "}
                                                        </span>
                                                        <span className="text mb-[10px] text-xs md:text-sm opacity-50 leading-6 font-semibold">
                                                            {data?.created_by.map(
                                                                (d, i) => (
                                                                    <span
                                                                        key={i}
                                                                    >
                                                                        {
                                                                            d?.name
                                                                        }
                                                                        {data
                                                                            ?.created_by
                                                                            .length -
                                                                            1 !==
                                                                            i &&
                                                                            ", "}
                                                                    </span>
                                                                )
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                            />
                        </React.Fragment>
                    )}
                </div>
            ) : (
                <div className="detailsBanner w-full bg-black1 pt-[70px] md:pt-[100px] mb-[50px] md:mb-0 md:min-h-[700px]">
                    <div className="detailsBannerSkeleton flex relative flex-col md:flex-row gap-[25px] md:gap-[50px]">
                        <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between gap-6">
                            <div className="left shrink-0 w-full block rounded-xl aspect-[1/1.5] md:max-w-[350px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                            <div className="right w-full">
                                <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-full">
                                    <div className="flex items-center gap-[25px] w-[70px] h-[70px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                    <div className="flex items-center gap-[25px] w-[70px] h-[70px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                    <div className="flex items-center gap-[25px] w-[70px] h-[70px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                </div>
                                <div className="row flex items-center gap-[25px] w-3/4 h-[25px] mb-12 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-2/4 h-[25px] mb-12 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="row flex items-center gap-[25px] w-full h-[25px] mb-5 rounded-[50px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailsBanner;
