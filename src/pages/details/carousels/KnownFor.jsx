import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";

const KnownFor = ({ data, loading, limit, mediaType, className }) => {
    const [knownForData, setKnownForData] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const sortedData = data?.cast?.slice().sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });
    useEffect(() => {
        const limitedData = sortedData?.slice(0, limit);
        setKnownForData(limitedData);
        // console.log(limitedData);
        setViewMore(false)
    }, [data]);
    return (
        <>
            {!viewMore ? (
                <>
                    <Carousel
                        className={className}
                        title="Known For"
                        data={knownForData}
                        loading={loading}
                        endpoint={mediaType}
                    />
                    {knownForData?.length >= 8 ? (
                        <div className={`castSection relative z-[1]`}>
                            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative">
                                <div onClick={()=>{setViewMore(true)}} className="hover:bg-pink/40 duration-300 cursor-pointer text-base border-2 border-solid border-white rounded-xl py-2 px-4 text-center font-semibold text-white">
                                    View All
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <Carousel
                    className={className}
                    title="Known For"
                    data={sortedData}
                    loading={loading}
                    endpoint={mediaType}
                    expended={true}
                />
            )}
        </>
    );
};

export default KnownFor;
