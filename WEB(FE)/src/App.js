import { Route, Routes } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfo } from "./store/AuthStore";
import HomePage from "./pages/HomePage";
import FirstPage from "./pages/FirstPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import WritePage from "./pages/WritePage";
import SearchPage from "./pages/SearchPage";
import ChatPage from "./pages/ChatPage";
import ResetPage from "./pages/ResetPage";
import "./styles/App.css";
import { useEffect, useState } from "react";
import { authService, FApiKey } from "./lib/FAuth";
import { onAuthStateChanged } from "firebase/auth";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import styled from "styled-components";
import {
  BigDesktopQuery,
  DesktopQuery,
  SmallDesktopQuery,
  TabletQuery,
} from "./lib/Const";
import { useMediaQuery } from "react-responsive";

const Body = styled.div`
  position: relative;
`;

/*각 페이지 라우트*/
const App = () => {
  const isDesktop = useMediaQuery({ query: DesktopQuery });
  const isSmallDesktop = useMediaQuery({ query: SmallDesktopQuery });
  const isTablet = useMediaQuery({ query: TabletQuery });
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  const [sessionInfo, setSessionInfo] = useState(
    sessionStorage.getItem(`firebase:authUser:${FApiKey}:[DEFAULT]`)
  );
  const auth = authService.currentUser;
  console.log(userInfo);

  const _session_key = `firebase:authUser:${FApiKey}:[DEFAULT]`;
  const is_login = sessionStorage.getItem(_session_key);

  /*
  useEffect(() => {
    console.log(auth);
    if (auth) {
      setUserInfo((prev) => ({ ...prev, emailChecked: true, isLogin: true }));
    }
  }, [auth]);*/

  useEffect(() => {
    onAuthStateChanged(authService, (u) => {
      if (u) {
        if (authService.currentUser.emailVerified) {
          setUserInfo((prev) => ({
            ...prev,
            emailChecked: true,
            isLogin: true,
          }));
          setSessionInfo(sessionStorage.getItem(_session_key));
        } else {
          setUserInfo((prev) => ({
            ...prev,
            emailChecked: false,
            isLogin: true,
          }));
        }
      } else {
        setUserInfo((prev) => ({ ...prev, isLogin: false }));
        setSessionInfo(null);
      }
    });
  }, []);

  useEffect(() => {
    setSessionInfo(sessionStorage.getItem(_session_key));
  }, []);
  return (
    <>
      {sessionInfo ? (
        <Body>
          <Header
            isDesktop={isDesktop}
            isSmallDesktop={isSmallDesktop}
            isTablet={isTablet}
          ></Header>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  isDesktop={isDesktop}
                  isSmallDesktop={isSmallDesktop}
                  isTablet={isTablet}
                />
              }
            />
            <Route
              path="/post/:id"
              element={<PostPage isDesktop={isDesktop} isTablet={isTablet} />}
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/write"
              element={<WritePage isDesktop={isDesktop} isTablet={isTablet} />}
            />
            <Route
              path="/search"
              element={<SearchPage isDesktop={isDesktop} isTablet={isTablet} />}
            />
            <Route path="/message" element={<ChatPage />} />
          </Routes>
          <Footer></Footer>
        </Body>
      ) : (
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      )}
    </>
  );
};

export default App;
