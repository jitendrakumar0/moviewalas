import React, { useEffect, useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const KnownFor = ({ mediaType, id, limit }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/credits`);
    const [knownForData, setKnownForData] = useState([]);
    const sortedData = data?.cast?.slice().sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
    });
    useEffect(()=>{
        const limitedData = sortedData?.slice(0, limit);
        setKnownForData(limitedData)
    },[data])
    return (
        <Carousel
            title="Known For"
            data={knownForData}
            loading={loading}
            endpoint={'person'}
        />
    );
};

export default KnownFor;
