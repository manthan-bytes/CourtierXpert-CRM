import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import Header from "../../common/header";
import MyLeads from "../myleads";
import SidebarMenu from "../sidebarmenu";
import Users from "../users";

const Dashboard = () => {
  const [getMenu, setMenu] = useState<any>();
  console.log("🚀 ~ file: index.tsx:11 ~ Dashboard ~ getMenu:", getMenu)

  
  useEffect(() => {
    setMenu('lead')
  },[])
  return (
    <>
      <Header />
      <section className="dashboard">
        <div className="custom-row">
          <div className="left-sidebar">
            <SidebarMenu setMenu={setMenu} getMenu={getMenu}/>
          </div>
          <div className="content-right-block">
            <div className="content-wrap">
              {getMenu === 'lead' && <MyLeads />}
              {getMenu === 'user' && <Users />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
