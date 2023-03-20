import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Branches from "./Branches";
import Modal from "react-bootstrap/Modal";
import InnerHeader from "../../Dashboard/InnerHeader";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import { AiOutlineAppstore } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
export default function Branch() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <DepartmentInnerNav />
        <div className='row p-3 mt-100 '>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <Branches />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row p-3'>
          <div className='col-md-2'></div>
          <div className='col-md-5 '>
            <AddBranch />
          </div>
          <div className='col-md-6'></div>
        </div>
      </div>
    </>
  );
}

//Add branch
const AddBranch = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFormValues({ initialValues });
  };

  const initialValues = {
    businessUnit: "",
    businessName: "",
    locationName: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  //const [errors, setErrors] = useState({});

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
    // errors.businessUnit = "";
    // errors.businessName = "";
    // errors.locationName = "";
  };

  const validate = (values) => {
    const errors = {};

    const onlyNumberRegex = /^[0-9]+$/;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    if (!values.businessUnit) {
      errors.businessUnit = "Business unit is required!";
    }
    if (!values.businessName) {
      errors.businessName = "Business name is required!";
    } else if (!onlyAlphabetRegex.test(values.businessName)) {
      errors.businessName = "Enter only alphabets!";
    }
    if (!values.locationName) {
      errors.locationName = "Location name  is required!";
    }
    // if (!values.departmentSelect) {
    //   errors.departmentSelect = "Select status   is required!";
    // }
    return errors;
  };
  return (
    <>
      <div>
        <button onClick={handleShow} className='btn btn-primary '>
          Add
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Branch</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='p-3' onSubmit={handleSubmit}>
              <Form.Group
                className='mb-3 w-100'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>
                  Business Unit
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <select
                  name='businessUnit'
                  className='form-control'
                  value={formValues.businessUnit}
                  onChange={handleChange}>
                  <option>Select Business Unit </option>
                  <option>Business Unit</option>
                  <option>Business Unit1</option>
                  <option>Business Unit2</option>
                </select>
                <p className='text-danger'>{formErrors.businessUnit}</p>
              </Form.Group>
              <Form.Group
                className='mb-3 w-100 '
                controlId='exampleForm.ControlTextarea1'>
                <Form.Label className='fs-bold'>
                  Business Name
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <Form.Control
                  type='text'
                  name='businessName'
                  value={formValues.businessName}
                  onChange={handleChange}
                />

                <p className='text-danger'>{formErrors.businessName}</p>
              </Form.Group>
              <Form.Group
                className='mb-3 w-100'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>
                  Location Name
                  <span className='text-danger mandatory-field'>*</span>
                </Form.Label>
                <select
                  name='locationName'
                  className='form-control'
                  value={formValues.locationName}
                  onChange={handleChange}>
                  <option>Select Location Name</option>
                  <option>Location</option>
                  <option>Location1</option>
                  <option>Location2</option>
                </select>
                <p className='text-danger'>{formErrors.locationName}</p>
              </Form.Group>

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
                Update
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
    </>
  );
};
