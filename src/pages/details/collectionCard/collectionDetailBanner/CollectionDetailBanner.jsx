import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import dayjs from "dayjs";

import Genres from "../../../../components/genres/Genres";
import CircleRating from "../../../../components/circleRating/CircleRating";
import Img from "../../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../../assets/no-poster.png";
import { PiShareNetworkDuotone } from "react-icons/pi";
import { BsArrowLeft } from "react-icons/bs";
import MovieCard from "../../../../components/movieCard/MovieCard";

const CollectionDetailsBanner = ({ data, loading, mediaType, collectionDetailPopup, setCollectionDetailPopup }) => {
    const BackdropFallback = "TFTfzrkX8L7bAKUcch6qLmjpLu.jpg";
    const [genreId, setGenreId] = useState([]);
    const [voteAverages, setVoteAverages] = useState(0);

    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: data?.name,
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

    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        const ids = [];
        data?.parts?.map((item) => {
            item?.genre_ids?.map((key) => {
                ids.push(key);
            });
        });
        let uniqueIds = [...new Set(ids)];
        setGenreId(uniqueIds);

        const filteredParts = data?.parts?.filter(
            (item) => item?.vote_average !== 0
        );
        const lengthWithoutZeros = filteredParts?.length;
        const sum = data?.parts
            ?.map((item) => item?.vote_average)
            .reduce((acc, value) => acc + value, 0);
        setVoteAverages(sum / lengthWithoutZeros);
    }, [data, loading]);

    return (
        <>
            {!loading ? (
                <div className="detailsBanner w-full bg-black1 before:absolute before:inset-0 before:z-[1] z-0 before:bg-gradient1 before:mix-blend-color before:rounded-2xl h-full sm:rounded-2xl overflow-hidden">
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden sm:rounded-2xl">
                                <Img
                                    className={`w-full h-full object-cover object-center`}
                                    width={`1280`}
                                    height={`720`}
                                    alt={data?.name}
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
                            <div className="opacity-layer w-full h-[250px] bg-gradient3 absolute bottom-0 left-0 z-[1] rounded-b-2xl"></div>
                            <div className="w-full flex md:items-center justify-between relative z-[1] h-full overflow-x-hidden overflow-y-auto">
                                <div className="content flex relative flex-col md:flex-row gap-[10px] md:gap-[20px] w-full md:h-full">
                                    <div className="left shrink-0 relative max-md:w-full md:h-full aspect-[20/30] max-md:hidden">
                                        <div className="posterImg w-full block rounded-xl md:h-full aspect-[20/30]">
                                            {mediaType === "person" ? (
                                                <Img
                                                    className="posterImg w-full block rounded-xl h-full aspect-[20/30]"
                                                    width={`400`}
                                                    height={`600`}
                                                    alt={data?.name}
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
                                                    className="posterImg w-full block rounded-xl h-full aspect-[20/30]"
                                                    width={`400`}
                                                    height={`600`}
                                                    alt={data?.name}
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
                                    </div>
                                    <div className="right text-white shrink p-5">
                                        <div className="w-full md:h-full md:overflow-x-hidden md:overflow-y-auto">
                                            {data?.name && (
                                                <>
                                                    <div className="title font-bold text-base sm:text-[18px] md:text-[34px] leading-[25px] md:leading-[44px] pb-4 md:w-[calc(100%-30px)] flex items-center gap-3">
                                                        <span
                                                            className="closeBtn cursor-pointer z-10 shadow-2xl sm:hidden"
                                                            onClick={() =>
                                                                setCollectionDetailPopup(
                                                                    !collectionDetailPopup
                                                                )
                                                            }
                                                        >
                                                            <BsArrowLeft className="text-white text-xl sm:text-2xl md:text-4xl rounded-full" />
                                                        </span>{" "}
                                                        {`${data?.name}`}
                                                    </div>
                                                </>
                                            )}
                                            <Genres
                                                data={genreId}
                                                classNameGenres={`genres hidden md:flex gap-[5px] mb-4 md:mb-[25px] flex-wrap flex-row`}
                                                classNameGenre={`genre backdrop-blur-xl border border-gray py-[1px] px-[5px] text-xs md:text-sm rounded-[4px] text-white whitespace-nowrap`}
                                            />
                                            <div className="row flex items-center gap-3 md:gap-[25px] mb-[25px]">
                                                {mediaType !== "person" &&
                                                    voteAverages && (
                                                        <>
                                                            <CircleRating
                                                                className={`w-7 md:w-12 h-7 md:h-12 shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px] bg-black2`}
                                                                rating={voteAverages?.toFixed(
                                                                    1
                                                                )}
                                                            />
                                                        </>
                                                    )}
                                                <button
                                                    onClick={handleShare}
                                                    className="w-7 md:w-12 h-7 md:h-12 grid items-center justify-center shrink-0 rounded-full p-[2px] max-w-[70px] md:max-w-[90px]"
                                                >
                                                    <PiShareNetworkDuotone className="text-2xl md:text-4xl cursor-pointer duration-300 hover:scale-90" />
                                                </button>
                                            </div>
                                            {data?.overview && (
                                                <div className="overview mb-[25px]">
                                                    <div className="heading text-base md:text-lg mb-[10px] font-bold">
                                                        Overview
                                                    </div>
                                                    <div className="description text-xs md:text-sm leading-6">
                                                        {data?.overview}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                                <span className="text mb-[10px] text-xs md:text-sm leading-6 bold font-semibold opacity-100">
                                                    {data?.parts?.length} Movies
                                                </span>
                                            </div>
                                            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4">
                                                {data?.parts?.map(
                                                    (item, index) => {
                                                        // eslint-disable-next-line array-callback-return
                                                        return (
                                                            <MovieCard
                                                                key={index}
                                                                data={item}
                                                                mediaType={
                                                                    data?.media_type
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default CollectionDetailsBanner;
