import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { TbEdit } from "react-icons/tb";

// import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
// import { AiOutlineDelete } from "react-icons/ai";

import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FcOk } from "react-icons/fc";
const DataTables = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
    getValues,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    setShow(false);
    setSuccessAlert(true);
    clearErrors();
    reset();
  };
  const [date, setDate] = useState();
  const [datet, setDatet] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFormValues({});
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
      name: <span className='h6 fw-bold'>Bussines Unit</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Start Month and Year</span>,
      selector: (row) => row.alpha2Code,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>End Month and Year</span>,
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Weekend 1</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>weekend2</span>,
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
            <TbEdit />
          </button>

          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}>
            <AiFillDelete />
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
  const [formValues, setFormValues] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
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
  setValue("startDate", date);
  setValue("endDate", datet);
  // const onClear = () => {
  //   setFormValues();
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

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton className='center'>
          <Modal.Title className='text-center'>
            Update Leave Configaration
          </Modal.Title>
        </Modal.Header>
        <Form className='p-4' onSubmit={handleSubmit(onSubmit)}>
          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='address_id'>
                  Business Unit <span class='asterisk'></span>
                </label>
                <select
                  name='business'
                  className='form-control'
                  {...register("business", {
                    required: "Business is required",
                  })}>
                  <option value=''>-- Select Business Unit --</option>
                  <option value='Vitel'>BU1-Vitel Global Communication</option>
                  <option value='Pranathi'>
                    BU1-Pranathi Software Services
                  </option>
                  <option value='36'>BU1-GOOGLE</option>
                  <option value='37'>BU1-Pranathi software soultions</option>
                  <option value='38'>BU1-Varun technologies</option>
                  <option value='39'>BU1-CES ltd</option>
                  <option value='40'>BU1-VHS Ltd</option>
                  <option value='41'></option>
                </select>
              </div>
            </div>
            <div>
              {errors.business && (
                <span className='text-danger'>{errors.business.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <label for='address_id'>
                Start Month and Year <span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                name='startDate'
                onChange={(date) => setDate(date)}
                selected={date}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                closeOnScroll={true}
                disabledKeyboardNavigation
                ref={{
                  ...register("startDate", {
                    required: "start Date is  required",
                  }),
                }}
              />
            </div>
            <div>
              {errors.startDate && (
                <span className='text-danger'>{errors.startDate.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <label for='address_id'>
                End Month and Year <span class='asterisk'></span>
              </label>
              <DatePicker
                className='form-control'
                name='endDate'
                onChange={(datet) => setDatet(datet)}
                selected={datet}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                closeOnScroll={true}
                disabledKeyboardNavigation
                ref={{
                  ...register("endDate", {
                    required: "End Date is required",
                  }),
                }}
              />
            </div>
            {errors.endDate && (
              <span className='text-danger'>{errors.endDate.message}</span>
            )}
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='branch_id'>
                  Weekend1<span class='asterisk'></span>
                </label>
                <select
                  class='form-control '
                  name='weekend1'
                  {...register("weekend1", {
                    required: "Weekend1 is  required",
                  })}>
                  <option value=''>--Select Weekend 1 --</option>
                  <option value='Monday'>Monday</option>
                  <option value='Tuesday'>Tuesday</option>
                  <option value='Wednesday'>Wednesday</option>
                  <option value='Thursday'>Thursday</option>
                  <option value='Friday'>Friday</option>
                  <option value='Saturday'>Saturday</option>
                  <option value='Sunday'>Sunday</option>
                </select>
              </div>
            </div>
            <div>
              {errors.weekend1 && (
                <span className='text-danger'>{errors.weekend1.message}</span>
              )}
            </div>
          </div>

          <div class='row mb-3'>
            <div class='col-md-12'>
              <div class='form-group'>
                <label for='branch_id1'>
                  Weekend2<span class='asterisk'></span>
                </label>
                <select
                  class='form-control '
                  name='weekend2'
                  {...register("weekend2", {
                    required: "Weekend2 is  required",
                  })}>
                  <option value=''>--Select Weekend 2 --</option>
                  <option value='Monday'>Monday</option>
                  <option value='Tuesday'>Tuesday</option>
                  <option value='Wednesday'>Wednesday</option>
                  <option value='Thursday'>Thursday</option>
                  <option value='Friday'>Friday</option>
                  <option value='Saturday'>Saturday</option>
                  <option value='Sunday'>Sunday</option>
                </select>
              </div>
            </div>
            <div>
              {errors.weekend2 && (
                <span className='text-danger'>{errors.weekend2.message}</span>
              )}
            </div>
          </div>

          <div className='row'>
            <div class='col-12'>
              <button
                type='reset'
                value='clear'
                class='btn btn-secondary '
                onClick={() => clearErrors()}>
                Clear
              </button>
              <button type='submit' className='btn btn-primary m-2'>
                Update
              </button>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <h4 className='text-center'>Are you sure you want to delete this!</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={deleteRow}>
            Delete
          </Button>
        </Modal.Footer>
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
export default DataTables;
