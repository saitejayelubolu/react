import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import "./emiadmin/Department.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { FcOk } from "react-icons/fc";
import { useForm } from "react-hook-form";
const EimDepartment = () => {
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setFormValues({ initialValues });
    setShow(true);
  };
  // const handleSuccess = () => {
  //   setFormErrors({});
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     setSuccessAlert(true);
  //   }
  // };

  const [smShow, setSmShow] = useState(false);
  const handleShoww = () => {
    setSmShow(true);
  };
  const handleClosee = () => setSmShow(true);
  const { searchValue, setSearchValue } = useState();

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
      name: <span className='fs-6 fw-bold'>Department Name</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Employee Count</span>,
      selector: (row) => row.numericCode,
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
    departmentName: "",
    description: "",

    departmentSelect: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  // const [deleteAlert, setDeleteAlert] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    //setFormErrors({});
    if (Object.keys(validate(formValues)).length == "0") {
      setFormErrors({});
      setFormValues(initialValues);
      setShow(false);
      setSuccessAlert(true);
    }
  };

  const onClear = () => {
    setFormValues(initialValues);
    setFormErrors({});
    // console.log(formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    const onlyDescriptionRegex = /^[a-zA-Z0-9!@$%^&*]{5,220}$/;
    const companyAddRegex = /^[a-zA-Z0-9\s!,.'-]{5,220}$/;

    if (!values.departmentName) {
      errors.departmentName = "Department name is required!";
    }
    if (!onlyAlphabetRegex.test(values.departmentName)) {
      errors.departmentName = "Enter only alphabets!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    } else if (formValues.description.length < 5) {
      errors.description = "Its allow min 5 and max 220 ";
    } else if (!companyAddRegex.test(values.description)) {
      errors.description = "Enter AlphaNumeric and , and ', ! ,  space";
    }

    // if (!values.departmentSelect) {
    //   errors.departmentSelect = "Select status   is required!";
    // }
    return errors;
  };

  return (
    <body className='bgColor container-fluid'>
      {/* <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <h4 className='text-center'>Are you sure you want to delete this!</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary'>Delete</Button>
        </Modal.Footer>
      </Modal> */}
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
          <Modal.Title>Edit Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='' onSubmit={handleSubmit}>
            <Form.Group className='mb-3 ' controlId='exampleForm.ControlInput1'>
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
              className='mb-3  '
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>
                Description
                <span className='text-danger mandatory-field'>*</span>
              </Form.Label>
              <Form.Control
                as='textarea'
                rows='3'
                type='text'
                name='description'
                placeholder='Description'
                value={formValues.description}
                onChange={handleChange}
              />

              <p className='text-danger'>{formErrors.description}</p>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Status</Form.Label>
              <select
                className='form-control '
                value={formValues.departmentSelect}
                onChange={handleChange}
                name='departmentSelect'>
                <option>Select Status</option>
                <option value='aye'>Active</option>
                <option value='aye'>InActive</option>
              </select>
              <p className='text-danger'>{formErrors.departmentSelect}</p>
            </Form.Group>

            {/* <button onClick={onClear}>Clear</button> */}
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
      {/* delete */}
    </body>
  );
};
export default EimDepartment;
