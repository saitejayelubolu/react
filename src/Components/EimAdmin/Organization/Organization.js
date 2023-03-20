import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AiOutlineAppstore } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import OrganizationMaster from "./OrganizationMaster";
import OrganizationAdd from "./OrganizationAdd";
import Header from "../../Dashboard/Header";
// import SideNavigation from "../../Dashboard/SideNavigation";
import InnerSideNavigation from "../../Dashboard/InnerSideNavigation";
import DepartmentInnerNav from "../InnerNav/DepartmentInnerNav";
import InnerHeader from "../../Dashboard/InnerHeader";
import { FcOk } from "react-icons/fc";
function Organization() {
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
            <OrganizationMaster />
          </div>
          <div className='col-md-2'></div>
        </div>
        <div className='row'>
          <div className='col-md-2'></div>
          <div className='col-md-8'>
            <AddOrganization />
          </div>
          <div className='col-md-2'></div>
        </div>
      </div>
    </>
  );
}

//Add Organization
const AddOrganization = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const handleShow = () => {
    setFormValues({ initialValues });
    setShow(true);
  };
  const initialValues = {
    companyName: "",
    description: "",
    employeeCode: "",
    bUnit: "",
    contactName: "",
    companyAddress: "",
    pinCode: "",
    companyPhone: "",
    city: "",
    companyEmail: "",
    state: "",
    companyWebsite: "",
    companyVat: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    setIsSubmit(true);
    // added
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
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.companyName) {
  //     errors.companyName = "companyName name is required!";
  //   }
  //   if (!values.companyPrefix) {
  //     errors.companyPrefix = "companyPrefix is required!";
  //   }
  //   if (!values.employeeCode) {
  //     errors.employeeCode = "employeeCode   is required!";
  //   }
  //   if (!values.bUnit) {
  //     errors.bUnit = "business uint  is required!";
  //   }
  //   if (!values.contactName) {
  //     errors.contactName = "contactName   is required!";
  //   }
  //   if (!values.companyAddress) {
  //     errors.companyAddress = "companyAddress  is required!";
  //   }
  //   if (!values.pinCode) {
  //     errors.pinCode = "pinCode  is required!";
  //   }
  //   if (!values.companyPhone) {
  //     errors.companyPhone = "companyPhone is required!";
  //   }
  //   if (!values.city) {
  //     errors.city = "city is required!";
  //   }
  //   if (!values.companyEmail) {
  //     errors.companyEmail = "companyEmail is required!";
  //   }
  //   if (!values.state) {
  //     errors.state = "state is required!";
  //   }
  //   if (!values.companyWebsite) {
  //     errors.companyWebsite = "companyWebsite is required!";
  //   }
  //   if (!values.companyVat) {
  //     errors.companyVat = "companyVatis required!";
  //   }
  //   return errors;
  // };
  return (
    <div>
      <button onClick={handleShow} className='btn btn-primary '>
        Add
      </button>
      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Add Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={handleSubmit}>
            <div className='row  m-1'>
              <div className='col-md-6'>
                <label for='inputEmail4' class='form-label fw-bold font-size'>
                  Company Name
                </label>
                <input
                  type='text'
                  className='form-control '
                  name='companyName'
                  value={formValues.companyName}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyName}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword4'
                  class='form-label fw-bold font-size'>
                  Company Prefix
                </label>
                <input
                  type='text'
                  className='form-control '
                  name='companyPrefix'
                  value={formValues.companyPrefix}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyPrefix}</p>
              </div>

              <div className='col-md-6'>
                <label for='inputEmail43' class='form-label fw-bold font-size'>
                  Employee Start Code
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputEmail43'
                  name='employeeCode'
                  value={formValues.employeeCode}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.employeeCode}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword42'
                  class='form-label fw-bold font-size'>
                  Business Unit
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputPassword42'
                  name='bUnit'
                  value={formValues.bUnit}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.bUnit}</p>
              </div>
              <div className='col-md-6'>
                <label for='inputEmail422' class='form-label fw-bold font-size'>
                  Contact Name
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputEmail422'
                  name='contactName'
                  value={formValues.contactName}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.contactName}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword4q'
                  class='form-label fw-bold font-size'>
                  Company Address
                </label>
                <textarea
                  class='form-control'
                  id='inputPassword4q'
                  rows='3'
                  name='companyAddress'
                  value={formValues.companyAddress}
                  onChange={handleChange}></textarea>
                <p className='text-danger'>{formErrors.companyAddress}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword4'
                  class='form-label fw-bold font-size '>
                  Pincode (Enter pin will Auto Fill City And State)
                </label>
                <input
                  type='tel'
                  className='form-control '
                  id='inputPassword4'
                  name='pinCode'
                  value={formValues.pinCode}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.pinCode}</p>
              </div>
              <div className='col-md-6'>
                <label for='inputEmail43' class='form-label fw-bold font-size'>
                  Company Phone
                </label>
                <input
                  type='tel'
                  className='form-control '
                  id='inputEmail43'
                  name='companyPhone'
                  value={formValues.companyPhone}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyPhone}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword429'
                  class='form-label fw-bold font-size'>
                  City
                </label>
                <input
                  type='tel'
                  className='form-control '
                  id='inputPassword429'
                  name='city'
                  value={formValues.city}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.city}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputEmail4272'
                  class='form-label fw-bold font-size'>
                  Company Email
                </label>
                <input
                  type='email'
                  className='form-control '
                  id='inputEmail4272'
                  name='companyEmail'
                  value={formValues.companyEmail}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyEmail}</p>
              </div>
              <div className='col-md-6'>
                <label for='inputEmail46' class='form-label fw-bold font-size'>
                  State
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputEmail46'
                  name='state'
                  value={formValues.state}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.state}</p>
              </div>
              <div className='col-md-6'>
                <label
                  for='inputPassword4'
                  class='form-label fw-bold font-size'>
                  Company Website
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputPassword4'
                  name='companyWebsite'
                  value={formValues.companyWebsite}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyWebsite}</p>
              </div>
              <div className='col-md-6'>
                <label for='inputEmail43' class='form-label fw-bold font-size'>
                  Company Vat
                </label>
                <input
                  type='text'
                  className='form-control '
                  id='inputEmail43'
                  name='companyVat'
                  value={formValues.companyVat}
                  onChange={handleChange}
                />
                <p className='text-danger'>{formErrors.companyVat}</p>
              </div>

              <div className='row'>
                <div class='col-12'>
                  <button type='reset' value='clear' class='btn btn-secondary '>
                    Clear
                  </button>
                  <button type='submit' className='btn btn-primary m-2'>
                    Add
                  </button>
                </div>
              </div>
            </div>
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

export default Organization;
