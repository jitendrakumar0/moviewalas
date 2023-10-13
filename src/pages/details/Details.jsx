import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import KnownFor from "./carousels/KnownFor";
import CollectionCard from "./collectionCard/CollectionCard";
import useFetch from "../../hooks/useFetch";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    useEffect(()=>{
        // console.log(data?.belongs_to_collection?.id)
    },[data])
    return (
        <div>
            <DetailsBanner
                mediaType={mediaType}
                id={id}
            />
            {mediaType === "person" ? (
                <>
                    <KnownFor
                        mediaType={mediaType}
                        id={id}
                        limit={8}
                    />
                </>
            ) : (
                <>
                    <Cast
                        mediaType={mediaType}
                        id={id}
                    />
                    <CollectionCard
                        data={data}
                        collectionId={data?.belongs_to_collection?.id}
                        loading={loading}
                    />
                    <VideosSection
                        mediaType={mediaType}
                        id={id}
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
