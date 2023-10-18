import React from "react";

const More = ({ id, data, loading }) => {
    return (
        <>
            {!loading ? (
                <div className={`carousel py-8`}>
                    <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 relative z-[1]">
                        <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                            <span className="text mb-[10px] text-sm md:text-base leading-6 bold font-semibold opacity-100 text-white">
                                Budget :{" "}
                            </span>
                            <span className="text mb-[10px] text-sm md:text-base opacity-50 leading-6 font-semibold text-gray-light">
                                {data?.budget}
                            </span>
                        </div>
                        <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                            <span className="text mb-[10px] text-sm md:text-base leading-6 bold font-semibold opacity-100 text-white">
                                Revenue :{" "}
                            </span>
                            <span className="text mb-[10px] text-sm md:text-base opacity-50 leading-6 font-semibold text-gray-light">
                                {data?.revenue}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default More;
