import React, { useRef, useState } from "react";

import "./style.scss";

import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../PlayBtn";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

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

    const loadingSkeleton = () => {
        return (
            <div className="skItem w-[180px] sm:w-[200px] md:w-1/4 shrink-0 cursor-pointer">
                <div className="thumb w-full aspect-[16/9] rounded-xl mb-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                <div className="row h-[20px] w-full rounded-xl mb-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                <div className="row2 h-[20px] w-3/4 rounded-xl skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
            </div>
        );
    };

    return (
        <>
            {!loading ? (
                <>
                    {data?.results?.length > 0 && (
                        <>
                            <div className="videosSection relative mb-[30px]">
                                <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                                    <div className="sectionHeading text-sm md:text-lg lg:text-2xl text-white font-bold mb-4">
                                        Official Videos
                                    </div>
                                    <BsFillArrowLeftCircleFill
                                        className="carouselLeftNav arrow left-[20px] -translate-x-2/4 text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer z-[1] hidden md:block hover:scale-[1.08] ring-8 ring-offset ring-black1"
                                        onClick={() => navigation("left")}
                                    />
                                    <BsFillArrowRightCircleFill
                                        className="carouselRightNav arrow right-[20px] translate-x-2/4 text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer z-[1] hidden md:block hover:scale-[1.08] ring-8 ring-offset ring-black1"
                                        onClick={() => navigation("right")}
                                    />
                                    <div
                                        className="videos flex gap-[10px] md:gap-[20px] overflow-x-auto -mx-5 md:m-0 py-0 md:py-2 px-5 md:px-2"
                                        ref={carouselContainer}
                                    >
                                        {data?.results?.map((video) => (
                                            <div
                                                key={video?.id}
                                                className="videoItem w-[180px] sm:w-[200px] md:w-1/4 shrink-0 cursor-pointer"
                                                onClick={() => {
                                                    setVideoId(video?.key);
                                                    setShow(true);
                                                }}
                                            >
                                                <div className="videoThumbnail mb-[15px] relative group aspect-[16/9] overflow-hidden rounded-2xl shadow-custom1">
                                                    <Img
                                                        className={`w-full block rounded-xl transition-all duration-[0.7s] group-hover:!opacity-50`}
                                                        src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`}
                                                    />
                                                    <PlayIcon className="w-6 md:w-11 h-6 md:h-11 translate-y-[-50%] translate-x-[-50%] absolute top-2/4 left-2/4" />
                                                </div>
                                                <div className="videoTitle text-white text-xs md:text-base font-semibold leading-5 md:leading-6 line-clamp-1">
                                                    {video?.name}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="videosSection relative mb-[50px]">
                    <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5">
                        <div className="sectionHeading w-28 text-sm md:text-lg lg:text-2xl text-white font-bold mb-4 h-8 rounded-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%]"></div>
                        <div className="videoSkeleton flex gap-[10px] md:gap-[20px] overflow-x-auto -mx-5 md:m-0 py-0 px-5 md:p-0">
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                            {loadingSkeleton()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideosSection;
