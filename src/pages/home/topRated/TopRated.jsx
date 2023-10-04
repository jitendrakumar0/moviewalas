import React, { useState } from "react";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };
    return (
        <div className="carouselSection relative mb-16 mt-4 lg:mt-[100px]">
            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between">
                <span className="carouselTitle text-sm md:text-lg lg:text-2xl text-white font-bold before:content-['TopRated'] before:absolute before:inset-[0px_0px_auto_0px] sm:before:text-[110px] sm:before:block before:hidden lg:before:text-[180px] xl:before:text-[200px] before:text-center before:drop-shadow-[2px_4px_12px_#623a9a] before:text-black1">
                    Top Rated
                </span>
                <SwitchTabs
                    data={["Movies", "TV Shows"]}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default TopRated;
