import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const carouselContainer = useRef();
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(16.66%-16px)] shrink-0">
                <div className="posterBlock skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] rounded-xl w-full aspect-[1/1.5] mb-3">
                    <div className="textBlock flex flex-col px-3">
                        <div className="title skeleton relative rounded-lg overflow-hidden bg-black1 after:absolute after:inset-0 after:translate-x-[-100%] w-full h-5 my-3"></div>
                        <div className="date skeleton relative rounded-lg overflow-hidden bg-black1 after:absolute after:inset-0 after:translate-x-[-100%] w-[75%] h-5"></div>
                    </div>
                </div>
                <div className="skeleton relative rounded-lg overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] w-[75%] h-3"></div>
                <div className="skeleton relative rounded-lg overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] w-[90%] mt-2 h-3"></div>
            </div>
        );
    };
    return (
        <div className="carousel mb-12">
            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 relative">
                {!loading ? (
                    <>
                        {data?.length > 0 ? (
                            <>
                                {title && (
                                    <div className="sectionHeading text-sm md:text-lg lg:text-2xl text-white font-bold mb-4">
                                        {title}
                                    </div>
                                )}
                                <BsFillArrowLeftCircleFill
                                    className="carouselLeftNav arrow left-[30px] text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden md:block md:hover:opacity-80"
                                    onClick={() => navigation("left")}
                                />
                                <BsFillArrowRightCircleFill
                                    className="carouselRightNav arrow right-[30px] text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden md:block md:hover:opacity-80"
                                    onClick={() => navigation("right")}
                                />
                                <div
                                    className="carouselItems scroll-pl-6 snap-x flex gap-2 md:gap-5 lg:gap-[19px] overflow-y-hidden md:overflow-hidden -mr-5 md:m-0 -ml-5 px-5 md:p-0"
                                    ref={carouselContainer}
                                >
                                    {data?.map((item) => {
                                        return (
                                            <div
                                                key={item?.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/${
                                                            item?.media_type ||
                                                            endpoint
                                                        }/${item?.id}`
                                                    )
                                                }
                                                className="carouselItem snap-start w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(16.66%-16px)] shrink-0 cursor-pointer"
                                            >
                                                <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-7 flex items-end justify-between p-2">
                                                    <Img
                                                        src={
                                                            item.poster_path
                                                                ? url.poster_sizes_w185 +
                                                                  item.poster_path
                                                                : PosterFallback
                                                        }
                                                        srcSet={`${
                                                            item.poster_path
                                                                ? url.poster_sizes_w92 +
                                                                  item.poster_path
                                                                : PosterFallback
                                                        } 380w, ${
                                                            item.poster_path
                                                                ? url.poster_sizes_w154 +
                                                                  item.poster_path
                                                                : PosterFallback
                                                        } 650w, ${
                                                            item.poster_path
                                                                ? url.poster_sizes_w185 +
                                                                  item.poster_path
                                                                : PosterFallback
                                                        } 1280w`}
                                                        width={"196"}
                                                        height={"294"}
                                                        alt={
                                                            "movie poster image"
                                                        }
                                                        className="w-full h-full object-cover object-center"
                                                    />
                                                    <CircleRating
                                                        className={`w-7 md:w-8 h-w-7 md:h-8 relative top-7 shrink-0 bg-black1 rounded-full p-[2px]`}
                                                        rating={item?.vote_average.toFixed(
                                                            1
                                                        )}
                                                    />
                                                    <Genres
                                                        data={item?.genre_ids.slice(
                                                            0,
                                                            2
                                                        )}
                                                        classNameGenres={`genres flex gap-[5px] mb-[25px] flex-wrap flex-row`}
                                                        classNameGenre={`genre bg-black3 border border-gray py-[1px] px-[5px] text-[10px] rounded-[4px] text-white whitespace-nowrap`}
                                                    />
                                                </div>
                                                <div className="textBlock text-white flex flex-col">
                                                    <span className="title text-sm md:text-base mb-1 leading-6 line-clamp-1">
                                                        {item?.title ||
                                                            item?.name}
                                                    </span>
                                                    <span className="date text-xs opacity-50">
                                                        {dayjs(
                                                            item?.release_date
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </>
                ) : (
                    <>
                        <div className="sectionHeading w-28 text-sm md:text-lg lg:text-2xl text-white font-bold mb-4 h-6 rounded-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                        <div className="loadingSkeleton scroll-pl-6 snap-x flex gap-2 md:gap-5 lg:gap-[19px] overflow-y-hidden md:overflow-hidden -mr-5 md:m-0 -ml-5 px-5 md:p-0">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Carousel;
