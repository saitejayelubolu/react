import axios from "axios";
import React, { useEffect, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FcOk } from "react-icons/fc";
import { BiMessageDetail, BiPaperPlane } from "react-icons/bi";
//import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
//import Select from "react-select";
import AnnouncementInnerNav from "./AnnouncementInnerNav/AnnouncementInnerNav";
import { AiOutlineAppstore } from "react-icons/ai";

import { MenuProps, useStyles, options } from "./utilss";
import InnerHeader from "../Dashboard/InnerHeader";
import MessagesInnerNav from "./MessagesInnerNav/MessagesInnerNav";

const Messages = () => {
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
    // console.log(value);
    const errors = {};
    // if (!value) {
    //   errors.selectedd = "testing";
    // }
  };
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const {
  //   register,
  //   handleSubmitt,
  //   formState: { errors },
  // } = useForm();

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
      name: <span className='fs-6 fw-bold'>Status</span>,
      selector: (row) => "success",
      sortable: true,
      width: "170px",
    },
    {
      name: <span className='fs-6 fw-bold'>Date</span>,
      selector: (row) => row.timezones,
      sortable: true,
      width: "170px",
    },
    {
      name: <span className='fs-6 fw-bold'>Message</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "200px",
    },

    {
      name: <span className='fs-6 fw-bold'>Sent Date & Time</span>,
      selector: (row) => row.timezones,
      sortable: true,
      width: "300px",
    },
    {
      name: <span className='fs-6 fw-bold'>Sent To</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "300px",
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

    // setFormErrors(validate(formValues));
    // console.log("hi", validate(formValues));
    setSuccessAlert(true);
    setShow(false);

    // if (
    //   validate(formValues).description == undefined &&
    //   validate(formValues).selected == undefined &&
    //   validate(formValues).title == undefined
    // ) {
    //   setShow(false);
    //   setSelected([]);
    // }
    //console.log("1", validate(formErrors));
    // if (validate(formValues) < 1) {
    //   console.log("kjdshfkjsd");
    // }
    // console.log("hee", selected.length);
    // if (selected.length == 0) {
    //   errors.selected = "testing";
    //   console.log("errortesting");
    // }
  };
  // const submitClose = () => {
  //   if (Object.keys(formErrors).length === 0 ) {
  //     setShow(false);
  //   }
  // };
  useEffect(() => {
    // console.log(formErrors);
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

    if (!values.title) {
      errors.title = "Subject is required!";
    }
    // if (!onlyDescriptionRegex.test(values.description)) {
    //   errors.description = "Description is min 5 characters and max 220!";
    // }
    if (selected.length === 0) {
      errors.selected = "Please select any one";
      // console.log("errortesting");
    }
    //console.log("this", errors.selected);

    if (!values.description) {
      errors.description = "message is required!";
    } else if (formValues.description.length < 5) {
      errors.description = "Its allow min 5 and max 220 ";
    } else if (!onlyDescriptionRegex.test(values.message)) {
      errors.description = "Enter Alphanumeric and Special Characters!";
    }

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
                className='btn btn-sm btn-primary text-center '
                onClick={handleShow}>
                <BiPaperPlane size={20} className='' /> Send Message
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
        <Modal show={show} onHide={handleClose} size='md'>
          <Modal.Header closeButton>
            <Modal.Title>Send Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className='container' onSubmit={handleSubmit}>
              <div class='row'>
                <div className='col-md-12 my-3'>
                  <FormControl
                    className={classes.formControl}
                    style={{ width: "430px" }}>
                    <label className='mb-3'>
                      To
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
                <div className='col-md-12 my-3'>
                  <label for='inputEmail4'>
                    Subject
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
                    <Form.Label className='fs-bold'>Message</Form.Label>
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
                type='submit'
                // onClick={submitClose}
              >
                Update
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
      </div>
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
        <h4 className='text-center'>Sent Successfully</h4>
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
export default Messages;
