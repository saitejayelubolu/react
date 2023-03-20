import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
const OrganizationMaster = () => {
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFormValues({ initialValues });
  };
  const [smShow, setSmShow] = useState(false);

  const getCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log("not found");
    }
  };

  const columns = [
    {
      name: <span className='h6 fw-bold'>S.No</span>,
      selector: (row) => row.callingCodes,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Comapny Name</span>,
      selector: (row) => "VitelGlobal",
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Business Unit</span>,
      selector: (row) => row.alpha2Code,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>City</span>,
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>State</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Pin Code</span>,
      selector: (row) => row.population,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={handleShow}>
            <AiOutlineEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}>
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

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
    // console.log("sai", Object.keys(validate(formValues)).length);
    setFormErrors({});
    setFormValues(initialValues);
    setShow(false);
    setSuccessAlert(true);
  };
  // const handleSuccess = () => {
  //   setFormErrors({});
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     setSuccessAlert(true);
  //   }
  // };

  const deleteRow = () => {
    console.log(countries.size);
    countries.slice(0, 1);
    setCountries(countries);
    setSmShow(false);
  };

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
  // const validate = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   const onlyAlphabetRegex = /^[A-Za-z]+$/;
  //   const onlyAlphaNumericRegex = /^[A-Za-z0-9]+$/;
  //   const companyAddRegex = /^[a-zA-Z0-9\s,.'-]{3,220}$/;
  //   const onlyNumberRegex = /^[0-9]+$/;
  //   //const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i;
  //   const onlyPinCodeRegex = /^(\d{4}|\d{6})$/;

  //   const alphaSpace = /^[a-zA-Z ]*$/;
  //   const cityRegex = /^[a-z,.\s]+$/i;
  //   //const companyExpression =
  //   //(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  //   //const websiteRegex = /([a-zA-Z]).([a-zA-Z]).(\w+)$/;
  //   if (!values.companyName) {
  //     errors.companyName = "Company name is required!";
  //   } else if (!onlyAlphabetRegex.test(values.companyName)) {
  //     errors.companyName = "Enter only alphabets!";
  //   }
  //   if (!onlyAlphaNumericRegex.test(values.companyPrefix)) {
  //     errors.companyPrefix = "Enter only alphanumeric!";
  //   }
  //   if (!values.employeeCode) {
  //     errors.employeeCode = "EmployeeCode is required!";
  //   } else if (!onlyAlphaNumericRegex.test(values.employeeCode)) {
  //     errors.employeeCode = "Enter only alphanumeric!";
  //   }
  //   if (!values.bUnit) {
  //     errors.bUnit = "Business uint is required!";
  //   } else if (!onlyAlphaNumericRegex.test(values.bUnit)) {
  //     errors.bUnit = "Enter only alphanumeric!";
  //   }
  //   if (!values.contactName) {
  //     errors.contactName = "Contact name is required!";
  //   } else if (!alphaSpace.test(values.contactName)) {
  //     errors.contactName = "Enter only alphabets and space and !";
  //   }
  //   if (!values.companyAddress) {
  //     errors.companyAddress = "Company address is required!";
  //   } else if (formValues.companyAddress.length < 5) {
  //     errors.companyAddress = "Its allow min 5 and max 220 ";
  //   } else if (!companyAddRegex.test(values.companyAddress)) {
  //     errors.companyAddress = "Enter AlphaNumeric and , and ' and !";
  //   }
  //   if (!values.pinCode) {
  //     errors.pinCode = "PinCode is required!";
  //   } else if (!onlyPinCodeRegex.test(values.pinCode)) {
  //     errors.pinCode = "Enter only 4 or 6 digit numbers !";
  //   }
  //   //  else if (formValues.pinCode.length === 6) {
  //   //   errors.pinCode = "enter 6 digits";
  //   // }
  //   if (!values.companyPhone) {
  //     errors.companyPhone = "Company phone is required!";
  //   } else if (!onlyNumberRegex.test(values.companyPhone)) {
  //     errors.companyPhone = "Enter only numbers!";
  //   }
  //   if (!values.city) {
  //     errors.city = "City is required!";
  //   } else {
  //     if (!cityRegex.test(values.city)) {
  //       errors.city = "This field allow only alphabets and , . and space";
  //     } else {
  //       errors.city = "";
  //     }
  //   }
  //   if (!values.companyEmail) {
  //     errors.companyEmail = "Company email is required!";
  //   } else if (!mailRegex.test(values.companyEmail)) {
  //     errors.companyEmail = "Invalid email format";
  //   }
  //   if (!values.state) {
  //     errors.state = "State is required!";
  //   } else {
  //     if (!cityRegex.test(values.state)) {
  //       errors.city = "This field allow only alphabets and , . and space";
  //     } else {
  //       errors.state = "";
  //     }
  //   }

  //   // if (!websiteRegex.test(values.companyWebsite)) {
  //   //   errors.companyWebsite = "Enter proper website!";
  //   // }
  //   if (!values.companyVat) {
  //     errors.companyVat = "Company Vat is required!";
  //   } else if (!onlyNumberRegex.test(values.companyVat)) {
  //     errors.companyVat = "Enter only Numbers";
  //   } else if (formValues.companyVat.length > 12) {
  //     errors.companyVat = "Its allow  max 12 ";
  //   }
  //   return errors;
  // };

  return (
    <>
      <div className=''>
        <DataTable
          columns={columns}
          data={filteredCountries}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='450px'
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type='text'
              className='form-control w-25'
              placeholder='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton className='center'>
          <Modal.Title className='text-center'>Edit Organization</Modal.Title>
        </Modal.Header>
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
              <label for='inputPassword4' class='form-label fw-bold font-size'>
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
              <label for='inputPassword42' class='form-label fw-bold font-size'>
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
              <label for='inputPassword4q' class='form-label fw-bold font-size'>
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
              <label for='inputPassword4' class='form-label fw-bold font-size '>
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
              <label for='inputEmail4272' class='form-label fw-bold font-size'>
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
              <label for='inputPassword4' class='form-label fw-bold font-size'>
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
                  Update
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3 text-danger'>
          <AiOutlineDelete size='80px' />
        </div>
        <h4 className='text-center'>Deleted Successfully</h4>
        <div className='text-center m-3'>
          <button className='btn btn-primary' onClick={() => setSmShow(false)}>
            Okay
          </button>
        </div>
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
        <h4 className='text-center'>Updated Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setSuccessAlert(false)}>
            Okay
          </button>
        </div>
      </Modal>
    </>
  );
};
export default OrganizationMaster;
