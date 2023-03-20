import React, { useRef, useState, useEffect, useAuth } from "react";
import "./loginf.css";
import { FaLock } from "react-icons/fa";
import Pss from "../../images/image-gallery/11.jpg";
import { Link, Routes, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
// import { useNavigate, useLocation } from "react-router-dom";
// const LOGIN_URL = "http://resume.vitelglobal.com:8000/loginhrms/";
function LoginForm() {
  const [val, setVal] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/dashboard");
    }
  }, []);
  console.log("Get check val", val);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    clearErrors,
    getValues,
    setValue,
  } = useForm({});

  console.log("get values", getValues("reminder"));

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const data = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9";
  console.log("token length", data.length);
  const onSubmit = async (data) => {
    // data.preventDefault();
    const email = data.email;
    const password = data.password;
    // let userObj = { email, password };
    console.log("data::", data);
    console.log(password);

    await axios
      .post(
        "http://resume.vitelglobal.com:8000/api/user/login/",
        {
          email: email,
          password: password,
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
        if ((result.reminder = true)) {
          // result = result.json();
          localStorage.setItem("user-info", JSON.stringify(result));
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };

  return (
    <>
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
                })}
                onKeyUp={() => {
                  trigger("username");
                }}
              />
              {errors.email && (
                <small className='text-danger'>{errors.email.message}</small>
              )}
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
            {/* <div className='form-group'>
              <label className='lbel'>Captcha</label>
              <input
                placeholder='Enter Captcha Value'
                id='user_captcha_input'
                name='user_captcha_input'
                type='text'
                className='form-control p-0' */}
            {/* // value={user_captcha_input}
                // onChange={handleChange} */}
            {/* {...register("user_captcha_input", {
                  required: " user_captcha_input Is Required",
                })}
                onKeyUp={() => {
                  trigger("user_captcha_input");
                }}
              />
              {errors.user_captcha_input && (
                <small className='text-danger'>
                  {errors.user_captcha_input.message}
                </small>
              )}
            </div>
            <div className=' form-group capcha   pl-3'>
              <div className='col-md-12 mb-3 text-primary'>
                <LoadCanvasTemplate style={{ display: "flex" }} />
                {/* <LoadCanvasTemplate reloadText='Reload My Captcha' /> */}
            {/* </div>
            </div> */}
            {/* jhasdjhasjhd */}
            <ReCAPTCHA
              sitekey='6LcGPIohAAAAAGdb-VQ-qT9XWFqvYk73KmL3NyMm'
              // onChange={onChange}
              // name='user_captcha_input'
              // {...register("user_captcha_input", {
              //   required: " user_captcha_input Is Required",
              // })}
              // onKeyUp={() => {
              //   trigger("user_captcha_input");
              // }}
            />
            {errors.user_captcha_input && (
              <small className='text-danger'>
                {errors.user_captcha_input.message}
              </small>
            )}

            {/* <div class='text-right'></div> */}
            <div className='form-group mb-3 form-check'>
              <input
                className='form-check-input '
                type='checkbox'
                id='reminder'
                onChange={(e) => {
                  setValue("reminder", e.target.checked ? true : false);
                  setVal(!val);
                }}
                // checked={val}
                {...register("reminder")}
              />
              <label className='form-check-label px-2 lbel1' for='reminder'>
                Reminder Me
              </label>
            </div>
            {/* <div className='form-actions'>
              <br />
              <div className='form-check'>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='rememberPassword'
                  name='checkbox'
                  // checked={rememberPassword}
                  // onChange={(event) => handleChechbox(event)}

                />
                <label className='form-check-label' for='rememberPassword'>
                  Remember me
                </label>
              </div>
            </div> */}
            <div className='form-group mb-3'>
              <button className='btn btn-primary form-control' type='submit'>
                SIGN IN
              </button>
            </div>
            <div className=''>
              <div className='text-center '>
                <span className=''>
                  <FaLock className='m-1 font-size' />
                  <Link to='/reset' className='underline'>
                    Forgot Password
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default LoginForm;
