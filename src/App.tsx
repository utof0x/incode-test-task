import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Auth, Home } from "components";
import styles from "./App.module.scss";
import { getAccessToken, getIsRefreshTokenExpired } from "utils/functions";
import { useAppDispatch } from "hooks";
import { setUserLogin } from "store/slices/auth";
import { logout } from "store/actions/auth";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      dispatch(setUserLogin(accessToken));
    }
  }, [dispatch]);

  useEffect(() => {
    const isRefreshTokenExpired = getIsRefreshTokenExpired();

    if (isRefreshTokenExpired) {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
