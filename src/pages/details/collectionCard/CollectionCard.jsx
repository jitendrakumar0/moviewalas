import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ data, collectionId, loading }) => {
    const [collection, setCollection] = useState("");
    const [collectionLoadings, setCollectionLoadings] = useState("");
    const navigate = useNavigate();

    const collectionDataFunction = () => {
        setCollectionLoadings(true);
        fetchDataFromApi(`/collection/${collectionId}`).then((res) => {
            setCollection(res);
            setCollectionLoadings(false);
        });
    };
    const { url } = useSelector((state) => state.home);
    const BackdropFallback = "TFTfzrkX8L7bAKUcch6qLmjpLu.jpg";
    useEffect(() => {
        if (collectionId) {
            collectionDataFunction();
        }
    }, [collectionId]);
    useEffect(() => {
        console.log(collection);
    }, [collectionLoadings]);
    return (
        <>
            {!loading ? (
                <>
                    {collection && (
                        <>
                            <div className="castSection22 relative z-[1] py-5">
                                <div className="w-full max-w-[1200px] my-0 mx-auto md:py-4 px-5 relative">
                                    <div className="backdrop-img w-full h-full absolute z-0 top-0 left-0 opacity-40 overflow-hidden">
                                        <Img
                                            className={`w-full h-full object-cover object-center`}
                                            width={`1280`}
                                            height={`720`}
                                            alt={
                                                collection?.name ||
                                                collection?.title
                                            }
                                            src={
                                                collection?.backdrop_path
                                                    ? url.backdrop_sizes_w300 +
                                                      data
                                                          ?.belongs_to_collection
                                                          ?.backdrop_path
                                                    : url.backdrop_sizes_w300 +
                                                      "/" +
                                                      BackdropFallback
                                            }
                                            srcSet={`${
                                                collection?.backdrop_path
                                                    ? url.backdrop_sizes_w300 +
                                                      data
                                                          ?.belongs_to_collection
                                                          ?.backdrop_path
                                                    : url.backdrop_sizes_w300 +
                                                      "/" +
                                                      BackdropFallback
                                            } 250w, ${
                                                collection?.backdrop_path
                                                    ? url.backdrop_sizes_w780 +
                                                      data
                                                          ?.belongs_to_collection
                                                          ?.backdrop_path
                                                    : url.backdrop_sizes_w780 +
                                                      "/" +
                                                      BackdropFallback
                                            } 400w, ${
                                                collection?.backdrop_path
                                                    ? url.backdrop_sizes_w1280 +
                                                      data
                                                          ?.belongs_to_collection
                                                          ?.backdrop_path
                                                    : url.backdrop_sizes_w1280 +
                                                      "/" +
                                                      BackdropFallback
                                            } 600w`}
                                        />
                                    </div>
                                    <div className="w-full flex flex-row flex-wrap py-4 md:py-10 px-4 md:px-5 relative z-[1] items-center">
                                        <div className="w-[200px]">
                                            <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center flex items-end justify-between p-2">
                                                <Img
                                                    src={
                                                        data
                                                            ?.belongs_to_collection
                                                            .poster_path
                                                            ? url.poster_sizes_w185 +
                                                              data
                                                                  ?.belongs_to_collection
                                                                  .poster_path
                                                            : PosterFallback
                                                    }
                                                    srcSet={`${
                                                        data
                                                            ?.belongs_to_collection
                                                            .poster_path
                                                            ? url.poster_sizes_w92 +
                                                              data
                                                                  ?.belongs_to_collection
                                                                  .poster_path
                                                            : PosterFallback
                                                    } 380w, ${
                                                        data
                                                            ?.belongs_to_collection
                                                            .poster_path
                                                            ? url.poster_sizes_w154 +
                                                              data
                                                                  ?.belongs_to_collection
                                                                  .poster_path
                                                            : PosterFallback
                                                    } 650w, ${
                                                        data
                                                            ?.belongs_to_collection
                                                            .poster_path
                                                            ? url.poster_sizes_w185 +
                                                              data
                                                                  ?.belongs_to_collection
                                                                  .poster_path
                                                            : PosterFallback
                                                    } 1280w`}
                                                    width={"196"}
                                                    height={"294"}
                                                    alt={"movie poster image"}
                                                    className="w-full h-full object-cover object-center"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-[calc(100%-200px)] flex flex-col gap-4 pl-5">
                                            <div className="w-full text-white text-md md:text-lg lg:text-2xl font-bold">
                                                Part of {collection?.name}
                                            </div>
                                            <div className="w-full text-white text-sm md:text-base">
                                                Includes{" "}
                                                {!collectionLoadings && (
                                                    <>
                                                        {collection?.parts?.map(
                                                            (res, i) => (
                                                                <React.Fragment
                                                                    key={i}
                                                                >
                                                                    {res?.title}
                                                                    {collection
                                                                        ?.parts
                                                                        ?.length -
                                                                        1 !==
                                                                        i &&
                                                                        ","}{" "}
                                                                    &nbsp;&nbsp;
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <div className="w-full flex flex-col pt-3">
                                                <div
                                                    className="w-[200px] cursor-pointer py-2 px-5 border-2 border-solid rounded-full mr-auto font-bold border-white/40 text-white bg-black1/60 hover:bg-white/10"
                                                    onClick={() =>
                                                        navigate(
                                                            `/collection/${collection?.id}`
                                                        )
                                                    }
                                                >
                                                    View The Collection
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="castSection relative z-[1] py-5">
                    <div className="w-full max-w-[1200px] my-0 mx-auto md:py-4 px-5 relative">
                        <div className="w-full flex flex-row flex-wrap py-4 md:py-10 px-4 md:px-5 relative z-[1] items-center rounded-2xl skeleton overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer">
                            <div className="w-[200px]">
                                <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center flex items-end justify-between p-2 skeleton overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                            </div>
                            <div className="w-[calc(100%-200px)] flex flex-col gap-3 pl-5">
                                <div className="w-2/5 h-7 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="w-full h-5 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="w-2/3 h-5 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="w-1/3 h-5 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="w-4/5 h-5 skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                <div className="w-full flex flex-col pt-3">
                                    <div className="w-[200px] rounded-full skeleton relative overflow-hidden bg-gray-dark after:absolute after:inset-0 after:translate-x-[-100%] after:bg-gradient4 after:animate-shimmer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CollectionCard;
