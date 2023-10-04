import React from "react";
import "./style.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);
    return (
        <div className="genres flex gap-[5px] mb-[25px] flex-wrap flex-row">
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div
                        key={g}
                        className="genre bg-black3 border border-gray py-[1px] px-[5px] text-[10px] rounded-[4px] text-white whitespace-nowrap"
                    >
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
