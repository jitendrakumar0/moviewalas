import React from "react";

import { useSelector } from "react-redux";

const Genres = ({ data, classNameGenres, classNameGenre }) => {
    const { genres } = useSelector((state) => state.home);
    return (
        <div className={classNameGenres}>
            {data?.map((g, index) => {
                // eslint-disable-next-line array-callback-return
                if (!genres[g]?.name) return;
                return (
                    <div
                        key={index}
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
