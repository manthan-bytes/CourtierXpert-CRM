import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import Header from "../../common/header";
import MyLeads from "../myleads";
import SidebarMenu from "../sidebarmenu";

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="dashboard">
        <div className="custom-row">
          <div className="left-sidebar">
            <SidebarMenu />
          </div>
          <div className="content-right-block">
            <div className="content-wrap">
              <MyLeads />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
