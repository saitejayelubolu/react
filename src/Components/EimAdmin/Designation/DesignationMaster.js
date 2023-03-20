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
const DesignationMaster = () => {
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
      name: <span className='fs-6 fw-bold'>Code</span>,
      selector: (row) => row.alpha2Code,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Department Name</span>,
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Designation Name</span>,
      selector: (row) => "Development",
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Employee Count</span>,
      selector: (row) => row.numericCode,
      sortable: true,
    },

    {
      name: <span className=' fs-6 fw-bold '>Action</span>,
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
    designationCode: "",
    designationName: "",
    departmentName: "",
    departmentSelect: "",
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
    if (Object.keys(validate(formValues)).length == "0") {
      setFormErrors({});
      setFormValues(initialValues);
      setShow(false);
      setSuccessAlert(true);
    }
  };
  // const handleSuccess = () => {
  //   if (Object.keys(validate(formValues)).length == "0") {
  //     setSuccessAlert(true);
  //     setFormValues(initialValues);
  //     setFormErrors({});
  //   }

  // setFormValues(initialValues);
  // };

  useEffect(() => {
    // console.log(formErrors);
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
    if (!values.departmentSelect) {
      errors.departmentSelect = "Select status   is required!";
    }
    return errors;
  };
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 ' controlId='exampleForm.ControlInput1'>
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
              className='mb-3  '
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
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
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

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>
                Status <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <select
                className='form-control '
                value={formValues.departmentSelect}
                onChange={handleChange}
                name='departmentSelect'>
                <option value=''>Select Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>InActive</option>
              </select>
              <p className='text-danger'>{formErrors.departmentSelect}</p>
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
export default DesignationMaster;
