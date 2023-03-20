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

import makeAnimated from "react-select/animated";
import { ImEye } from "react-icons/im";
import { useForm } from "react-hook-form";
import { FcOk } from "react-icons/fc";
import {
  AiOutlineAppstore,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
// import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { MenuProps, useStyles } from "./utils";

// import TickerFeed from "../Testing/TickerFeed";

const Announcement = () => {
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    clearErrors,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const [successAlert, setSuccessAlert] = useState(false);
  const classes = useStyles();
  const [selectError, setSelectError] = useState(true);
  //const [startDate, setStartDate] = useState(null);
  const [selected, setSelected] = useState([]);
  const [countries, setCountries] = useState([]);
  const [endmin, setEndmin] = useState();

  const [SelectAllChecked, setSelectedAllChecked] = useState(false);
  let options = countries.map((option) => option.department);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChangee = (event) => {
    const value = event.target.value;
    setValue("department", value);
    console.log(value);
    //console.log("department", value.length);
    if (value.length == 0) {
      setSelectError(true);
    }
    if (value.length > 0) {
      setSelectError(false);
    }
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      console.log("testing", value);
      return;
    }
    setSelected(value);
  };

  const handleTime = (event) => {
    const value = event.target.value;
    setValue("publish_start_date_time", value);
    console.log(value);
    setEndmin(value);
    return value;
  };

  // const blockDate = handleTime();
  // console.log(blockDate);
  // const blockDate = () => {
  //   const a =
  // };
  // const defaultTime = () => {
  //   return startDate;
  // };

  // const handleTime = (event) => {

  //   const value = event.target.value;
  //   setStartDate(value)
  //   setValue("StartTime",value);
  //   console.log("timng", value);
  // };

  const [search, setSearch] = useState([" "]);

  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleRow, SetVisibleRow] = useState(null); // variable for visible(clicked on eye symbol)

  // const [successAlert, setSuccessAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    //setFormValues({ initialValues });
  };
  //console.log(countries.publish_start_date_time);
  const getCountries = async () => {
    // try {
    //   const response = await axios.get(
    //     "http://resume.vitelglobal.com:8000/get_annoucement_data/"
    //   );
    //   console.log("response data", response.data); //checking data
    //   let responseData = response.data; //assigning response <p> {countries.title}</p>
    //   responseData.unshift({ id: responseData.length, {department: 'hrmsdept'} }); //paste one object values
    //   setCountries(response.data);
    //   setFilteredCountries(response.data);
    //   console.log("get api ", response.data);
    // } catch (error) {
    //   console.log("not found");
    // }
  };
  // const timeValue = countries.map(({ key, publish_start_date_time }) => ({
  //   [key]: publish_start_date_time,
  // }));

  //console.log(timeValue[0]);
  // for
  // console.log("getting data from api", countries[1]);
  const abc = getValues("publish_start_date_time");
  const blockDate = () => {
    const a = getValues("publish_start_date_time");
    console.log("block date", a);
    return a;
  };
  console.log("hai date and time", new Date().toISOString().slice(0, -8));
  const a = getValues("publish_start_date_time");
  console.log("block date", blockDate());
  useEffect(() => {
    //countries.unshift({name:"Select All"})
  }, []);
  const columns = [
    {
      name: <span className='fs-6 fw-bold text-center'>S.No</span>,
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
      textAlign: "center",
    },
    {
      name: <span className='fs-6 fw-bold'>Title</span>,
      selector: (row) => row.title,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6 fw-bold'>Publish Start Date & Time</span>,
      selector: (row) => row.publish_start_date_time,
      sortable: true,
      width: "300px",
    },

    {
      name: <span className='fs-6 fw-bold'>Publish End Date & Time</span>,
      selector: (row) => row.publish_end_date_time,
      sortable: true,
      width: "300px",
    },
    {
      name: <span className='fs-6 fw-bold'>Visible To</span>,
      selector: (row) => row.department,
      sortable: true,
      width: "200px",
    },
    {
      name: <span className='fs-6 fw-bold'>Announcement Date</span>,
      selector: (row) => "2022-09-03 19:23:00",
      sortable: true,
      width: "300px",
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
            onClick={() => {
              setVisible(true);
              SetVisibleRow(row);
              setSelected(row.department);
            }}>
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
      width: "300px",
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);

  //   useEffect(() => {
  //     const result = countries.filter((country) => {
  //       console.log("country", country);
  //       return country?.name?.toLowerCase()?.match(search.toLowerCase());
  //     });

  //     setFilteredCountries(result);
  //   }, [search]);

  const onSubmit = async (data) => {
    debugger;
    if (SelectAllChecked) data.department = ["helllo ", "ganta"].join();
    console.log("alla data", data);
    let resp = await axios
      .post("http://resume.vitelglobal.com:8000/post_annoucement_data/", {
        data,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    //setFormData(data);
    setSuccessAlert(true);
    setShow(false);
    reset();
    setSelected([]);
  };
  const onClear = () => {
    reset();
    setSelected([]);
    setSelectError(true);
  };
  const handelstartDateChangeEvent = () => {
    alert("start trigered");
  };
  return (
    <>
      <div className='container'>
        {/* <div>
          <TickerFeed fname={formValues.title} />
        </div> */}

        <div className='container-fluid'>
          <div className='d-flex flex-row bd-highlight m-3'>
            <div className='bd-highlight me-auto'>
              <div class='bd-highlight'>
                <AiOutlineAppstore
                  size={27}
                  style={{ verticalAlign: "bottom" }}
                />
                <span className='p-1 h5 '>Announcement</span>
              </div>
            </div>
            <div>
              <button
                className='btn btn-sm btn-primary text-center'
                onClick={handleShow}>
                <BiPaperPlane size={20} className='' /> Publish Announcement
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

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Publish Announcement </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='container' onSubmit={handleSubmit(onSubmit)}>
            <div class='row'>
              <div className='col-md-6 my-3'>
                <FormControl className={classes.formControl}>
                  <label className='mb-3'>
                    Department Name
                    <span className='text-danger mandatory-fields'>*</span>
                  </label>
                  <Select
                    // className={`form-control ${errors.department && "invalid"}`}
                    className='form-control'
                    multiple
                    value={selected}
                    onChange={handleChangee}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                    // variant="outlined"
                    size='small'
                    name='department'
                    ref={{
                      ...register("department", {
                        required: "Please Select Any One",
                      }),
                    }}
                    onKeyUp={() => {
                      trigger("department");
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
                          checked={SelectAllChecked}
                          //checked={isAllSelected}
                          indeterminate={
                            selected.length > 0 &&
                            selected.length < options.length
                          }
                          onChange={(e) =>
                            setSelectedAllChecked(!SelectAllChecked)
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.selectAllText }}
                        primary='Select All'
                      />
                    </MenuItem>
                    {countries.map((option) => (
                      <MenuItem key={option.id} value={option.title}>
                        <ListItemIcon>
                          <Checkbox
                            checked={selected.indexOf(option.title) > -1}
                          />
                        </ListItemIcon>
                        <ListItemText primary={option.title} />
                      </MenuItem>
                    ))}
                  </Select>
                  {selectError ? (
                    <>
                      {errors.department && (
                        <small className='text-danger'>
                          {errors.department.message}
                        </small>
                      )}
                    </>
                  ) : null}

                  {/* <p className="text-danger">{formErrors.selected}</p> */}
                </FormControl>
              </div>

              <div className='col-md-6 my-3'>
                <label for='inputEmail4'>
                  Title
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  type='text'
                  name='title'
                  className={`form-control ${errors.title && "invalid"}`}
                  //value={formValues.title}
                  //onChange={handleChange}
                  style={{ marginTop: "35px", height: "45px" }}
                  {...register("title", {
                    required: "Title Is Required",
                    pattern: {
                      value: /^[a-zA-Z\s]*$/,
                      message: "Only Alphabets And Space Are Allowed",
                    },
                    maxLength: {
                      value: 200,
                      message: "Maximum 200 Characters Are Allowed",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("title");
                  }}
                />
                {errors.title && (
                  <small className='text-danger'>{errors.title.message}</small>
                )}
              </div>
              <div className='col-md-12'>
                <Form.Group className='mb-3  '>
                  <Form.Label className='fs-bold'>Description</Form.Label>
                  <Form.Control
                    className={`form-control ${errors.description &&
                      "invalid"}`}
                    as='textarea'
                    rows='3'
                    type='text'
                    name='description'
                    {...register("description", {
                      maxLength: {
                        value: 250,
                        message: "Maximum 250 Characters Are Allowed",
                      },
                    })}
                    onKeyUp={() => {
                      trigger("description");
                    }}
                  />
                  {errors.description && (
                    <small className='text-danger'>
                      {errors.description.message}
                    </small>
                  )}
                </Form.Group>
              </div>
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
                  // className={`form-control ${
                  //   errors.publish_start_date_time && "invalid"
                  // }`}
                  label='Publish
                     Date
                     and
                     Time'
                  variant='outlined'
                  size='small'
                  sx={{ width: 300 }}
                  // required={true}
                  min={new Date().toISOString().slice(0, -8)}
                  name='publish_start_date_time'
                  ref={{
                    ...register("publish_start_date_time", {
                      required: "This Field Is Required",
                    }),
                  }}
                  onKeyUp={(e) => {
                    trigger("publish_start_date_time");
                    //setValue("startDate", e.tartget.value);
                  }}
                  // value={formValues.publish_start_date_time}
                  onChange={handleTime}
                />
                {errors.publish_start_date_time && (
                  <small className='text-danger'>
                    {errors.publish_start_date_time.message}
                  </small>
                )}
              </div>
              <div className='col-md-6 my-3 '>
                <label class='form-label'>
                  End Date and Time
                  <span className='text-danger mandatory-fields'>*</span>
                </label>
                <input
                  id='datetime-local'
                  type='datetime-local'
                  // className={`form-control ${
                  //   errors.publish_end_date_time && "invalid"
                  // }`}
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
                  //required={true}
                  // min={() => {
                  //   return getValues("publish_start_date_time");
                  // }}
                  min={endmin}
                  name='publish_end_date_time'
                  //onChange={(e)=>{handleTime(e)}}
                  ref={{
                    ...register("publish_end_date_time", {}),
                  }}
                  onKeyUp={() => {
                    trigger("publish_end_date_time");
                  }}
                  // value={formValues.publish_start_date_time}
                />
                {/* {errors.publish_end_date_time && (
                  <small className="text-danger">
                    {errors.publish_end_date_time.message}
                  </small>
                )} */}
              </div>
            </div>
            {/* <div class="form-check my-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={handleTicker}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Add to Ticker
              </label>
            </div> */}

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
                {countries.publish_start_date_time}
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
export default Announcement;
