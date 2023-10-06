import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchDataFromApi } from "../../utils/api";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/spinner/Spinner";
import "./style.scss";
import MovieCard from "../../components/movieCard/MovieCard";
const SearchResult = ({ websiteName }) => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    // console.log(pageNum)

    const fetchInitialData = () => {
        console.log(pageNum);
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                console.log("fetchinitialdata");
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                console.log("fetchnextdata");
                setPageNum((prev) => prev + 1);
                console.log(pageNum);
            }
        );
    };

    useEffect(() => {
        console.log("useeffect");
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    console.log(data);

    return (
        <>
            <section className="searchResultsPage">
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                        {data?.results?.length > 0 ? (
                            <>
                                <div className="pageTitle">
                                    {`Search ${
                                        data?.total_results > 1
                                            ? "results"
                                            : "result"
                                    } of ${query}`}
                                </div>
                                <InfiniteScroll
                                    className="content"
                                    dataLength={data?.results?.length || []}
                                    next={fetchNextData}
                                    hasMore={pageNum <= data?.total_pages}
                                    loader={<Spinner />}
                                >
                                    {data?.results?.map((item, index) => {
                                        // if(item.media_type === "person") return;
                                        return (
                                            <MovieCard
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
                                <div className="col-12 text-white">
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
