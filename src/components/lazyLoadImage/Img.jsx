import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className, srcSet, width, height, alt }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            effect="blur"
            src={src}
            srcSet={srcSet}
            width={width}
            height={height}
            alt={alt}
        />
    );
};

export default Img;
