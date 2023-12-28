// create dashboard page component
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
import btnloader from "../../assets/images/btn-loader.svg";
import { TEXT } from "../../core/constants/headingText";
import { ChatbotIcon } from "../../core/icons";

const Home = () => {

  const [newClass, setNewClass] = useState(false);
  // const [activeClass, setActiveClass]=useState('');
  const [chatbotClass, setChatbotClass] = useState<boolean>(false);

  useEffect(() => {
    const element: any = document.getElementById("header");
    if (element) {
      element.classList.remove('header-bk')
    }
    setNewClass(true);
  }, []);
  return (
    <section className="main-banner">
      <div className="homepage-banner-video-overlay"></div>
      <video
        className="connect-bg"
        src="https://media.giphy.com/media/klIaoXlnH9TMY/giphy.mp4"
        muted
        autoPlay
        loop
        playsInline
      ></video>
      <div className="banner-content-main">
        <div className="container">
          <div className="custom-row">
            <div className="banner-content-block">
              <span>{TEXT.SIMPLIFIED_REAL_ESTATE} </span>
              <h1 className="h1">
                {TEXT.HOME1} <br />
                {TEXT.HOME2}
              </h1>
              <Link to="/login" className="theme_btn grdnt_btn">
                {TEXT.I_AM_READY}
              </Link>

              <div className="get-started-btn">
                <img
                  src={btnloader}
                  alt="btn-animation.svg"
                  width="196"
                  height="196"
                />
                <Link to="#">{TEXT.GET_STARTED}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
