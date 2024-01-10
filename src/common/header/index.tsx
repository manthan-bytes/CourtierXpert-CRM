// create dashboard page component
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import logoblack from "../../assets/images/logo-black.svg";
import userimg from "../../assets/images/userimg.png";
import { ROUTES } from "../../core/constants/routes";

const Header = () => {
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState<any>();
  // Home burger menu
  const [isActive, setIsActive] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const [scrolling, setScrolling] = useState(false);

  const handleLogoutClick = async () => {
    localStorage.removeItem("leadObj");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsActive(!isActive);
    navigate(ROUTES.HOME);
  };

  const handleInstallClick = () => {
    // Show the installation prompt when the button is clicked
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        // Reset the deferredPrompt after user interaction
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleItemClick = () => {
    setIsActive(!isActive);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsActive(false);
    navigate(ROUTES.LOGIN);
    // Perform logout logic
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");
    
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));

    }

    const handleScroll = () => {
      // Check the scroll position
      const scrollY = window.scrollY;
      // Define thresholds for adding and removing classes
      const addClassThreshold = 10;
      const removeClassThreshold = 20;

      // Update the state based on the scroll position
      setScrolling(scrollY > addClassThreshold);
    };
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the default prompt
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
    };
    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };

    // const handleBeforeInstallPrompt = (e:any) => {
    //   // Prevent the default prompt
    //   e.preventDefault();
    //   // Store the event for later use
    //   setDeferredPrompt(e);
    // };

    // // Add the event listener
    // window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // // Clean up the event listener when the component is unmounted
    // return () => {
    //   window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    // };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <header
      id="header"
      className={`header-sec header-bk ${scrolling ? "onscroll" : "scroll"}`}
    >
      <div className="container">
        <div className="custom-row">
          <div className="logo-block-left">
            <Link to="#">
              <img
                className="blacklogo"
                src={logoblack}
                alt="logo"
                width="180"
                height="45"
              />
            </Link>
          </div>
          <div className="menu-block-right">
            <div className="login-user-dateils" onClick={handleItemClick}>
              <div className="user-icon-btn">
                <img src={userimg} alt="user icon" width="48" height="48" />
              </div>
              <div className="use-name">
                <strong>{userInfo?.name}</strong>
                <span>Admin</span>
              </div>
            </div>
            <div className={isActive ? 'active munu-block' : 'munu-block'}>
              <ul>
                <li onClick={handleLogout}>
                  <div className="menu-link" >Logout</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
