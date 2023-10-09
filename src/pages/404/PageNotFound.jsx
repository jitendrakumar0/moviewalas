import React from "react";

const PageNotFound = () => {
    return (
        <div className="pageNotFound h-[700px] pt-[200px]">
            <div className="w-full max-w-[1200px] my-0 mx-auto pb-2 md:pb-4 px-5 relative grid text-white text-center">
                <span className="bigText text-[150px] font-bold">404</span>
                <span className="smallText text-[44px]">Page not found!</span>
            </div>
        </div>
    );
};

export default PageNotFound;
