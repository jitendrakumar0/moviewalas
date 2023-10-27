import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
// import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";

import MovieCard from "../../components/movieCard/MovieCard";
import PersonCard from "../../components/personCard/PersonCard";
import CollectionCard from "../../components/collectionCard/CollectionCard";
const SearchResult = ({ websiteName }) => {
    const [data, setData] = useState(null);
    const [collectionData, setcollectionData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(
            `/search/collection?query=${query}&include_adult=true&page=${pageNum}`
        ).then((res) => {
            setPageNum((prev) => prev + 1);
            setcollectionData(res);
            // setLoading(false);
        });
        fetchDataFromApi(`/search/multi?query=${query}&include_adult=true&page=${pageNum}`).then(
            (res) => {
                setPageNum((prev) => prev + 1);
                setData(res);
                setLoading(false);
            }
        );
    };

    const fetchNextData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&include_adult=true&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res?.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <>
            <section className="searchResultsPage min-h-[700px] pt-[100px]">
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                        {data?.results?.length > 0 ? (
                            <>
                                <div className="carouselTitle text-sm md:text-lg lg:text-2xl text-white font-semibold mb-4">
                                    Search{" "}
                                    {data?.total_results > 1
                                        ? "results"
                                        : "result"}{" "}
                                    of <b>"{query}"</b>
                                </div>
                                <InfiniteScroll
                                    className="content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4 h-auto overflow-y-auto mb-12"
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<Spinner />}
                                >
                                    {collectionData?.results?.map(
                                        (item, index) => {
                                            return (
                                                <CollectionCard
                                                    className={`w-full shrink-0`}
                                                    key={index}
                                                    data={item}
                                                    fromSearch={true}
                                                />
                                            );
                                        }
                                    )}
                                    {data?.results?.map((item, index) => {
                                        if (item?.media_type === "person") {
                                            return (
                                                <PersonCard
                                                    className={`w-full shrink-0`}
                                                    key={index}
                                                    data={item}
                                                    fromSearch={true}
                                                />
                                            );
                                        }
                                        return (
                                            <MovieCard
                                                className={`w-full shrink-0`}
                                                key={index}
                                                data={item}
                                                fromSearch={true}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            </>
                        ) : (
                            <>
                                <div className="text-white">
                                    No Record Found
                                </div>
                            </>
                        )}
                    </div>
                )}
            </section>
        </>
    );
};

export default SearchResult;
