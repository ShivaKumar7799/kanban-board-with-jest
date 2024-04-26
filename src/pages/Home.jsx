import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/features/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import apiService from "../Services/Api Services/ApiServices";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [users, setUsers] = useState([]);
  const [invalidUser, setInvalidUser] = useState(false);

  useEffect(() => {
    apiService.get(`/signUp`).then((res) => setUsers(res.data)).catch(err => console.log("signup api error"));
  }, []);

  const loginValidation = (values) => {
    setInvalidUser(false);
    const errors = {};

    if (values.userNameOrEmail === "") {
      errors.userNameOrEmail = "UserName/email is Mandatory";
    }

    if (values.password === "") {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password should contain minimun 8 characters";
    } else if (values.password.length > 20) {
      errors.password = "password shouldn't contain more than 20 characters";
    }

    return errors;
  };

  const loginFormik = useFormik({
    initialValues: {
      userNameOrEmail: "",
      password: "",
    },
    validate: loginValidation,
    onSubmit: (values) => {
      const validUser = users.filter(
        (user) =>
          (user.userName === values.userNameOrEmail ||
            user.email === values.userNameOrEmail) &&
          user.password === values.password
      );
      if (validUser.length > 0) {
        navigate("/dashBoard");
        dispatch(signInUser(validUser[0]));
        localStorage.setItem("user", JSON.stringify(validUser[0]));
      } else {
        setInvalidUser(true);
      }
    },
  });
  return (
    <div className="d-flex justify-content-center min-vh-100 bg-dark align-items-center">
      <div
        className="w-50 border border-primary rounded py-3 px-5 bg-white h-75"
        style={{ minHeight: "375px" }}
      >
        <h1 className="text-center text-dark"> Kanban Board</h1>

        <form onSubmit={loginFormik.handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="userNameOrEmail">Username/email</label>
            <input
              type="text"
              name="userNameOrEmail"
              id="userNameOrEmail"
              className="form-control"
              placeholder="Please enter your username or email here"
              value={loginFormik.userNameOrEmail}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
            {loginFormik.errors.userNameOrEmail &&
              loginFormik.touched.userNameOrEmail && (
                <span className="text-danger py-2">
                  {loginFormik.errors.userNameOrEmail}
                </span>
              )}
          </div>

          <div className="d-flex flex-column">
            <label htmlFor="password">password*</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={loginFormik.password}
              className="form-control"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
            />
            <span
              className="text-primary cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide password" : "show password"}{" "}
            </span>
            {loginFormik.errors.password && loginFormik.touched.password && (
              <span className="text-danger py-2">
                {loginFormik.errors.password}
              </span>
            )}
          </div>

          <div>
            {invalidUser && (
              <div className="text-danger pt-2">
                Invalid Username or Password
              </div>
            )}
          </div>

          <div className="d-flex justify-content-center py-3">
            <input
              className="btn btn-success btn-lg"
              type="submit"
              value="Login"
            />
          </div>

          <div>
            <span>
              Don't have account? <Link to="/signUp">Register Here</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
