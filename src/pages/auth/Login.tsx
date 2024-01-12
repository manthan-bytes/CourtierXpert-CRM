// create login page component
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../store/features/AuthSlice";
import { useAppDispatch } from "../../store/store";
import ButtonSubmit from "../../components/Button/ButtonSubmit";
import "./Login.scss";
import { RightIcon, EyehideIcon, EyeIcon } from "../../core/icons";
import loginbg from "../../assets/images/login.jpg";
import logoblack from "../../assets/images/logo-black.svg";
import { getUser, login } from "../service/login.service";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  // state for email and password
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // submit handler
  const submitHandler = async () => {
    // e.preventDefault();
    const element: any = document.getElementById("submit");
    if (element) {
      element.classList.add("loader-btn");
    }
    await login({ email: username, password: password })
      .then((response: any) => {
        if (response.statusCode === 200) {
          localStorage.setItem("token", response.data.access_token);
          getUser(username).then((userInfo) => {
            localStorage.setItem("UserInfo",JSON.stringify(userInfo.data))

          }).catch((error) => {
            console.log("🚀 ~ userInfo ~ error:", error)
            
          });
          toast.success(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/dashboard");
        } else {
          toast.error(response.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        element.classList.remove("loader-btn");
        // localStorage.setItem("token", response.data.data.access_token);
        // navigate("/dashboard");
      })
      .catch((err: any) => {
        element.classList.remove("loader-btn");

        console.log("Login submit err", err);
      });
  };

  // Password show hide
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="login-sec">
      <div className="custom-row">
        <div className="contact-block">
          <div className="logo-block-login">
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
          <div className="form-wrap">
            <form>
              <h1 className="h1">Welcome Back!</h1>
              <p>Kindly enter your details to continue with us!</p>
              <div className="form-inner-block">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {/* <span className="error-msg">Contact Number is required</span> */}
                </div>
                <div className="form-group">
                  <div className="eye_icon">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="password-eye"
                      type="button"
                      onClick={handleTogglePassword}
                    >
                      {/* {showPassword ? <EyehideIcon /> : <EyeIcon />} */}
                    </button>
                  </div>
                  {/* <span className="error-msg">Contact Number is required</span> */}
                </div>

                <div className="form-bottom-bock">
                  <ul className="property-select">
                    <li>
                      {/* <label className="custom-checkbox">
                        <input type="checkbox" name="pool" value="pool" />
                        <div className="checkbox-lable">
                          <RightIcon />
                        </div>
                        <span>Remember</span>
                      </label> */}
                    </li>
                  </ul>
                  {/* <Link className="btn-link" to="/dashboard">
                    Forget Password?
                  </Link> */}
                </div>
              </div>
           
              <div className="theme_btn grdnt_btn" onClick={submitHandler} id="submit"> <span>Login</span></div>
              {/* <ButtonSubmit title="Login" disabled={false} /> */}
            </form>
          </div>

          {/* <div className="form-wrap forget-pswd">
            <form onSubmit={submitHandler}>
              <h1 className="h1">Forget Password</h1>
              <div className="form-inner-block">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <span className="error-msg">Contact Number is required</span>
                </div>
                <div className="form-bottom-bock">
                  <Link className="btn-link" to="/dashboard">
                    Back to Login
                  </Link>
                </div>
              </div>
              <div className="theme_btn grdnt_btn">Submit</div>
            </form>
          </div> */}
        </div>
        <div className="right-block-img">
          <img src={loginbg} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Login;
