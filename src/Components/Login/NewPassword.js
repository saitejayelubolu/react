// import React from "react";
import React, { useState } from "react";
import "./Forgotp.css";
import Pss from "../../images/image-gallery/11.jpg";
import { useForm } from "react-hook-form";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
function NewPassword() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user-data"));
  console.log("local", user);
  const uid = user.uid;
  const usertoken = user.token;
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
  const onSubmit = async (data) => {
    // let user = JSON.parse(localStorage.getItem("user-info"));
    // let token = user.data.token.access;
    // let tokenVal = JSON.stringify(token.slice(0, 36));

    // console.log(token);
    // console.log("token length", token.slice(0, 36));
    // data.preventDefault();
    const password = data.password;
    const password2 = data.password2;

    console.log(password);
    console.log(password2);

    await axios
      .post(
        `http://resume.vitelglobal.com:8000/api/user/reset-password/${uid}/${usertoken}`,
        {
          password: password,
          password2: password2,
        },
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log("res", result);
        // navigate("/");
      })
      .catch((err) => {
        console.log("errors", err);
      });
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
            <h2 className='mt-0 mb-5 hrm'>New Password </h2>
          </div>
          <div className='form-group'>
            <label className='lbel'>Password</label>
            <input
              className='form-control p-0'
              type='password'
              placeholder='Password'
              name='password'
              id='password'
              {...register("password", {
                required: " Password Is Required",
              })}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            {errors.password && (
              <small className='text-danger'>{errors.password.message}</small>
            )}
          </div>
          <div className='form-group'>
            <label className='lbel'>Password2</label>
            <input
              className='form-control p-0'
              type='password1'
              placeholder='Password2'
              name='password2'
              id='password2'
              {...register("password2", {
                required: " Password2 Is Required",
              })}
              onKeyUp={() => {
                trigger("password2");
              }}
            />
            {errors.password2 && (
              <small className='text-danger'>{errors.password2.message}</small>
            )}
          </div>

          <div className='form-group mb-3'>
            <button className='btn btn-primary form-control' type='submit'>
              NEW PASSWORD
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
export default NewPassword;
