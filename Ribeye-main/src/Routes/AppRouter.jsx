import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../Forms/Login/Login";
import Signup from "./../Forms/Signup/Signup";
import Campaigns from "../pages/Campaigns";
import CreateCampaign from "../pages/CreateCampaign";
import Tactics from "../pages/Tactics";
import Reporting from "../pages/Reporting";
import { setToken } from "../store/slices/authSlice";
import setAuthHeader from "../helpers/set-auth-token";
import Sidebar from "../layout/Sidebar/Sidebar";
import TopBar from "../layout/TopBar/TopBar";

const AppRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthSet, token } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  // Fetch the user's token from localStorage and set it in Redux
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    dispatch(setToken(savedToken));

    if (savedToken) {
      setAuthHeader(savedToken);
    }
  }, []);

  if (!isAuthSet) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="w-full flex justify-between">
        {/* Sidebar component */}
        {token ? (
          <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        ) : null}
        <div
          className={`w-full flex flex-col ${
            token
              ? "px-2 m-3  min-h-[100vh] w-full rounded-[16px] bg-[#fff]"
              : ""
          }  `}
        >
          {/* TopBar component */}
          {token && location.pathname !== "/campaigns" ? (
            <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
          ) : null}

          {/* Define routes */}
          <Routes>
            {token ? (
              <>
                <Route path="/reporting" element={<Reporting />}></Route>
                <Route path="/campaigns" element={<Campaigns />}></Route>
                <Route
                  path="/campaigns/new"
                  element={<CreateCampaign />}
                ></Route>
                <Route
                  path="/campaigns/edit/:public_identifier"
                  element={<CreateCampaign editForm />}
                ></Route>
                <Route
                  path="/tactics/:public_identifier"
                  element={<Tactics />}
                ></Route>
                <Route
                  path="/tactics/:public_identifier/:tactic_public_identifier"
                  element={<Tactics />}
                ></Route>
                <Route path="*" element={<Navigate to="/campaigns" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    );
};

export default AppRouter;
