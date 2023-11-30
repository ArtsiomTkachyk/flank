import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../Forms/Login/Login";
import Signup from "./../Forms/Signup/Signup";
import Reporting from "../pages/Reporting";
import ComingSoon from "../components/comingSoon/ComingSoon"
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
        {true ? (
          <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
        ) : null}
        <div
          className={`w-full flex flex-col ${
            true ? "px-2  min-h-[100vh] w-full bg-[#fff]" : ""
          }  `}
        >
          {/* TopBar component */}
          {true && location.pathname !== "/campaigns" ? (
            <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
          ) : null}

          {/* Define routes */}
          <Routes>
            {true ? (
              <>
                <Route path="/" element={<Reporting />} />
                <Route path="/reporting" element={<Reporting />}></Route>
                <Route
                  path="*"
                  element={
                   <ComingSoon/>
                  }
                />
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
