import React, { useState } from "react";
import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(true);

    const activeTab = (tab, index) => {
        if (!left) {
            setLeft(true);
        } else {
            setLeft(false);
        }
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs h-[30px] bg-white rounded-2xl p-[3px]">
            <div className="tabItems flex items-center h-[24px] relative">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem h-full flex items-center font-semibold justify-center w-[60px] text-black1 text-xs relative z-[1] cursor-pointer ${
                            selectedTab === index ? "active text-white" : ""
                        }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span
                    className={`movieBg h-[24px] w-[60px] rounded-2xl bg-gradient1 absolute left-0 transition-[transform] ${
                        left ? "translate-x-0" : "translate-x-[100%]"
                    }`}
                    // style={{ left: left }}
                />
            </div>
        </div>
    );
};

export default SwitchTabs;
