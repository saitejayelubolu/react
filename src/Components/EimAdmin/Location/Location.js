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
import InnerHeader from "../../Dashboard/InnerHeader";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import Locations from "./Locations";
import LocationAdd from "./LocationAdd";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
function Location() {
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
            <Locations />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row p-3'>
          <div className='col-md-2'></div>
          <div className='col-md-5 '>
            <AddLocation />
          </div>
          <div className='col-md-6'></div>
        </div>
      </div>
    </>
  );
}

//Add Location
const AddLocation = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormValues({ initialValues });
    setShow(true);
  };
  const initialValues = {
    locationName: "",
    streetNumber: "",
    pinCode: "",
    city: "",
    state: "",
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

    setFormErrors({});
    setFormValues(initialValues);
    setShow(false);
    setSuccessAlert(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const onClear = () => {
    setFormValues(initialValues);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyNumberRegex = /^[0-9]+$/;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    const onlyAlphaNumericRegex = /^[A-Za-z0-9]+$/;
    const onlyPinCodeRegex = /^(\d{4}|\d{6})$/;
    const cityRegex = /^[a-z,.\s]+$/i;
    if (!values.locationName) {
      errors.locationName = "Location name is required!";
    } else if (!onlyAlphaNumericRegex.test(values.locationName)) {
      errors.locationName = "Enter only Alphanumeric Values";
    }
    if (!values.streetNumber) {
      errors.streetNumber = "Street number is required!";
    } else if (!onlyNumberRegex.test(values.streetNumber)) {
      errors.streetNumber = "Enter only numbers";
    }
    if (!values.pinCode) {
      errors.pinCode = " Pin code is required!";
    } else if (!onlyPinCodeRegex.test(values.pinCode)) {
      errors.pinCode = "Enter only 4 or 6 digits";
    }
    if (!values.city) {
      errors.city = " City is required!";
    } else {
      if (!cityRegex.test(values.city)) {
        errors.city = "This field allow only alphabets and , . and space";
      } else {
        errors.city = "";
      }
    }
    // if (!cityRegex.test(values.city)) {
    //   errors.city = "This field allow only alphabets and , . and space";
    // }
    if (!values.state) {
      errors.state = " State is required!";
    } else {
      if (!cityRegex.test(values.state)) {
        errors.state = "This field allow only alphabets and , . and space";
      } else {
        errors.state = "";
      }
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
          <Modal.Title>Add Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-3' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 ' controlId='exampleForm.ControlInput1'>
              <Form.Label className='fs-bold'>
                Location Name
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='locationName'
                value={formValues.locationName}
                onChange={handleChange}
              />
              <p className='text-danger'>{formErrors.locationName}</p>
            </Form.Group>
            <Form.Group
              className='mb-3 '
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                Street Number
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='streetNumber'
                value={formValues.streetNumber}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.streetNumber}</p>
            </Form.Group>
            <Form.Group
              className='mb-3 '
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                Pin Code<span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='pinCode'
                value={formValues.pinCode}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.pinCode}</p>
            </Form.Group>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                City<span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='city'
                value={formValues.city}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.city}</p>
            </Form.Group>
            <Form.Group
              className='mb-3  '
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                State<span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                type='text'
                name='state'
                value={formValues.state}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.state}</p>
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
              type='submit'>
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
export default Location;
