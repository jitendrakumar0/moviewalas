import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("show");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const controlNavbar = () => {
        console.log(window.scrollY);
        if (window.scrollY > 100) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
    };

    return (
        <header
            className={`header fixed translate-y-0 w-full h-14 z-10 flex items-center transition-all ${
                mobileMenu ? "mobileView bg-black3" : ""
            } ${
                show ? " backdrop-blur-lg bg-black1/[0.25]" : "-translate-y-16"
            }`}
        >
            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 flex items-center justify-between">
                <Link
                    to={"/"}
                    className="logo cursor-pointer"
                >
                    <img
                        className="h-12"
                        src={logo}
                        alt=""
                    />
                </Link>
                <ul
                    className={`menuItems list-none md:flex items-center ${
                        mobileMenu
                            ? "flex absolute top-14 left-0 bg-black3 flex-col w-full py-5 px-0 border-t border-solid border-[rgba(255,255,255)]/[0.1]"
                            : "hidden"
                    }`}
                >
                    <li
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                    >
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems flex md:hidden items-center gap-5">
                    <HiOutlineSearch
                        className="text-lg text-white"
                        onClick={openSearch}
                    />
                    {mobileMenu ? (
                        <VscChromeClose
                            className="text-lg text-white"
                            onClick={() => setMobileMenu(false)}
                        />
                    ) : (
                        <SlMenu
                            className="text-lg text-white"
                            onClick={openMobileMenu}
                        />
                    )}
                </div>
            </div>
            {showSearch && (
                <div className="searchBar w-full h-14 bg-white absolute top-14">
                    <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 flex items-center justify-between">
                        <div className="searchInput flex items-center w-full h-10 mt-2">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                                className="w-full h-12 md:h-14 bg-white outline-none border-none rounded-full px-4 md:px-8 text-sm md:text-xl"
                            />
                            <VscChromeClose
                                className="text-xl shrink-0 ml-2 cursor-pointer"
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
