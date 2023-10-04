import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer bg-black3 py-12 text-white relative">
            <div className="w-full max-w-[1200px] my-0 mx-auto py-0 px-5 flex flex-col items-center justify-between">
                <ul className="menuItems list-none flex items-center justify-center gap-4 md:gap-7 mb-5 md:mb-7">
                    <li className="menuItem transition-all cursor-pointer text-xs md:text-base hover:text-pink">Terms Of Use</li>
                    <li className="menuItem transition-all cursor-pointer text-xs md:text-base hover:text-pink">Privacy Policy</li>
                    <li className="menuItem transition-all cursor-pointer text-xs md:text-base hover:text-pink">About</li>
                    <li className="menuItem transition-all cursor-pointer text-xs md:text-base hover:text-pink">Blog</li>
                    <li className="menuItem transition-all cursor-pointer text-xs md:text-base hover:text-pink">FAQ</li>
                </ul>
                <div className="infoText text-xs md:text-sm leading-5 opacity-50 text-center max-w-[800px] mb-5 md:mb-7">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="socialIcons flex items-center justify-center gap-2">
                    <span className="icon w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all hover:shadow-sm hover:text-pink">
                        <FaFacebookF />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all hover:shadow-sm hover:text-pink">
                        <FaInstagram />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all hover:shadow-sm hover:text-pink">
                        <FaTwitter />
                    </span>
                    <span className="icon w-12 h-12 rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all hover:shadow-sm hover:text-pink">
                        <FaLinkedin />
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;