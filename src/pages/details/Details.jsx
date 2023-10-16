import React, { useEffect, useState } from "react";
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

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    const [creditType, setCreditType] = useState("credits");
    // const { data:creditsData, loading:creditsLoading } = useFetch(`/${mediaType}/${id}/${creditType}`);

    const { beforeScroll, lastScrollY } = useContext(Context);

    const [videoData, setVideoData] = useState("");
    const [videoDataLoading, setVideoDataLoading] = useState(false);

    const [creditsData, setCreditsData] = useState("");
    const [creditsLoading, setCreditsLoading] = useState(false);

    const creditsDataFunction = () => {
        setCreditsLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/${creditType}`).then((res) => {
            setCreditsData(res);
            setCreditsLoading(false);
        });
    };
    // console.log(creditsData);

    const videoApiFunction = () => {
        setVideoDataLoading(true);
        fetchDataFromApi(`/${mediaType}/${id}/videos`).then((res) => {
            setVideoData(res);
            setVideoDataLoading(false);
        });
    };
    
    const secondNav = () => {
        console.log(window.scrollY);
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY) {
                console.log('aaya')
            } else {
                console.log('nahi aaya')
            }
        } else if (window.scrollY < 100) {
        }
    };

    useEffect(() => {
        // console.clear()
        window.addEventListener("scroll", secondNav);
        return () => {
            window.removeEventListener("scroll", secondNav);
        };
    }, [lastScrollY]);


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
            />
            <div
                className={`w-full flex flex-col backdrop-blur-lg bg-black1/40 sticky z-10 transition-all top-0 
                ${beforeScroll ? "translate-y-14" : "translate-y-0 group"}
                `}
            >
                <div className="w-full max-w-[1200px] my-0 mx-auto md:px-5 relative">
                    <div className="flex">
                        <div className="grow text-center py-1 group-[]:py-3 transition-all rounded-t-xl group active:bg-pink/40 hover:bg-pink/20 cursor-pointer border-b-2 md:border-b-4 border-pink/30">
                            <span className="text-white text-xs md:text-sm uppercase font-semibold md:font-bold hover:group-[]:text-gray-light duration-200">
                                Overview
                            </span>{" "}
                            <span className="rounded-full hidden font-bold text-xs text-white bg-gray/30 px-2 py-1">
                                30
                            </span>
                        </div>
                        <div className="grow text-center py-1 group-[]:py-3 transition-all rounded-t-xl group active:bg-pink/40 hover:bg-pink/20 cursor-pointer border-b-2 md:border-b-4 border-pink/30">
                            <span className="text-white text-xs md:text-sm uppercase font-semibold md:font-bold hover:group-[]:text-gray-light duration-200">
                                Media
                            </span>
                        </div>
                        <div className="grow text-center py-1 group-[]:py-3 transition-all rounded-t-xl group active:bg-pink/40 hover:bg-pink/20 cursor-pointer border-b-2 md:border-b-4 border-pink/30">
                            <span className="text-white text-xs md:text-sm uppercase font-semibold md:font-bold hover:group-[]:text-gray-light duration-200">
                                Cast & Crew
                            </span>
                        </div>
                        <div className="grow text-center py-1 group-[]:py-3 transition-all rounded-t-xl group active:bg-pink/40 hover:bg-pink/20 cursor-pointer border-b-2 md:border-b-4 border-pink/30">
                            <span className="text-white text-xs md:text-sm uppercase font-semibold md:font-bold hover:group-[]:text-gray-light duration-200">
                                More
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {mediaType === "person" ? (
                <>
                    <KnownFor
                        data={creditsData}
                        loading={creditsLoading}
                        mediaType={mediaType}
                        limit={8}
                    />
                </>
            ) : (
                <>
                    <Cast
                        data={creditsData}
                        loading={creditsLoading}
                    />
                    <CollectionCard
                        data={data}
                        collectionId={data?.belongs_to_collection?.id}
                        loading={loading}
                    />
                    <VideosSection
                        datas={videoData}
                        loadings={videoDataLoading}
                    />
                    <Similar
                        mediaType={mediaType}
                        id={id}
                    />
                    <Recommendation
                        mediaType={mediaType}
                        id={id}
                    />
                </>
            )}
        </div>
    );
};

export default Details;
