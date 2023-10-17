import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import KnownFor from "./carousels/KnownFor";
import CollectionCard from "./collectionCard/CollectionCard";
import useFetch from "../../hooks/useFetch";
import { fetchDataFromApi } from "../../utils/api";
import { useContext } from "react";
import { Context } from "../../context/context";
import Gallary from "../../components/gallary/Gallary";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const [creditType, setCreditType] = useState("credits");
    const [navTabs, setNavTabs] = useState("Overview");
    const [mediaOption, setMediaOption] = useState("Backdrops");

    const secondNavDiv = useRef();
    const DetailsBannerDiv = useRef();

    const { beforeScroll } = useContext(Context);

    const [videoData, setVideoData] = useState("");
    const [videoDataLoading, setVideoDataLoading] = useState(false);

    const [creditsData, setCreditsData] = useState("");
    const [creditsLoading, setCreditsLoading] = useState(false);

    const [images, setImages] = useState();
    const [imagesLoading, setImagesLoading] = useState(false);

    const imagesFunction = () => {
        setImagesLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/images`).then((res) => {
            setImages(res);
            setImagesLoading(false);
        });
    };

    useEffect(() => {
        if (
            mediaOption === "Backdrops" ||
            mediaOption === "Logos" ||
            mediaOption === "Posters"
        ) {
            imagesFunction();
        }
    }, [mediaType]);

    const creditsDataFunction = () => {
        setCreditsLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/${creditType}`).then((res) => {
            setCreditsData(res);
            setCreditsLoading(false);
        });
    };

    const videoApiFunction = () => {
        setVideoDataLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/videos`).then((res) => {
            setVideoData(res);
            setVideoDataLoading(false);
        });
    };

    const [secondDivscrollPosition, setSecondDivScrollPosition] = useState(0);
    const [detailBannerDivscrollPosition, setDetailBannerDivScrollPosition] =
        useState(0);
    const [finalScrollValue, setFinalScrollValue] = useState(0);

    const handleScroll = () => {
        setSecondDivScrollPosition(secondNavDiv?.current?.offsetTop);
        setDetailBannerDivScrollPosition(
            DetailsBannerDiv?.current?.clientHeight
        );
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const finalScroll =
            secondDivscrollPosition - detailBannerDivscrollPosition;
        setFinalScrollValue(finalScroll);
    }, [secondDivscrollPosition]);

    useEffect(() => {
        if (mediaType !== "person") {
            videoApiFunction();
            setCreditType("credits");
        } else {
            setCreditType("combined_credits");
        }
    }, [mediaType]);

    useEffect(() => {
        creditsDataFunction();
    }, [creditType]);

    return (
        <div>
            <DetailsBanner
                id={id}
                data={data}
                loading={loading}
                credits={creditsData}
                mediaType={mediaType}
                videoData={videoData}
                dataRef={DetailsBannerDiv}
            />
            <div
                ref={secondNavDiv}
                className={`w-full flex flex-col backdrop-blur-lg bg-black1/40 sticky z-10 duration-300 ${
                    !finalScrollValue <= 0 && beforeScroll
                        ? "top-14"
                        : "top-0 group"
                } ${finalScrollValue !== 0 ? "group/ui2" : "group/ui"} `}
            >
                <div className="w-full max-w-[1200px] my-0 mx-auto md:px-5 relative">
                    <div className="flex justify-center duration-300">
                        <div
                            className={`max-md:grow group-[]/ui:md:grow group-[]/ui2:px-2 group-[]/ui2:md:px-6 text-center py-1 group-[]:py-3 duration-300 group-[]/ui:rounded-t-xl group cursor-pointer border-b-2 md:border-b-4 border-pink/30 ${
                                navTabs === "Overview"
                                    ? "active:bg-pink/40 bg-pink/40"
                                    : ""
                            }`}
                            onClick={() => {
                                setNavTabs("Overview");
                            }}
                        >
                            <span className="text-white text-xs md:text-sm uppercase font-semibold hover:group-[]:text-gray-light duration-200">
                                Overview
                            </span>
                        </div>
                        <div
                            className={`max-md:grow group-[]/ui:md:grow group-[]/ui2:px-2 group-[]/ui2:md:px-6 text-center py-1 group-[]:py-3 duration-300 group-[]/ui:rounded-t-xl group cursor-pointer border-b-2 md:border-b-4 border-pink/30 ${
                                navTabs === "Media"
                                    ? "active:bg-pink/40 bg-pink/40 group/select"
                                    : ""
                            }`}
                            onClick={() => {
                                setNavTabs("Media");
                            }}
                        >
                            <span className="text-white text-xs md:text-sm uppercase font-semibold hover:group-[]:text-gray-light duration-200 group-[]/select:hidden">
                                Media
                            </span>
                            <div>
                                <select
                                    onChange={(e) =>
                                        setMediaOption(e?.target?.value)
                                    }
                                    defaultValue={mediaOption}
                                    className="text-white text-xs md:text-sm uppercase font-semibold hover:group-[]:text-gray-light duration-200 hidden group-[]/select:bg-black1/0 outline-none border-0 group-[]/select:block mx-auto"
                                    name=""
                                    id=""
                                >
                                    <option
                                        className="text-white font-semibold checked:bg-pink checked:text-white capitalize bg-black1"
                                        selected={mediaOption === "Backdrops"}
                                        value="Backdrops"
                                    >
                                        Backdrops
                                    </option>
                                    <option
                                        className="text-white font-semibold checked:bg-pink checked:text-white capitalize bg-black1"
                                        selected={mediaOption === "Logos"}
                                        value="Logos"
                                    >
                                        Logos
                                    </option>
                                    <option
                                        className="text-white font-semibold checked:bg-pink checked:text-white capitalize bg-black1"
                                        selected={mediaOption === "Posters"}
                                        value="Posters"
                                    >
                                        Posters
                                    </option>
                                    <option
                                        className="text-white font-semibold checked:bg-pink checked:text-white capitalize bg-black1"
                                        selected={mediaOption === "Videos"}
                                        value="Videos"
                                    >
                                        Videos
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div
                            className={`max-md:grow group-[]/ui:md:grow group-[]/ui2:px-2 group-[]/ui2:md:px-6 text-center py-1 group-[]:py-3 duration-300 group-[]/ui:rounded-t-xl group cursor-pointer border-b-2 md:border-b-4 border-pink/30 ${
                                navTabs === "Cast & Crew"
                                    ? "active:bg-pink/40 bg-pink/40"
                                    : ""
                            }`}
                            onClick={() => {
                                setNavTabs("Cast & Crew");
                            }}
                        >
                            <span className="text-white text-xs md:text-sm uppercase font-semibold hover:group-[]:text-gray-light duration-200">
                                Cast & Crew
                            </span>
                        </div>
                        <div
                            className={`max-md:grow group-[]/ui:md:grow group-[]/ui2:px-2 group-[]/ui2:md:px-6 text-center py-1 group-[]:py-3 duration-300 group-[]/ui:rounded-t-xl group cursor-pointer border-b-2 md:border-b-4 border-pink/30 ${
                                navTabs === "More"
                                    ? "active:bg-pink/40 bg-pink/40"
                                    : ""
                            }`}
                            onClick={() => {
                                setNavTabs("More");
                            }}
                        >
                            <span className="text-white text-xs md:text-sm uppercase font-semibold hover:group-[]:text-gray-light duration-200">
                                More
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {mediaType === "person" ? (
                <>
                    {navTabs === "Overview" && (
                        <KnownFor
                            className={`pt-8`}
                            data={creditsData}
                            loading={creditsLoading}
                            mediaType={mediaType}
                            limit={8}
                        />
                    )}
                </>
            ) : (
                <>
                    {(navTabs === "Overview" || navTabs === "Cast & Crew") && (
                        <>
                            <Cast
                                className={`pt-8`}
                                heading={
                                    navTabs === "Overview"
                                        ? "Top Cast"
                                        : "All Cast"
                                }
                                navTabs={navTabs}
                                setNavTabs={setNavTabs}
                                data={creditsData?.cast}
                                loading={creditsLoading}
                            />
                        </>
                    )}
                    {navTabs === "Cast & Crew" && (
                        <>
                            <Cast
                                className={`pt-8`}
                                heading={"All Crew"}
                                navTabs={navTabs}
                                setNavTabs={setNavTabs}
                                data={creditsData?.crew}
                                loading={creditsLoading}
                            />
                        </>
                    )}
                    {navTabs === "Overview" && (
                        <>
                            <CollectionCard
                                data={data}
                                collectionId={data?.belongs_to_collection?.id}
                                loading={loading}
                            />
                        </>
                    )}
                    {navTabs === "Media" && (
                        <>
                            {mediaOption === "Backdrops" && (
                                <Gallary
                                    images={images?.backdrops}
                                    loading={imagesLoading}
                                    className={`aspect-[3840/2160] object-cover object-center`}
                                />
                            )}
                            {mediaOption === "Logos" && (
                                <Gallary
                                    images={images?.logos}
                                    loading={imagesLoading}
                                    className={`aspect-[3840/2160] object-contain object-center`}
                                    // width={`100%`}
                                    // height={`auto`}
                                />
                            )}
                            {mediaOption === "Posters" && (
                                <Gallary
                                    images={images?.posters}
                                    loading={imagesLoading}
                                    className={`aspect-[2000/3000] object-cover object-center`}
                                />
                            )}
                        </>
                    )}
                    {(navTabs === "Overview" ||
                        (navTabs === "Media" && mediaOption === "Videos")) && (
                        <>
                            <VideosSection
                                heading={
                                    navTabs === "Media"
                                        ? "All Official Videos"
                                        : "Official Videos"
                                }
                                mediaOption={mediaOption}
                                setMediaOption={setMediaOption}
                                navTabs={navTabs}
                                setNavTabs={setNavTabs}
                                datas={videoData}
                                loadings={videoDataLoading}
                            />
                        </>
                    )}
                    {navTabs === "Overview" && (
                        <>
                            <Similar
                                mediaType={mediaType}
                                id={id}
                            />
                        </>
                    )}
                    {navTabs === "Overview" && (
                        <>
                            <Recommendation
                                mediaType={mediaType}
                                id={id}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Details;
