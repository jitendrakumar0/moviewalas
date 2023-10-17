import React from "react";
import { useSelector } from "react-redux";
import Img from "../lazyLoadImage/Img";

import PosterFallback from "../../assets/no-poster.png";

const Gallary = ({ images, loading, className, width, height }) => {
    // const [allImages, setAllImages] = useState([]);
    const { url } = useSelector((state) => state.home);

    // useEffect(() => {
    //     const imagesData = images?.map((el) => {
    //         el.src = url.backdrop_sizes_original + el.file_path;
    //         delete el.file_path;
    //     });
    //     setAllImages(imagesData);
    // }, [images]);

    return (
        <>
            {!loading && (
                <>
                    <div className={`relative z-[1]`}>
                        <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 py-5">
                            {images?.length > 0 && images?.map((data, index)=>(
                                <div key={index} className={`relative ${className}`} onClick={()=>{window.onload()}}>
                                <Img
                                    className={`posterImg !w-full !h-auto block rounded-xl ${className}`}
                                    width={width || data?.width || `400`}
                                    height={height || data?.height || `600`}
                                    alt={'Gallery'}
                                    src={
                                        data?.file_path
                                            ? url.backdrop_sizes_w300 +
                                              data?.file_path
                                            : PosterFallback
                                    }
                                    srcSet={`${
                                        data?.file_path
                                            ? url.backdrop_sizes_w300 +
                                              data?.file_path
                                            : PosterFallback
                                    } 250w, ${
                                        data?.file_path
                                            ? url.backdrop_sizes_w780 +
                                              data?.file_path
                                            : PosterFallback
                                    } 250w, ${
                                        data?.file_path
                                            ? url.backdrop_sizes_w1280 +
                                              data?.file_path
                                            : PosterFallback
                                    } 400w`}
                                />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Gallary;
