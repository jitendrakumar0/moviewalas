import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./style.scss";

import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState(false);
    const [beforeScroll, setBeforeScroll] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        // console.log(window.scrollY);
        if (window.scrollY > 100) {
            setShow(true);
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setBeforeScroll(false);
            } else {
                setBeforeScroll(true);
            }
            setLastScrollY(window.scrollY);
        } else if (window.scrollY < 100) {
            setBeforeScroll(true);
            setShow(false);
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
            className={`header fixed w-full z-10 flex items-center transition-all ${
                mobileMenu ? "mobileView bg-black3" : ""
            } ${
                show ? "backdrop-blur-lg bg-black1/[0.25] h-14" : "h-16 md:h-24"
            } ${beforeScroll ? "translate-y-0" : "-translate-y-16"}`}
        >
            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 flex items-center justify-between">
                <Link
                    to={"/"}
                    className="logo cursor-pointer"
                >
                    <img
                        className="h-8 md:h-12"
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
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white md:hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                        onClick={() => navigationHandler("movie")}
                    >
                        Movies
                    </li>
                    <li
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white md:hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                        onClick={() => navigationHandler("tv")}
                    >
                        TV Shows
                    </li>
                    <li
                        className={`menuItem h-14 flex items-center my-0 mx-4 text-white md:hover:text-white/[0.80] font-medium relative cursor-pointer ${
                            mobileMenu
                                ? "text-xl w-full h-auto py-4 px-5 m-0 flex-col items-start"
                                : ""
                        }`}
                    >
                        <HiOutlineSearch
                            className="cursor-pointer"
                            onClick={openSearch}
                        />
                    </li>
                </ul>
                <div className="mobileMenuItems flex md:hidden items-center gap-5">
                    <HiOutlineSearch
                        className="text-lg text-white cursor-pointer"
                        onClick={openSearch}
                    />
                    {mobileMenu ? (
                        <VscChromeClose
                            className="text-lg text-white cursor-pointer"
                            onClick={() => setMobileMenu(false)}
                        />
                    ) : (
                        <SlMenu
                            className="text-lg text-white cursor-pointer"
                            onClick={openMobileMenu}
                        />
                    )}
                </div>
            </div>
            {showSearch && (
                <div
                    className={`searchBar w-full bg-white absolute ${
                        beforeScroll ? "top-0" : "-top-28"
                    }`}
                >
                    <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 flex items-center justify-between">
                        <div className="searchInput flex items-center w-full rounded-full bg-white p-[3px] md:p-[5px]">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                                className="w-[calc(100%-40px)] bg-gray-light md:w-[calc(100%-56px)] lg:w-[calc(100%-64px)] h-14 md:h-14 lg:h-16 text-black1 outline-none border-none rounded-l-4xl py-0 px-3 md:px-8 text-sm md:text-lg lg:text-xl"
                            />
                            <div
                                onClick={() => setShowSearch(false)}
                                className="w-14 md:w-14 lg:w-16 h-14 md:h-14 lg:h-16 bg-gray-light text-black1 outline-none border-none rounded-r-4xl text-sm font-semibold grid items-center justify-center cursor-pointer"
                            >
                                <VscChromeClose className="w-6 h-6 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
