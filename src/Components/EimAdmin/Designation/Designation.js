import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DesignationMaster from "./DesignationMaster";
import { FcOk } from "react-icons/fc";
import Header from "../../Dashboard/Header";
// import SideNavigation from "../../Dashboard/SideNavigation";
import InnerSideNavigation from "../../Dashboard/InnerSideNavigation";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import Modal from "react-bootstrap/Modal";
import InnerHeader from "../../Dashboard/InnerHeader";
function Designation() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <DepartmentInnerNav />
        <div className='row p-3 mt-100'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <DesignationMaster />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <AddDesignation />
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    </>
  );
}
const AddDesignation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormValues({ initialValues });
    setShow(true);
  };
  const initialValues = {
    designationCode: "",
    designationName: "",
    departmentName: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(validate(formValues)).length == "0") {
      setFormErrors({});
      setFormValues(initialValues);
      setShow(false);
      setSuccessAlert(true);
    }
  };
  // const handleSuccess = () => {
  //   setFormErrors({});
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     setSuccessAlert(true);
  //   }
  // };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const onClear = () => {
    setFormValues(initialValues);
    setFormErrors({});
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyNumberRegex = /^[0-9]+$/;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    const onlyAlphaNumericRegex = /^[A-Za-z0-9]+$/;

    if (!values.designationCode) {
      errors.designationCode = "Designation code is required!";
    } else if (!onlyAlphaNumericRegex.test(values.designationCode)) {
      errors.designationCode = "Enter only AlphaNumeric Values!";
    }
    if (!values.designationName) {
      errors.designationName = "Designation name is required!";
    } else if (!onlyAlphabetRegex.test(values.designationName)) {
      errors.designationName = "Enter only alphabets!";
    }
    if (!values.departmentName) {
      errors.departmentName = "Department name  is required!";
    }

    return errors;
  };
  return (
    <div>
      <button onClick={handleShow} className='btn btn-primary '>
        Add
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='m-3' onSubmit={handleSubmit}>
            <Form.Group
              className='mb-3 w-100'
              controlId='exampleForm.ControlInput1'>
              <Form.Label className='fs-bold'>
                Designation Code
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='designationCode'
                value={formValues.designationCode}
                onChange={handleChange}
              />
              <p className='text-danger'>{formErrors.designationCode}</p>
            </Form.Group>
            <Form.Group
              className='mb-3 w-100'
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                Designation Name
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='designationName'
                value={formValues.designationName}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.designationName}</p>
            </Form.Group>
            <Form.Group
              className='mb-3 w-100'
              controlId='exampleForm.ControlInput1'>
              <Form.Label>
                Department Name
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <select
                name='departmentName'
                className='form-control '
                value={formValues.departmentName}
                onChange={handleChange}>
                <option>Select Department</option>
                <option>Development</option>
                <option>HR</option>
                <option>Sales</option>
                <option>Digital Marketing</option>
              </select>
              <p className='text-danger'>{formErrors.departmentName}</p>
            </Form.Group>

            <Form.Group
              className='mb-3 w-100'
              controlId='exampleForm.ControlInput1 '></Form.Group>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='reset'
              onClick={onClear}>
              Clear
            </Button>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='submit'
              // onClick={handleSuccess}
            >
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* success popup */}
      <Modal
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Added Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setSuccessAlert(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Designation;
