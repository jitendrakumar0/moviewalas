import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";

const KnownFor = ({ data, loading, limit, mediaType }) => {
    const [knownForData, setKnownForData] = useState([]);
    const sortedData = data?.cast?.slice().sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });
    useEffect(()=>{
        const limitedData = sortedData?.slice(0, limit);
        setKnownForData(limitedData)
        console.log(limitedData)
    },[data])
    return (
        <Carousel
            title="Known For"
            data={knownForData}
            loading={loading}
            endpoint={mediaType}
        />
    );
};

export default KnownFor;
