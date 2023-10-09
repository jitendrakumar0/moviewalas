import React, { useRef } from "react";
import { useSelector } from "react-redux";

import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

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

    const skeleton = () => {
        return (
            <div className="skItem w-[125px] sm:w-[20%] md:w-[17.7%] lg:w-[14.95%] xl:w-[12.5%] shrink-0">
                <div className="circle profileImg w-full aspect-[20/30] rounded-2xl mb-[15px] md:mb-[25px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                <div className="row w-full h-5 rounded-[10px] mb-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                <div className="row2 w-2/4 h-5 rounded-[10px] my-0 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
            </div>
        );
    };
    return (
        <>
            {!loading ? (
                <>
                    {data?.length > 0 && (
                        <>
                            <div className="castSection relative z-[1]">
                                <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                                    <div className="sectionHeading text-sm md:text-lg lg:text-2xl text-white font-bold mb-4">
                                        Top Cast
                                    </div>
                                    {data?.length >= 7 && (
                                        <>
                                            <BsFillArrowLeftCircleFill
                                                className="carouselLeftNav arrow left-[30px] text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden md:block md:hover:opacity-80"
                                                onClick={() =>
                                                    navigation("left")
                                                }
                                            />
                                            <BsFillArrowRightCircleFill
                                                className="carouselRightNav arrow right-[30px] text-3xl text-black1 bg-white rounded-full border-white border-2 absolute top-[44%] translate-y-[-50%] cursor-pointer opacity-50 z-[1] hidden md:block md:hover:opacity-80"
                                                onClick={() =>
                                                    navigation("right")
                                                }
                                            />
                                        </>
                                    )}
                                    <div
                                        className="listItems scroll-pl-6 snap-x flex gap-4 sm:gap-6 overflow-y-hidden md:overflow-hidden -mx-5 md:m-0 px-5 py-0 md:p-0"
                                        ref={carouselContainer}
                                    >
                                        {data?.map((item) => {
                                            return (
                                                <div
                                                    key={item?.id}
                                                    className="listItem delay-75 duration-300 hover:scale-95 snap-start text-white w-[125px] sm:w-[20%] md:w-[17.7%] lg:w-[14.95%] xl:w-[12.5%] shrink-0"
                                                >
                                                    <div className="profileImg w-full aspect-[20/30] rounded-t-2xl overflow-hidden mb-[15px] md:mb-[25px] relative">
                                                        <div className="opacity-layer w-full h-[60px] bg-gradient3 absolute bottom-0 left-0 z-[1]"></div>
                                                        <Img
                                                            className={`w-full h-full object-cover object-top block`}
                                                            width={"141"}
                                                            height={"226"}
                                                            alt={item?.name}
                                                            src={
                                                                item?.profile_path
                                                                    ? url.profile_sizes_w45 +
                                                                      item?.profile_path
                                                                    : avatar
                                                            }
                                                            srcSet={`${
                                                                item?.profile_path
                                                                    ? url.profile_sizes_w45 +
                                                                      item.profile_path
                                                                    : avatar
                                                            } 100w, ${
                                                                item?.profile_path
                                                                    ? url.profile_sizes_w185 +
                                                                      item.profile_path
                                                                    : avatar
                                                            } 250w`}
                                                        />
                                                    </div>
                                                    <div className="name text-xs md:text-base leading-5 md:leading-6 font-semibold -mt-10 z-[1] relative">
                                                        {item?.name}
                                                    </div>
                                                    <div className="character text-[11px] md:text-sm leading-5 md:leading-6 opacity-50">
                                                        {item?.character}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="castSection relative mb-[50px] z-[1]">
                    <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                        <div className="sectionHeading w-28 text-sm md:text-lg lg:text-2xl text-white font-bold mb-4 h-8 rounded-[10px] skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                        <div className="castSkeleton flex gap-4 sm:gap-6 overflow-y-hidden -mx-5 md:m-0 px-5 py-0 md:p-0">
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cast;
