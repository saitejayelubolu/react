import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { BiMessageDetail, BiPaperPlane } from "react-icons/bi";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { AiOutlineAppstore } from "react-icons/ai";
import { MenuProps, useStyles, options } from "./utilss";
import { FcOk } from "react-icons/fc";

const Mess = () => {
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       //maxHeight: ITEM_HEIGHT * 4.5,
  //       width: 250,
  //     },
  //   },
  //   getContentAnchorEl: null,
  //   anchorOrigin: {
  //     vertical: "bottom",
  //     horizontal: "center",
  //   },
  //   transformOrigin: {
  //     vertical: "top",
  //     horizontal: "center",
  //   },
  //   variant: "menu",
  // };

  const options = [
    "development@pss.com",
    "Sales@pss.in",
    "Hr@vitelglobal.com",
    "Digitalmarketing@vitelglobal.in",
    "Testing@pss.com",
    "Designing@vitelglobal.in",
  ];
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

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
  };
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const [successAlert, setSuccessAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    //setFormValues({ initialValues });
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
      selector: (row) => (
        <button className='btn btn-outline-success btn-sm m-2'> Success</button>
      ),
      sortable: true,
      width: "170px",
    },
    {
      name: <span className='fs-6 fw-bold'>Date</span>,
      selector: (row) => "2022-08-03",
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
      selector: (row) => "2022-08-03 14:22:22",
      sortable: true,
      width: "300px",
    },
    {
      name: <span className='fs-6 fw-bold'>Sent To</span>,
      selector: (row) => "admin@admin.com",
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

  // const initialValues = {
  //   description: "",
  //   title: "",
  // };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   setFormErrors(validate(formValues));

  //   if (Object.keys(validate(formValues)).length == "0") {
  //     setFormErrors({});
  //     setFormValues(initialValues);
  //     setShow(false);
  //     setSuccessAlert(true);
  //     setSelected([]);
  //   }
  // };

  // const handleSuccess = () => {
  //   setFormErrors({});
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     setSuccessAlert(true);
  //   }
  // };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  // const onClear = () => {
  //   setFormValues(initialValues);

  //   setSelected([]);
  //   setFormErrors({});
  // };
  // const validate = (values) => {
  //   const errors = {};
  //   const onlyDescriptionRegex = /^[a-zA-Z0-9!@$%^&*]{5,220}$/;

  //   if (!values.title) {
  //     errors.title = "Subject is required!";
  //   }

  //   if (selected.length === 0) {
  //     errors.selected = "Please select any one";
  //   }

  //   return errors;
  // };
  const onSubmit = (data) => {
    console.log("Hello", data);
    reset();
  };
  const handleClear = () => {
    reset();
  };

  return (
    <>
      <div className='container'>
        <div className='container-fluid'>
          <div className='d-flex flex-row bd-highlight m-3'>
            <div className='bd-highlight me-auto'>
              <div class='bd-highlight'>
                <AiOutlineAppstore
                  size={27}
                  style={{ verticalAlign: "bottom" }}
                />
                <span className='p-1 h5 '>Message</span>
              </div>
            </div>
            <div>
              <button
                className='btn btn-sm btn-primary text-center'
                onClick={handleShow}>
                <BiPaperPlane size={20} className='' /> Send Message
              </button>
            </div>
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
          <Form className='container' onSubmit={handleSubmit(onSubmit)}>
            <div class='row'>
              <div className='col-md-12 my-3'>
                <FormControl
                  className={classes.formControl}
                  style={{ width: "430px" }}>
                  <label className='mb-3'>To</label>
                  <Select
                    labelId='mutiple-select-label'
                    multiple
                    value={selected}
                    onChange={handleChangee}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    variant='outlined'
                    name='selected'
                    ref={{
                      ...register("selected", {
                        required: "To is required",
                      }),
                    }}
                    onKeyUp={() => {
                      trigger("selected");
                    }}>
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
                  {errors.selected && (
                    <small className='text-danger'>
                      {errors.selected.message}
                    </small>
                  )}
                </FormControl>
              </div>

              <div className='col-md-12 my-3'>
                <label for='inputEmail4'>
                  Subject
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control '
                  name='subject'
                  //value={formValues.title}
                  //onChange={handleChange}
                  style={{ marginTop: "11px" }}
                  {...register("subject", {
                    required: "subject is required",
                    pattern: {
                      value: /^[A-Za-z]*$/,
                      message: "Only Alphabets are allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("subject");
                  }}
                />
                {errors.subject && (
                  <small className='text-danger'>
                    {errors.subject.message}
                  </small>
                )}
                {/*c */}
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
                    //value={formValues.description}
                    //onChange={handleChange}
                  />

                  {/* <p className="text-danger">{formErrors.description}</p> */}
                </Form.Group>
              </div>
            </div>

            <Button
              className='btn btn-primary my-2'
              variant='primary'
              type='reset'
              //onClick={onClear}
              onClick={handleClear}>
              Clear
            </Button>
            <Button
              className='btn btn-primary m-2'
              variant='primary'
              type='submit'
              //onClick={handleSuccess}
            >
              Send
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
        size='md'
        show={successAlert}
        onHide={() => setSuccessAlert(false)}
        className='text-center'>
        <Modal.Header closeButton></Modal.Header>
        <div className='text-center m-3'>
          <FcOk size='80px' />
        </div>
        <h4 className='text-center'>Message Sent Successfully</h4>
        <div className='text-center m-3'>
          <button
            className='btn btn-primary'
            onClick={() => setSuccessAlert(false)}>
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Mess;
