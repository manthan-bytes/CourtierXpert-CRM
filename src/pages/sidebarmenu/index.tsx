// create dashboard page component
import React from "react";
import { Link } from "react-router-dom";
import "./sidebarmenu.scss";
import { LeadsIcon, UsersIcon, AgentsIcon } from "../../core/icons";

const SidebarMenu = () => {
  return (
    <ul className="sidebar-menu">
      <li>
        <Link to="" className="nav active">
          <span>
            <LeadsIcon />
          </span>
          My Leads
        </Link>
      </li>
      <li>
        <Link to="" className="nav">
          <span>
            <UsersIcon />
          </span>
          Users
        </Link>
      </li>
      <li>
        <Link to="" className="nav">
          <span>
            <AgentsIcon />
          </span>
          Agents
        </Link>
      </li>
    </ul>
  );
};

export default SidebarMenu;
