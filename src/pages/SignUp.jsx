import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../redux/features/userSlice";
import {
  EMAIL_REGEX,
  MOBILE_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../Constants/RegexConstants";
import apiService from "../Services/Api Services/ApiServices";

export const checkAlreadyRegisterd = (email, users) => {
  const existed = users.some((user) => user.email === email);
  return existed;
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService.get(`/signUp`).then((res) => setUsers(res.data)).catch(err => console.log("signup api error"));
  }, []);

  const signUpValidation = (values) => {
    const mobileRegex = MOBILE_REGEX;
    const emailRegex = EMAIL_REGEX;
    const passwordRegex = PASSWORD_REGEX;
    const usernameRegex = USERNAME_REGEX;
    const nameRegex = NAME_REGEX;

    const errors = {};
    if (values.name === "") {
      errors.name = "Name is Required";
    } else if (!nameRegex.test(values.name)) {
      errors.name = "Invalid name";
    }
    if (values.userName === "") {
      errors.userName = "userName is Required";
    } else if (!usernameRegex.test(values.userName)) {
      errors.userName = "Invalid username";
    }
    if (values.email === "") {
      errors.email = "Email is Required";
    } else if (checkAlreadyRegisterd(values.email, users)) {
      errors.email = "Already Registered";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password === "") {
      errors.password = "Password is Required";
    } else if (values.password.length < 8) {
      errors.password = "Password should contain minimun 8 characters";
    } else if (values.password.length > 20) {
      errors.password = "password shouldn't contain more than 20 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Should contain atleast one uppercase, lowercase,special character and number";
    }

    if (
      values.contactNumber !== "" &&
      !mobileRegex.test(values.contactNumber)
    ) {
      errors.contactNumber = "Please Provide Valid Mobile Number";
    }

    return errors;
  };
  const singUpFormik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      contactNumber: "",
      password: "",
      profileImage: "",
    },
    validate: signUpValidation,
    onSubmit: (values) => {
      apiService
        .post(`/signUp`, values)
        .then((res) => {
          dispatch(signInUser(res.data));
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .then(() => navigate("/dashBoard"))
        .catch((err) => console.log(err));
    },
  });
  return (
    <div className="bg-dark d-flex min-vh-100 justify-content-center text-white align-items-center">
      <div className="w-50 border border-primary bg-white text-dark p-3 rounded">
        <h1 className="mx-3">Registration</h1>

        <form onSubmit={singUpFormik.handleSubmit}>
          <div className="form-floating m-3">
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter name"
              value={singUpFormik.name}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="name">Name*</label>
            {singUpFormik.errors.name && singUpFormik.touched.name && (
              <div className="text-danger"> {singUpFormik.errors.name} </div>
            )}
          </div>

          <div className="form-floating m-3">
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={singUpFormik.userName}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="userName">Username*</label>
            {singUpFormik.errors.userName && singUpFormik.touched.userName && (
              <div className="text-danger">{singUpFormik.errors.userName} </div>
            )}
          </div>

          <div className="form-floating m-3">
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter email"
              value={singUpFormik.email}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="email">Email*</label>
            {singUpFormik.errors.email && singUpFormik.touched.email && (
              <div className="text-danger"> {singUpFormik.errors.email} </div>
            )}
          </div>

          <div className="form-floating m-3">
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              className="form-control"
              placeholder="Enter contact number"
              value={singUpFormik.contactNumber}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="contactNumber">Contact Number</label>
            {singUpFormik.errors.contactNumber &&
              singUpFormik.touched.contactNumber && (
                <div className="text-danger">
                  {singUpFormik.errors.contactNumber}
                </div>
              )}
          </div>

          <div className="form-floating m-3">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={singUpFormik.password}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="password">password*</label>
            {singUpFormik.errors.password && singUpFormik.touched.password && (
              <div className="text-danger">
                {singUpFormik.errors.password}
              </div>
            )}
          </div>

          <div className="form-floating m-3">
            <input
              id="profileImage"
              name="passprofileImageword"
              type="file"
              className="form-control"
              placeholder="Enter password"
              value={singUpFormik.profileImage}
              onChange={singUpFormik.handleChange}
              onBlur={singUpFormik.handleBlur}
            />
            <label htmlFor="profileImage">Profile Image</label>
          </div>
          <div className="">
            <input
              className="btn btn-primary rounded mx-3 btn-lg"
              type="submit"
              value="Register"
            />
            <span>
              Aleready Registere? <Link to="/">click here</Link> to login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
