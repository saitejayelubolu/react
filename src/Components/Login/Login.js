import React, { Component } from "react";
import "./loginf.css";
import { FaLock } from "react-icons/fa";
import Logo from "../../images/hrms.png";
import Pss from "../../images/image-gallery/11.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import Captcha from "./CaptchaTest";
// import Hello from "./LandingPage/Hello";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
  }
  componentDidMount() {
    loadCaptchaEnginge(6);
  }
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  }
  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      let fields = {};
      fields["emailid"] = "";
      fields["password"] = "";
      fields["user_captcha_input"] = "";
      this.setState({ fields: fields });
      alert("login Success");
      // useNavigate("/contacts");
    }
  }
  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    console.log(fields);
    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }
    if (typeof fields["emailid"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    let user_captcha = fields["user_captcha_input"];
    if (!fields["user_captcha_input"]) {
      formIsValid = false;
      errors["user_captcha_input"] = "*Please enter Captcha.";
    }
    if (validateCaptcha(user_captcha) === false) {
      formIsValid = false;
      errors["user_captcha_input"] = "*Please enter Captcha.";
    }
    if (validateCaptcha(user_captcha) === true) {
      alert("Captcha Matched");
    }
    console.log(fields["emailid"]);
    let email = "admin@admin.com";
    if (fields["emailid"] == email && fields["password"] == "123456") {
      // alert("success");
      // <Hello />;
    } else {
      alert("failure");
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    const { username, pwd, errors } = this.state;
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
            onSubmit={this.submituserRegistrationForm}>
            <div className='mb-3'>
              <h2 className='mt-0 mb-5 hrm'>HRMS Login </h2>
            </div>
            <div className='form-group'>
              <label className='lbel'>Email</label>
              <TextField label='' variant='standard' />
              <input
                className='form-control p-0'
                type='text field '
                placeholder='Enter email id'
                name='emailid'
                id='emailid'
                value={this.state.fields.emailid}
                onChange={this.handleChange}
              />
              <div className='errorMsg'>{this.state.errors.emailid}</div>
            </div>

            <div className='form-group'>
              <label className='lbel'>Password</label>
              <input
                className='form-control p-0'
                type='password'
                placeholder='Password'
                name='password'
                id='password'
                value={this.state.fields.password}
                onChange={this.handleChange}
              />
              <div className='errorMsg'>{this.state.errors.password}</div>
            </div>

            <div className='form-group'>
              <label className='lbel'>Captcha</label>
              <input
                placeholder='Enter Captcha Value'
                id='user_captcha_input'
                name='user_captcha_input'
                type='text'
                className='form-control p-0'
                value={this.state.fields.user_captcha_input}
                onChange={this.handleChange}></input>
              <div className='errorMsg'>
                {this.state.errors.user_captcha_input}
              </div>
            </div>
            <div className=' form-group capcha pl-3'>
              <div className='col-md-12 mb-3 text-primary'>
                <LoadCanvasTemplate style={{ display: "flex" }} />
              </div>
            </div>

            <div className='form-group mb-3 form-check'>
              <input className='form-check-input ' type='checkbox' id='rem' />
              <label className='form-check-label px-2 lbel1' for='rem'>
                Reminder Me
              </label>
            </div>
            <div className='form-group mb-3'>
              <button className='btn btn-primary form-control' type='submit'>
                <Link to='/dashboard' className='text-white'>
                  SIGN IN
                </Link>
              </button>
            </div>

            <div className=''>
              <div className='text-center '>
                <span className=''>
                  <FaLock className='m-1 font-size' />
                  <Link to='#' className='underline'>
                    Forgot Password
                  </Link>
                </span>
              </div>
            </div>
          </form>
          {/* <Redirect to="/other_tab" /> */}
        </div>

        {/* <div className="pattern">
                <span className="red"></span>
                <span className="indigo"></span>
                <span className="blue"></span>
                <span className="green"></span>
                <span className="orange"></span>
              </div> */}
      </div>
    );
  }
}
export default Login;
