import React from "react";

const More = ({ data, loading }) => {
    return (
        <>
            {!loading ? (
                <div className={`py-8`}>
                    <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 relative z-[1]">
                        {data?.budget && (
                            <>
                                <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                    <span className="text mb-[10px] text-sm md:text-base leading-6 bold font-semibold opacity-100 text-white">
                                        Budget :{" "}
                                    </span>
                                    <span className="text mb-[10px] text-sm md:text-base leading-6 font-semibold text-white/60">
                                        $ {data?.budget}
                                    </span>
                                </div>
                            </>
                        )}
                        {data?.revenue && (
                            <>
                                <div className="info border-b border-solid border-b-[rgba(255,_255,_255,_0.1)] py-1 md:py-[15px] px-0">
                                    <span className="text mb-[10px] text-sm md:text-base leading-6 bold font-semibold opacity-100 text-white">
                                        Revenue :{" "}
                                    </span>
                                    <span className="text mb-[10px] text-sm md:text-base leading-6 font-semibold text-white/60">
                                        $ {data?.revenue}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default More;
