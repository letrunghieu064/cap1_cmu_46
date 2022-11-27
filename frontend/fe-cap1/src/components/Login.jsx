import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, redirect } from "react-router-dom";
import "./Login.css";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login } from "../actions/auth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiFillLinkedin } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
const required = (value) => {
  if (!value) {
    return (
      <div className="validate__input" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("isLoggedIn", isLoggedIn);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          window.location.replace("/home");
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    window.location.replace("/home");
    //return redirect("/home");
  }

  return (
    <div className=" home">
      <div className=" container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}

        <Form
          onSubmit={handleLogin}
          ref={form}
          className="form_container-login"
        >
          <div>
            <h2 className="form__title">Sign in to Website</h2>
            <div className="container__icon">
              <a href="" className="login__icon">
                <AiFillLinkedin className="login__icon-items" />
              </a>
              <a href="" className="login__icon">
                <BsFacebook className="login__icon-items" />
              </a>
              <a href="" className="login__icon">
                <BsTwitter className="login__icon-items" />
              </a>
            </div>
            <div>
              <p className="login__text">or use your emaill account</p>
            </div>
          </div>
          <div></div>
          <div className=" form-login">
            {/* <label htmlFor="username">Username</label> */}
            <Input
              type="text"
              className="login-input"
              name="username"
              value={username}
              placeholder="Email/User Name"
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className=" form-login">
            {/* <label htmlFor="password">Password</label> */}
            <Input
              type="password"
              className="login-input"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div>
            <a className="form__link" href="#">
              Forgot your password
            </a>
          </div>
          <div className=" form-login">
            <button
              className="btn btn-primary btn-block button-login"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className=" form-login">
              <div className="alert alert-danger validate__input" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
