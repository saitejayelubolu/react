import React, { Component, Fragment } from "react";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ModalPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studName: "",
      week1: "select",
      week2: "select",
      formErrors: {},
      showModal: false,
    };

    this.handleChange1 = this.handleChange1.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange1(date) {
    this.setState({
      startDate: date,
    });
  }
  handleChange2(date) {
    this.setState({
      endDate: date,
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  handleFormValidation() {
    const { studName, week1, week2 } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //Student name
    if (!studName) {
      formIsValid = false;
      formErrors["bussiness"] = "This value is required..";
    }

    //week1
    if (week1 === "" || week1 === "select") {
      formIsValid = false;
      formErrors["weekErr"] = "This value is required..";
    }

    //week2
    if (week2 === "" || week2 === "select") {
      formIsValid = false;
      formErrors["weekErr2"] = "This value is required..";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleFormValidation()) {
      alert("You have been successfully registered.");
      this.setState(this.initialState);
    }
  };

  isShowModal = (status) => {
    this.handleClose();
    this.setState({ showModal: status });
  };

  handleClose = () => {
    this.props.onPopupClose(false);
  };

  render() {
    const { bussiness, weekErr, weekErr2 } = this.state.formErrors;

    return (
      <>
        <Fragment>
          <Modal
            show={this.props.showModalPopup}
            onHide={this.handleClose}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered>
            <Modal.Header closeButton>
              <Modal.Title id='sign-in-title'>
                Edit Leave Configuration
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className='row'>
                    <div className='col-md-12'>
                      <label htmlFor='studName'>Business Unit *</label>
                      <select
                        type='text'
                        name='studName'
                        value={this.state.studName}
                        onChange={this.handleChange}
                        placeholder='Select Business Unit *.'
                        className='form-control'>
                        <option value=''>--Select Business Unit -- </option>
                        <option value='11'>BU1-VPST</option>
                        <option value='34'>
                          BU1-Vitel Global Communication
                        </option>
                        <option value='35'>
                          BU1-PRANATHI SOFTWARE SERVICES
                        </option>
                        <option value='36'>BU1-GOOGLE</option>
                        <option value='37'>
                          BU1-Pranathi software soultions
                        </option>
                        <option value='38'>BU1-Varun technologies</option>
                        <option value='39'>BU1-CES ltd</option>
                        <option value='40'>BU1-VHS Ltd</option>
                        <option value='41'>BU1-sample company</option>
                        <option value='42'>BU1-decimalaaaaaaa</option>
                        <option value='44'>BU1-VTG INDIA PVT LTD</option>
                        <option value='45'>BU1-Audi</option>
                      </select>
                      {bussiness && (
                        <div style={{ color: "red", paddingBottom: 10 }}>
                          {bussiness}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                      <label>Start Month and Year</label>
                      <form onSubmit={this.onFormSubmit}>
                        <div className='form-group'>
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange1}
                            name='startDate'
                            dateFormat='dd/MM/yyyy'
                            className='form-control'
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                      <label>End Month and Year</label>
                      <form onSubmit={this.onFormSubmit}>
                        <div className='form-group'>
                          <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleChange2}
                            name='endDate'
                            dateFormat='dd/MM/yyyy'
                            className='form-control'
                          />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                      <div>
                        <label htmlFor='week1'>weekend_1</label>
                        <select
                          name='week1'
                          onChange={this.handleChange}
                          className='form-control'
                          value={this.state.week1}>
                          <option value='select'>--Select Weekend 1 --</option>
                          <option value='1'>Monday</option>
                          <option value='2'>Tuesday</option>
                          <option value='3'>Wednesday</option>
                          <option value='4'>Thursday</option>
                          <option value='5'>Friday</option>
                          <option value='6'>Saturday</option>
                          <option value='7'>Sunday</option>
                        </select>
                        {weekErr && (
                          <div style={{ color: "red", paddingBottom: 10 }}>
                            {weekErr}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12'>
                      <div>
                        <label htmlFor='week2'>weekend_2</label>
                        <select
                          name='week2'
                          onChange={this.handleChange}
                          className='form-control'
                          value={this.state.week2}>
                          <option value='select'>--Select Weekend 2 --</option>
                          <option value='1'>Monday</option>
                          <option value='2'>Tuesday</option>
                          <option value='3'>Wednesday</option>
                          <option value='4'>Thursday</option>
                          <option value='5'>Friday</option>
                          <option value='6'>Saturday</option>
                          <option value='7'>Sunday</option>
                        </select>
                        {weekErr2 && (
                          <div style={{ color: "red", paddingBottom: 10 }}>
                            {weekErr2}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class='col-12 mt-4'>
                    {/* <input type="button" value="clear"  className="btn btn-secondary" /> */}
                    <button
                      className='btn btn-secondary leaconf link-button'
                      type='button'
                      onClick={() => this.isShowModal(true)}>
                      Close
                    </button>
                    <button className='btn btn-primary' type='submit'>
                      Update
                    </button>
                    {/* <input type="submit" value="Submit" /> */}
                  </div>
                </form>
              </div>

              {/* <div className="signUp">  
                            <p>Want to close the pop up?<button type="button" className="link-button" onClick={() => this.isShowModal(true)}>Close</button></p>  
                        </div>   */}
            </Modal.Body>
          </Modal>
        </Fragment>
      </>
    );
  }
}

export default ModalPopup;
