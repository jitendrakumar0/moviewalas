import React from "react";

import { useSelector } from "react-redux";

const Genres = ({ data, classNameGenres, classNameGenre }) => {
    const { genres } = useSelector((state) => state.home);
    return (
        <div className={classNameGenres}>
            {data?.map((g) => {
                if (!genres[g]?.name) return;
                return (
                    <div
                        key={g}
                        className={classNameGenre}
                    >
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
