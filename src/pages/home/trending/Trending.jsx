import React, { useState } from "react";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };
    return (
        <div className="carouselSection relative mb-16 -mt-[80px] md:-mt-[150px]">
            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 flex items-center justify-between">
                <span className="carouselTitle text-sm md:text-lg lg:text-2xl text-white font-bold before:content-['Trending'] before:absolute before:inset-[0px_0px_auto_0px] sm:before:text-[110px] sm:before:block before:hidden lg:before:text-[180px] xl:before:text-[200px] before:text-center before:mix-blend-overlay">
                    Trending
                </span>
                <SwitchTabs
                    data={["Day", "Week"]}
                    onTabChange={onTabChange}
                />
            </div>
            <Carousel
                data={data?.results}
                loading={loading}
            />
        </div>
    );
};

export default Trending;
