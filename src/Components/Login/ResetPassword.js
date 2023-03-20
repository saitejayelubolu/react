// import React from "react";
import React, { useState, useEffect } from "react";
import "./Forgotp.css";
import Pss from "../../images/image-gallery/11.jpg";
import { useForm } from "react-hook-form";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function ResetPassword() {
  const [userId, setUserId] = useState([]);
  const [userToken, setUserToken] = useState();
  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/reset");
    }
  }, []);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm();
  const onSubmit = async data => {
    // data.preventDefault();
    const email = data.email;

    console.log(email);

    await axios
      .post(
        "http://resume.vitelglobal.com:8000/api/user/send-reset-password-email/",
        {
          email: email,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(result => {
        let userids = result.data;
        console.log("so id get", userids);
        localStorage.setItem("user-data", JSON.stringify(result.data));
        setUserId(userids);
        // setUserToken(usertokens);
        console.log("res", result);
        navigate("/");
      })
      .catch(err => {
        console.log("errors", err);
      });
    console.log("user id saved", userId);
  };
  return (
    <div className='loginmain'>
      <div className='imsg'>
        <img src={Pss} alt='' className='w-100 h-100' />
      </div>
      <div className='imsg1'>
        <form
          method='post'
          name='userRegistrationForm'
          className='flex-c form-width justify-content-md-center logform'
          onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <h2 className='mt-0 mb-5 hrm'>HRMS Login </h2>
          </div>
          <div className='form-group'>
            <label className='lbel'>Email</label>
            <input
              className='form-control p-0'
              type='text'
              placeholder='Enter email id'
              name='email'
              id='email'
              {...register("email", {
                required: " email Id Is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
              onKeyUp={() => {
                trigger("username");
              }}
            />
            {errors.email && (
              <small className='text-danger'>{errors.email.message}</small>
            )}
          </div>

          <div className='form-group mb-3'>
            <button className='btn btn-primary form-control' type='submit'>
              RESET PASSWORD
            </button>
          </div>
          <div className='mt-4 text-center'>
            <span className='t-color'>
              Know your password?
              <Link to='/' className='underline'>
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
