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
const Locations = () => {
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
      name: <span className='fs-6 fw-bold'>S.No</span>,
      selector: (row) => row.callingCodes,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Location Name</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Street Number</span>,
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>City</span>,
      selector: (row) => row.region,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>State</span>,
      selector: (row) => row.numericCode,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Pin Code</span>,
      selector: (row) => row.population,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Action</span>,
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
    locationName: "",
    streetNumber: "",
    pinCode: "",
    city: "",
    state: "",
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
      errors.locationName = "Location name code is required!";
    } else if (!onlyAlphaNumericRegex.test(values.locationName)) {
      errors.locationName = "Enter only Alpha Numeric Values";
    }
    if (!values.streetNumber) {
      errors.streetNumber = "Street number is required!";
    } else if (!onlyNumberRegex.test(values.streetNumber)) {
      errors.streetNumber = "Enter only Numbers";
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
    <>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 ' controlId='exampleForm.ControlInput1'>
              <Form.Label className='fs-bold'>
                Location Name
                <span className='text-danger mandatory-field'>*</span>{" "}
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
              className='mb-3  '
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
              className='mb-3  '
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
              className='mb-3  '
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
              Update
            </Button>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer> */}
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
export default Locations;
