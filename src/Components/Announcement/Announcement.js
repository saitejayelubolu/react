import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BiMessageDetail, BiPaperPlane } from "react-icons/bi";
import "react-multiple-select-dropdown-lite/dist/index.css";

import { ImEye } from "react-icons/im";
import { useForm } from "react-hook-form";
import {
  AiOutlineAppstore,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { MenuProps, useStyles, options } from "./utils";
import InnerHeader from "../Dashboard/InnerHeader";
import AnnouncementInnerNav from "./AnnouncementInnerNav/AnnouncementInnerNav";

const Announcement = () => {
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChangee = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
    console.log(value);
    const errors = {};
  };
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setFormValues({ initialValues });
  };

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
      name: <span className='fs-6 fw-bold text-center'>S.No</span>,
      selector: (row) => row.callingCodes,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: <span className='fs-6 fw-bold'>Title</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6 fw-bold'>Publish Start Date & Time</span>,
      selector: (row) => row.timezones,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Publish End Date & Time</span>,
      selector: (row) => row.timezones,
      sortable: true,
    },
    {
      name: <span className='fs-6 fw-bold'>Visible To</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6 fw-bold'>Announcement Date</span>,
      selector: (row) => row.timezones,
      sortable: true,
    },

    {
      name: <span className='fs-6 fw-bold'>Posted By</span>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => setVisible(true)}>
            <ImEye />
          </button>
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
    description: "",
    title: "",
    file: "",
    selected: "",
    startdate: "",
    enddate: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  console.log(formValues.startdate);
  console.log(formValues.enddate);
  const blockDate = () => {
    const a = formValues.startdate;
    return a;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(selected.length);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const onClear = () => {
    setFormValues(initialValues);
    // selectedOptions("");
    setSelected([]);
  };
  const validate = (values) => {
    const errors = {};
    const onlyDescriptionRegex = /^[a-zA-Z0-9!@$%^&*]{5,220}$/;
    const validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

    if (!values.title) {
      errors.title = "Title is required!";
    }
    if (!onlyDescriptionRegex.test(values.description)) {
      errors.description = "Description is min 5 characters and max 220!";
    }
    if (selected.length == 0) {
      errors.selected = "Please select any one";
      // console.log("errortesting");
    }
    console.log("this", errors.selected);

    return errors;
  };

  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <AnnouncementInnerNav />
        <div className='container p-3 mt-100'>
          <div className='container-fluid'>
            <div className='d-flex flex-row bd-highlight justify-content-end'>
              <button
                className='btn btn-sm btn-primary text-center'
                onClick={handleShow}>
                <BiPaperPlane size={20} className='' /> Publish Announcement
              </button>
            </div>
          </div>
        </div>
        <div className='container'>
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
          <Modal.Header closeButton>
            <Modal.Title>Publish Announcement </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='container' onSubmit={handleSubmit}>
              <div class='row'>
                <div className='col-md-6 my-3'>
                  <FormControl className={classes.formControl}>
                    <label className='mb-3'>
                      Department Name
                      <span className='text-danger mandatory-fields'>*</span>
                    </label>
                    <Select
                      labelId='mutiple-select-label'
                      multiple
                      value={selected}
                      onChange={handleChangee}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      variant='outlined'
                      size='small'
                      name='selected'>
                      <MenuItem
                        value='all'
                        classes={{
                          root: isAllSelected ? classes.selectedAll : "",
                        }}>
                        <ListItemIcon>
                          <Checkbox
                            classes={{
                              indeterminate: classes.indeterminateColor,
                            }}
                            checked={isAllSelected}
                            indeterminate={
                              selected.length > 0 &&
                              selected.length < options.length
                            }
                          />
                        </ListItemIcon>
                        <ListItemText
                          classes={{ primary: classes.selectAllText }}
                          primary='Select All'
                        />
                      </MenuItem>
                      {options.map((option) => (
                        <MenuItem key={option} value={option}>
                          <ListItemIcon>
                            <Checkbox checked={selected.indexOf(option) > -1} />
                          </ListItemIcon>
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                    <p className='text-danger'>{formErrors.selected}</p>
                  </FormControl>
                </div>

                {/* <p>{formErrors}</p> */}
                <div className='col-md-6 my-3'>
                  <label for='inputEmail4'>
                    Title
                    <span className='text-danger mandatory-fields'>*</span>
                  </label>
                  <input
                    type='text'
                    className='form-control '
                    name='title'
                    value={formValues.title}
                    onChange={handleChange}
                    style={{ marginTop: "11px" }}
                  />
                  <p className='text-danger'>{formErrors.title}</p>
                </div>
                <div className='col-md-12'>
                  <Form.Group
                    className='mb-3  '
                    controlId='exampleForm.ControlTextarea1'>
                    <Form.Label className='fs-bold'>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='3'
                      type='text'
                      name='description'
                      // placeholder="Description"
                      value={formValues.description}
                      onChange={handleChange}
                    />

                    <p className='text-danger'>{formErrors.description}</p>
                  </Form.Group>
                </div>
              </div>
              <div class='mb-3'>
                <label for='formFile' class='form-label'>
                  Attachments
                </label>
                <input
                  class='form-control'
                  type='file'
                  id='formFile'
                  name='file'
                  value={formValues.file}
                  onChange={handleChange}
                  accept='.png, .jpg, .jpeg'
                />

                <p className='text-danger'>{formErrors.file}</p>
              </div>

              <div className='row'>
                <div className='col-md-6 my-3'>
                  <label class='form-label'>
                    Publish Date and Time
                    <span className='text-danger mandatory-fields'>*</span>
                  </label>
                  <input
                    id='datetime-local'
                    type='datetime-local'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label='Publish
                     Date
                     and
                     Time'
                    variant='outlined'
                    size='small'
                    sx={{ width: 300 }}
                    required={true}
                    min={new Date().toISOString().slice(0, -8)}
                    name='startdate'
                    value={formValues.startdate}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-md-6 my-3 '>
                  <label class='form-label'>
                    End Date and Time
                    <span className='text-danger mandatory-fields'>*</span>
                  </label>
                  <input
                    variant='outlined'
                    size='small'
                    id='datetime-local'
                    label='End Date and Time'
                    type='datetime-local'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ width: 300 }}
                    name='enddate'
                    min={blockDate()}
                    value={formValues.enddate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class='form-check my-3'>
                <input
                  class='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckDefault'
                />
                <label class='form-check-label' for='flexCheckDefault'>
                  Add to Ticker
                </label>
              </div>

              <Button
                className='btn btn-primary my-2'
                variant='primary'
                type='reset'
                onClick={onClear}>
                Clear
              </Button>
              <Button
                className='btn btn-primary m-2'
                variant='primary'
                type='submit'>
                Save
              </Button>
            </Form>
          </Modal.Body>
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
            <Button variant='primary'>Delete</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          size='lg'
          show={visible}
          onHide={() => setVisible(false)}
          aria-labelledby='example-modal-sizes-title-md'
          className='text-center'>
          <Modal.Header closeButton>
            <h5 className='text-center'>Publish Announcement</h5>
          </Modal.Header>
          <Modal.Body>
            <div className='row '>
              <div className='col-md-6  '>
                Publish Date & Time:
                <span className='btn btn-outline-success btn-sm mx-1'>
                  10/10/22 10:00
                </span>
              </div>
              <div className='col-md-6  '>
                End Date & Time:
                <span className='btn btn-outline-warning btn-sm mx-1'>
                  22/2/22 10:00
                </span>
              </div>
              <div className=' d-flex justify-content-evenly col-md-12 mt-4 '>
                <div className=''> Title</div>
                <div className='h5'> Name of the Title</div>
              </div>
              <div className=' d-flex justify-content-evenly col-md-12 mt-4 '>
                <div className=''> Description</div>
                <div className=''>Description Body </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={() => setVisible(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Announcement;
