import React from "react";
import ReactPlayer from "react-player/lazy";
import { AiOutlineCloseCircle } from "react-icons/ai";

import "./style.scss";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div
            className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0 z-[100] ${
                show ? "opacity-100 visible group" : "opacity-0 invisible"
            }`}
        >
            <div
                className="opacityLayer absolute top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_0.25)] backdrop-blur-[3.5px] opacity-0 transition-[opacity] duration-[400ms] group-[]:opacity-100"
                onClick={hidePopup}
            ></div>
            <div className="videoPlayer relative max-w-[800px] w-[calc(100%-30px)] md:w-full aspect-[16/9] scale-[0.2] duration-[250ms] transition-[transform] group-[]:scale-100 rounded-2xl p-2 md:p-4 backdrop-blur-2xl shadow-custom1">
                <span
                    className="closeBtn absolute w-8 h-8 md:top-0 max-md:bottom-0 max-md:left-0 right-0 m-auto translate-x-0 md:translate-x-2/4 translate-y-10 md:-translate-y-2/4 text-white cursor-pointer bg-black1 rounded-full md:hover:scale-[1.2] transition-all duration-75"
                    onClick={hidePopup}
                >
                    <AiOutlineCloseCircle className="w-full h-full" />
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    className={`rounded-2xl overflow-hidden`}
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;
