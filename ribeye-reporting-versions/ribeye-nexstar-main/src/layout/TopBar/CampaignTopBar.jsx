import React from "react";
import { Link, useLocation } from "react-router-dom";
import campaignDark from "../../assets/icons/campaignDark.svg";
import search from "../../assets/icons/search.svg";
import notification from "../../assets/icons/notification.svg";
import avatar from "../../assets/icons/avatar.svg";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

const CampaignTopBar = ({ setShowMenu, showMenu, searchQuery, setSearchQuery }) => {
    // Get the current route location
    const location = useLocation();

    // Function to determine the appropriate breadcrumb links
    const getBreadcrumbLinks = () => {
        switch (location.pathname) {
            case "/reporting":
                return <Link to="/reporting">Reporting</Link>;
            case "/campaigns":
                return <Link to="/campaigns">Campaigns</Link>;
            case "/campaigns/new":
                return (
                    <>
                        <Link to="/campaigns">Campaigns</Link>
                        <span>/</span>
                        <Link to="/campaigns/new" className="font-semibold">
                            New Campaign
                        </Link>
                    </>
                );
            case "/tactics":
                return <Link to="/tactics">Tactics</Link>;
            default:
                return null;
        }
    };
    return (
        <>
            <div className="z-20 px-3 left-[0] top-0 w-[100%] py-[10px] flex-wrap gap-3 flex justify-between shadow-sm">
                <div className="flex items-center">
                    <img src={campaignDark} alt="campaign" />
                    <div className="flex items-center ml-3 gap-2">
                        {getBreadcrumbLinks()}
                    </div>
                </div>

                <div className="flex items-center gap-5 lg:mr-0 sm:mr-9 mr-0">
                    <div className="bg-white rounded-[100px] max-w-[400px] w-[full] md:w-[400px] px-4 py-2 flex gap-2">
                        <img src={search} alt="search" />
                        <input
                            className="outline-none w-full"
                            type="text"
                            placeholder="Type to search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <img src={notification} alt="notification" />
                    <img src={avatar} alt="avatar" />
                </div>
                <button
                    className="lg:hidden block absolute top-[25px] right-[25px] "
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <MenuOpenOutlinedIcon style={{ color: "#9ca3af" }} />
                </button>
            </div>
        </>
    );
};

export default CampaignTopBar;
