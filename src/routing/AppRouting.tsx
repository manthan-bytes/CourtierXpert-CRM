import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import NotFound from "../pages/NotFound";
import PrivateLayout from "./layout/PrivateLayout";
import PublicLayout from "./layout/PublicLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/home";
import { ROUTES } from "../core/constants/routes";
import MyLeads from "../pages/myleads";

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
        <Route path={ROUTES.DASHBOARD} index element={<Dashboard />} />
        <Route path={ROUTES.MYLEADS} index element={<MyLeads />} />
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
