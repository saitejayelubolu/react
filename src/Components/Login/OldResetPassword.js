// import React from "react";
import React, { Component } from "react";
import "./Forgotp.css";

import Logo from "../../images/hrms.png";
import { Link } from "react-router-dom";

// let Forgotp = function(){

class ResetPassword extends Component {
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
      this.setState({ fields: fields });
      console.log(this.state);
      alert("Form submitted");
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

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  render() {
    return (
      <div style={{ height: "100vh" }} className='bcg-img '>
        <div className='page-loader-wrapper' style={{ display: "none" }}>
          <div className='loader'>
            <div className='bar1'></div>
            <div className='bar2'></div>
            <div className='bar3'></div>
            <div className='bar4'></div>
            <div className='bar5'></div>
          </div>
        </div>

        <div
          className='container'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}>
          <div className='bg-white'>
            <div className='row'>
              <div className='col xs={6}'>
                <div className='img'>
                  <img className='img-fluid login-img' src={Logo} alt='img' />
                </div>
              </div>
              <div className='col xs={6} self-a'>
                <form
                  className=' flex-c form-width justify-content-md-center'
                  method='post'
                  onSubmit={this.submituserRegistrationForm}>
                  <div className='mb-3 text-center'>
                    <h5 className='mt-3'> Forgot Your Password? </h5>
                  </div>
                  <div className='form-group mb-3'>
                    <p className='text-center color'>
                      Please enter email to recover password.
                    </p>
                  </div>
                  <div className='form-group mb-3'>
                    <input
                      className=' t-color form-control rounded-pill'
                      type='text'
                      placeholder='Enter email'
                      name='emailid'
                      id='emailid'
                      value={this.state.fields.emailid}
                      onChange={this.handleChange}
                    />
                    <div className='errorMsg'>{this.state.errors.emailid}</div>
                  </div>

                  <div className='form-group mb-3'>
                    <button
                      className='btn btn-primary rounded-pill form-control'
                      type='submit'>
                      RESET PASSWORD
                    </button>
                  </div>

                  <div className='mt-4 text-center'>
                    <span className='t-color'>
                      Know your password?{" "}
                      <Link to='/' className='underline'>
                        Login
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
              <div className='pattern'>
                <span className='red'></span>
                <span className='indigo'></span>
                <span className='blue'></span>
                <span className='green'></span>
                <span class='orange'></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetPassword;
