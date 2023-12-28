import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/NotFound";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/home";
import { ROUTES, SELLER, BUYER } from "../core/constants/routes";

const AppRouting = () => {
  return (
    <Routes>
      {/* Private route start */}
      <Route path="/">
        <Route path={ROUTES.HOME} index element={<Home />} />

        <Route path="/" element={<Navigate to="/home" />} />
      </Route>

      <Route path="/" element={<PublicLayout />}>
        <Route path={ROUTES.LOGIN} index element={<Login />} />
      </Route>
      {/* <Route path="/home"> */}
      {/* </Route> */}

      {/* Private route end */}

      {/* Public route start */}
      {/* <Route path="/" element={<PublicLayout />}>
        <Route path="/" index element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Route> */}
      {/* Public route end */}

      {/* Not found route start */}
      <Route path="*" element={<NotFound />} />
      {/* Not found route end */}
    </Routes>
  );
};

export default AppRouting;
