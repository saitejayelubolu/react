import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import EimDepartment from "./EimDepartment";
import { AiOutlineAppstore } from "react-icons/ai";
import Header from "../../Dashboard/Header";
import SideNavigation from "../../Dashboard/SideNavigation";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InnerSideNavigation from "../../Dashboard/InnerSideNavigation";
import InnerHeader from "../../Dashboard/InnerHeader";
import { FcOk } from "react-icons/fc";
//react-hook-form

import { useForm } from "react-hook-form";
export default function Department() {
  const [value, setValue] = React.useState("1");
  const [addForm, setAddForm] = useState(false);
  const [addButton, setAddButton] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // const handleAddDepartment = () => {
  //   setAddForm(true);
  //   setAddButton(false);
  // };

  return (
    <>
      {/* <Header />
      <InnerSideNavigation /> */}
      <InnerHeader />
      <div className='p-2 mt-80'>
        <DepartmentInnerNav />
        <div className='row p-3 mt-100 '>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <EimDepartment />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row p-3'>
          <div className='col-md-2'></div>
          <div className='col-md-5 '>
            <DepartmentAdd />
          </div>
          <div className='col-md-6'></div>
        </div>
      </div>
    </>
  );
}

//add department

const DepartmentAdd = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const [successAlert, setSuccessAlert] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const [successAlert, setSuccessAlert] = useState(false);
  // const [deleteAlert, setDeleteAlert] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const initialValues = { departmentName: "", description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // console.log(setIsSubmit);
    if (Object.keys(validate(formValues)).length == "0") {
      setFormErrors({});
      setFormValues(initialValues);
      setShow(false);
      setSuccessAlert(true);
    }
  };
  // const handleSuccess = () => {
  //   console.log("errors: ", validate(formValues));
  //   setFormErrors({});
  //   if (validate(formValues).departmentName == undefined) {
  //     setSuccessAlert(true);
  //   }

  //   setFormValues(initialValues);
  // };
  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      setFormErrors({});
    }
  }, [formErrors]);

  const onClear = () => {
    setFormValues(initialValues);
    setFormErrors({});
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    //const onlyDescriptionRegex = /^([a-zA-Z0-9!@$%^&*]){5,220}$/;
    // const pattern = /[a-Z|/\\/|a-Z|/\\/|a-Z\s]/;

    if (!values.departmentName) {
      errors.departmentName = "Department name is required!";
    }
    if (!onlyAlphabetRegex.test(values.departmentName)) {
      errors.departmentName = "Enter only alphabets!";
    }
    // if (!values.description) {
    //   errors.description = "Description is required!";
    // }
    // if (!onlyDescriptionRegex.test(values.description)) {
    //   errors.description = "Description is min 5 characters and max 220!";
    // }
    // if (!values.departmentSelect) {
    //   errors.departmentSelect = "Select status   is required!";
    // }
    return errors;
  };
  return (
    <div>
      <button onClick={handleShow} className='btn btn-primary '>
        Add
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-3' onSubmit={handleSubmit}>
            <Form.Group
              className='mb-3 w-100'
              controlId='exampleForm.ControlInput1'>
              <Form.Label className='fs-bold'>
                Department Name
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='departmentName'
                value={formValues.departmentName}
                onChange={handleChange}
              />
              <p className='text-danger'>{formErrors.departmentName}</p>
            </Form.Group>
            <Form.Group
              className='mb-3  w-100'
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>Description</Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                rows='3'
                value={formValues.description}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.description}</p>
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1 w-50 '></Form.Group>
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
      {/* success */}
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
