// create dashboard page component
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebarmenu.scss";
import { LeadsIcon, UsersIcon, AgentsIcon } from "../../core/icons";

const SidebarMenu = ({setMenu,getMenu}:any) => {
  // const [getMenu, setMenu] = useState<any>([]);

  const handleLeadClick = () => {
    setMenu('lead');
  }

  const handuserClick = () => {
    setMenu('user');
  }
  return (
    <ul className="sidebar-menu">
      <li>
        <div onClick={handleLeadClick}  className={`nav ${
        getMenu==='lead' ? "active" : ""
      }`}>
          <span>
            <LeadsIcon />
          </span>
          My Leads
        </div>
      </li>
      <li>
        <div onClick={handuserClick}  className={`nav ${
        getMenu==='user' ? "active" : ""
      }`}>
          <span>
            <UsersIcon />
          </span>
          Users
        </div >
      </li>
      {/* <li>
        <Link to="" className="nav">
          <span>
            <AgentsIcon />
          </span>
          Agents
        </Link>
      </li> */}
    </ul>
  );
};

export default SidebarMenu;
