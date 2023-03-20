import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./emiadmin/Department.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const EimDepartment = () => {
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [smShow, setSmShow] = useState(false);
  const handleShoww = () => setSmShow(true);
  const handleClosee = () => setSmShow(true);

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
      name: <span className='h6'>S.No</span>,
      selector: (row) => row.callingCodes,
      sortable: true,
    },

    {
      name: <span className='h6'>Department Name</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='h6'>Employee Count</span>,
      selector: (row) => row.numericCode,
      sortable: true,
    },

    {
      name: <span className='h6'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={handleShow}></button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}></button>
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
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
    if (!values.departmentName) {
      errors.departmentName = "Department name is required!";
    }
    if (!values.description) {
      errors.description = "Description is required!";
    }
    if (!values.departmentSelect) {
      errors.departmentSelect = "Select status   is required!";
    }
    return errors;
  };
  return (
    <body className='bgColor container-fluid'>
      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton>
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
  <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" className='text-danger'/>
</svg> */}
        </Modal.Header>
        <h4 className='text-center'>Are you sure you want to delete this!</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary'>Delete</Button>
        </Modal.Footer>
      </Modal>
      <div className=''>
        <div className='row m-3'>
          <div className='col-md-12'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              class='bi bi-columns-gap'
              viewBox='0 0 16 16'>
              <path d='M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z' />
            </svg>
            <span className='h3 p-1 mx-1 fw-bold maincolor'>
              Department Master
            </span>
          </div>
        </div>

        <nav className='navbar'>
          <div>
            <Link
              className='h3 btn rounded-pill departmentColor m-2'
              id='bg-secondar'
              to='/Departmentpage'>
              Department Master
            </Link>
            <Link
              className=' h4  btn rounded-pill departmentColor m-2'
              to='/Addpage'>
              Add
            </Link>
          </div>
        </nav>
      </div>
      <DataTable
        title='Department master list'
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
              <Form.Label className='fs-bold'>Department Name </Form.Label>
              <Form.Control
                type='text'
                name='departmentName'
                placeholder='Department Name'
                value={formValues.departmentName}
                onChange={handleChange}
              />
              <p className='text-danger'>{formErrors.departmentName}</p>
            </Form.Group>
            <Form.Group
              className='mb-3  '
              controlId='exampleForm.ControlTextarea1'>
              <Form.Label className='fs-bold'>Description</Form.Label>
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
                className='form-control form-select'
                value={formValues.departmentSelect}
                onChange={handleChange}
                name='departmentSelect'>
                <option>SelectStatus</option>
                <option value='aye'>Active</option>
                <option value='aye'>InActive</option>
              </select>
              <p className='text-danger'>{formErrors.departmentSelect}</p>
            </Form.Group>

            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1 w-50 '></Form.Group>
            <Button
              className='btn btn-primary  '
              variant='secondary'
              // value="clear"
              type='button'
              onClick={handleClose}>
              Cancel
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
    </body>
  );
};
export default EimDepartment;
