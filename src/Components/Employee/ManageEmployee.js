import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { TbEdit } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GrView } from "react-icons/gr";
import AddEmployee from "./AddEmployee";
const Max_Steps = 4;
const colors = {
  "2 MB": "2097152",
  "3 MB": "3145728",
  "4 MB": "4194304",
};
const ManageEmployee = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const [formStep, setFormStep] = useState(0);
  const [employeeById, setEmployeeById] = useState();
  const [search, setSearch] = useState([" "]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [color, setColor] = useState(colors.Sea);
  const [employeeId, setEmployeeId] = useState();
  const completeFormStep = () => {
    setFormStep((cur) => cur + 1);
  };
  //127.0.0.1:8000/api/user/get_allemployeedata/
  //resume.vitelglobal.com:8000/api/user/get_allemployeedata/
  // http: http: http:
  const [smShow, setSmShow] = useState(false);
  const [smShowss, setSmShowss] = useState(false);
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://resume.vitelglobal.com:8000/api/user/get_allemployeedata/"
      );
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log("not found");
    }
  };
  const goToPreviousStep = () => {
    setFormStep((cur) => cur - 1);
  };
  const columns = [
    {
      name: <span className='h6 fw-bold'>S.No</span>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Employee</span>,
      selector: (row) => row.First_Name,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Employee Id</span>,
      selector: (row) => row.Middle_Name,
      sortable: true,
    },

    {
      name: <span className='h6 fw-bold'>Department</span>,
      selector: (row) => row.Department_Name,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Manager</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Mobile</span>,
      selector: (row) => row.Mobile_No,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Status</span>,
      selector: (row) => row.subregion,
      sortable: true,
    },
    {
      name: <span className='h6 fw-bold'>Send Mail</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}>
            <GrView />
          </button>
        </div>
      ),
    },
    {
      name: <span className='h6 fw-bold'>Action</span>,
      cell: (row) => (
        <div className='text-center'>
          <button
            className='btn btn-light  text-danger bi bi-trash3'
            onClick={() => setSmShow(true)}>
            <GrView />
          </button>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              // handleShow(row);
              onEditSubmit(row.id);
              setShow(true);
            }}>
            <TbEdit />
          </button>
          <button
            className='btn btn-light m-2 bi bi-pencil-square'
            onClick={() => {
              //   handleShow(row);
              onDelete(row.id);
            }}>
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

  const [formValues, setFormValues] = useState([{ name: "" }]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const deleteRow = () => {
    console.log(countries.size);
    countries.slice(0, 1);
    setCountries(countries);
    setSmShow(false);
  };

  const onClear = () => {
    setFormValues();
  };
  const renderButton = () => {
    if (formStep > 4) {
      return undefined;
    } else if (formStep === 3) {
      return (
        <button disabled={!isValid} type='submit' className=''>
          Submit
        </button>
      );
    } else {
      return (
        <button
          disabled={!isValid}
          onClick={completeFormStep}
          type='button'
          className=''>
          Next Step
        </button>
      );
    }
  };
  let handleChange = (i, e) => {
    //size
    for (let j = 0; j <= i; j++) {
      let file_size = e.target.files[j].size;
      console.log("size", file_size);
      console.log("selectedsize", color);
      if (file_size >= color) {
        console.log("File size exceeds 2 MiB");
      } else {
        //validation
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    }
  };
  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  let addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
  };
  const onEditSubmit = async (data) => {
    console.log(data);
    let id = data;
    setEmployeeId(id);
    await axios
      .get(`http://resume.vitelglobal.com:8000/api/user/update-employee/${id}/`)
      .then((resp) => {
        console.log("success resp", resp);
        setEmployeeById(JSON.stringify(resp.data));
        setValue("Company_name", resp.data.Company_name);
        setValue("Business_Unit", resp.data.Business_Unit);
        setValue("First_Name", resp.data.First_Name);
        setValue("Middle_Name", resp.data.Middle_Name);
        setValue("Last_Name", resp.data.Last_Name);
        setValue("Mother_Name", resp.data.Mother_Name);
        setValue("Father_Name", resp.data.Father_Name);
        setValue("Date_of_Birth", resp.data.Date_of_Birth);
        setValue("Gender", resp.data.Gender);
        setValue("Pan_CardNumber", resp.data.Pan_CardNumber);
        setValue("Upload_PanCard", data.Upload_PanCard);
        setValue("Adhaar_Card", resp.data.Adhaar_Card);
        setValue("Upload_AdhaarCard", data.Upload_AdhaarCard);
        setValue("Marrital_Status", resp.data.Marrital_Status);
        setValue("Nationality", resp.data.Nationality);
        setValue("Alternate_Mobile_Number", resp.data.Alternate_Mobile_Number);
        setValue("Personal_Email", resp.data.Personal_Email);
        setValue("Upload_Photograph", data.Upload_Photograph);
        setValue("Status", resp.data.Status);
        setValue("Department_Name", resp.data.Department_Name);
        setValue("Designation_Name", resp.data.Designation_Name);
        setValue("Reporting_Manager", resp.data.Reporting_Manager);
        setValue("Date_Of_Joining", resp.data.Date_Of_Joining);
        setValue("Location", resp.data.Location);
        setValue("Branch_Name", resp.data.Branch_Name);
        setValue("Mobile_No", resp.data.Mobile_No);
        setValue("Emargency_Contact_No", resp.data.Emargency_Contact_No);
        setValue("Official_Email", resp.data.Official_Email);
        setValue("PAdress1", resp.data.PAdress1);
        setValue("PAdress2", resp.data.PAdress2);
        setValue("PPin_Code", resp.data.PPin_Code);
        setValue("PState", resp.data.PState);
        setValue("PCity", resp.data.PCity);
        setValue("CAdress1", resp.data.CAdress1);
        setValue("CAdress2", resp.data.CAdress2);
        setValue("CPin_Code", resp.data.CPin_Code);
        setValue("CState", resp.data.CState);
        setValue("CCity", resp.data.CCity);
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  const onDelete = async (data) => {
    console.log(data);
    let id = data;
    setEmployeeId(id);
    await axios
      .delete(
        `http://resume.vitelglobal.com:8000/api/user/delete-employee/${id}/`
      )
      .then((resp) => {
        console.log("success resp", resp);
        // setShow(true);
      })
      .catch((err) => {
        console.log("error resp", err);
      });
  };
  const onSubmit = async () => {
    console.log("all data", getValues());
    const data = getValues();
    // console.log("get", data);
    const formData = new FormData();
    formData.append("Company_name", data.Company_name);
    formData.append("Business_Unit", data.Business_Unit);
    formData.append("First_Name", data.First_Name);
    formData.append("Middle_Name", data.Middle_Name);
    formData.append("Last_Name", data.Last_Name);
    formData.append("Mother_Name", data.Mother_Name);
    formData.append("Father_Name", data.Father_Name);
    formData.append("Date_of_Birth", data.Date_of_Birth);
    formData.append("Gender", data.Gender);
    formData.append("Pan_CardNumber", data.Pan_CardNumber);
    formData.append("Adhaar_Card", data.Adhaar_Card);
    formData.append("Marrital_Status", data.Marrital_Status);
    formData.append("Nationality", data.Nationality);
    formData.append("Alternate_Mobile_Number", data.Alternate_Mobile_Number);
    formData.append("Personal_Email", data.Personal_Email);
    formData.append("Department_Name", data.Department_Name);
    formData.append("Designation_Name", data.Designation_Name);
    formData.append("Reporting_Manager", data.Reporting_Manager);
    formData.append("Date_Of_Joining", data.Date_Of_Joining);
    formData.append("Location", data.Location);
    formData.append("Branch_Name", data.Branch_Name);
    formData.append("Mobile_No", data.Mobile_No);
    formData.append("Emargency_Contact_No", data.Emargency_Contact_No);
    formData.append("Official_Email", data.Official_Email);
    formData.append("PAdress1", data.PAdress1);
    formData.append("PAdress2", data.PAdress2);
    formData.append("PPin_Code", data.PPin_Code);
    formData.append("PState", data.PState);
    formData.append("PCity", data.PCity);
    formData.append("CAdress1", data.CAdress1);
    formData.append("CAdress2", data.CAdress2);
    formData.append("CPin_Code", data.CPin_Code);
    formData.append("CState", data.CState);
    formData.append("CCity", data.CCity);
    formData.append("Upload_AdhaarCard", data.Upload_AdhaarCard[0]);
    formData.append("Upload_PanCard", data.Upload_PanCard[0]);
    formData.append("Upload_Photograph", data.Upload_Photograph[0]);
    const datavalues = {
      Company_name: data.Company_name,
      Business_Unit: data.Business_Unit,
      First_Name: data.First_Name,
      Middle_Name: data.Middle_Name,
      Last_Name: data.Last_Name,
      Mother_Name: data.Mother_Name,
      Father_Name: data.Father_Name,
      Date_of_Birth: data.Date_of_Birth,
      Gender: data.Gender,
      Pan_CardNumber: data.Pan_CardNumber,
      // Upload_PanCard: PanCard,
      Adhaar_Card: data.Adhaar_Card,
      Upload_AdhaarCard: data.Upload_AdhaarCard,
      Marrital_Status: data.Marrital_Status,
      Nationality: data.Nationality,
      Alternate_Mobile_Number: data.Alternate_Mobile_Number,
      Personal_Email: data.Personal_Email,
      Status: data.Status,
      //   Upload_Photograph: Upload_Photograph,
      Department_Name: data.Department_Name,
      Designation_Name: data.Designation_Name,
      Reporting_Manager: data.Reporting_Manager,
      Date_Of_Joining: data.Date_Of_Joining,
      Location: data.Location,
      Branch_Name: data.Branch_Name,
      Mobile_No: data.Mobile_No,
      Emargency_Contact_No: data.Emargency_Contact_No,
      Official_Email: data.Official_Email,
      PAdress1: data.PAdress1,
      PAdress2: data.PAdress2,
      PPin_Code: data.PPin_Code,
      PState: data.PState,
      PCity: data.PCity,
      CAdress1: data.CAdress1,
      CAdress2: data.CAdress2,
      CPin_Code: data.CAdress2,
      CState: data.CState,
      CCity: data.CCity,
      //   Attachment1: data.Attachment1,
    };
    console.log("emp Id: ", employeeId);
    await axios
      .put(
        `http://resume.vitelglobal.com:8000/api/user/update-employee/${employeeId}/`,
        formData,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log("res", result);
      })
      .catch((err) => {
        console.log("errors", err);
      });
  };
  //   console.log("Get Employee by id", employeeById);

  return (
    <>
      <div className='row'>
        <div className='col-md-3'>
          <select class='mdb-select md-form' searchable='Search here..'>
            <option value='' disabled selected>
              Choose your country
            </option>
            <option value='1'>USA</option>
            <option value='2'>Germany</option>
            <option value='3'>France</option>
            <option value='3'>Poland</option>
            <option value='3'>Japan</option>
          </select>
        </div>
        <div className='col-md-3'>
          <input type='text' />
        </div>
        <div className='col-md-3'>
          <input type='text' />
        </div>
        <div className='col-md-3'>
          <input type='text' />
        </div>
      </div>
      <div className='main  mt-5'>
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
        <Modal.Header closeButton className='center'>
          <Modal.Title className='text-center'>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='p-4' onSubmit={handleSubmit(onSubmit)}>
            {formStep < Max_Steps && (
              <div className='flex-items-center'>
                {formStep > 0 && (
                  <button type='button' onClick={goToPreviousStep}>
                    <IoIosArrowBack />
                  </button>
                )}
                <p>
                  step {formStep + 1} of {Max_Steps}
                </p>
              </div>
            )}
            {formStep >= 0 && (
              <section style={{ display: formStep === 0 ? "block" : "none" }}>
                <h2 className='font-semibold text-3xl mb-8'>
                  Personal Details
                </h2>

                {/* paste */}
                <div className='row'>
                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Company Name</label>
                      <select
                        name='Company_name'
                        className='form-control'
                        {...register("Company_name", {
                          required: "Company Name is Required",
                        })}>
                        <option value=''>-- Select Company name --</option>
                        <option value='73'>Pranathi Software Services</option>
                        <option value='34'>Vitel Global Communication</option>
                      </select>
                    </div>

                    {errors.Company_name && (
                      <span className='text-danger fnsd'>
                        {errors.Company_name.message}
                      </span>
                    )}
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Business Unit</label>
                      <select
                        name='Business_Unit'
                        className='form-control'
                        {...register("Business_Unit", {
                          required: "Business Unit is Required",
                        })}>
                        <option value=''>-- Select Business Unit --</option>
                        <option value='73'>Pranathi Software Services</option>
                        <option value='34'>Vitel Global Communication</option>
                      </select>
                    </div>
                    <div>
                      {errors.Business_Unit && (
                        <span className='text-danger fnsd'>
                          {errors.Business_Unit.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>First Name</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("First_Name", {
                          required: "First Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.First_Name && (
                        <span className='text-danger fnsd'>
                          {errors.First_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Middle Name</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Middle_Name", {
                          required: "Middle Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Middle_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Middle_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Last Name</label>
                      <input
                        className='form-control '
                        type='text'
                        {...register("Last_Name", {
                          required: "Last Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Last_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Last_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Mother Name</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Mother_Name", {
                          required: "Mother Name is Required",
                          pattern: {
                            value: /^[a-zA-Z][a-zA-Z\\s]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Mother_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Mother_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Father Name</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Father_Name", {
                          required: "Father Name is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Father_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Father_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Date of Birth</label>

                      <input
                        className='form-control'
                        type='date'
                        {...register("Date_of_Birth", {
                          required: "This field is Required",
                          //   pattern: {
                          //     value: /^[a-zA-Z]+$/ ,
                          //     message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          //   },
                        })}
                      />
                      <div>
                        {errors.Date_of_Birth && (
                          <span className='text-danger fnsd'>
                            {errors.Date_of_Birth.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div></div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Gender</label>
                      <select
                        name='Gender'
                        className='form-control'
                        {...register("Gender", {
                          required: "Gender is Required",
                        })}>
                        <option value=''>-- Select Gender --</option>
                        <option value='11'>Male</option>
                        <option value='12'>Female</option>
                      </select>
                    </div>
                    <div>
                      {errors.Gender && (
                        <span className='text-danger fnsd'>
                          {errors.Gender.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>PAN Number</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Pan_CardNumber", {
                          required: "Pan Number is Required",
                          pattern: {
                            value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                            message: "Enter Valid Pan Number", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Pan_CardNumber && (
                        <span className='text-danger fnsd'>
                          {errors.Pan_CardNumber.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Upload Pan Card</label>
                      <input
                        className='form-control'
                        type='file'
                        {...register("Upload_PanCard", {
                          required: "Pan  is Required",
                        })}
                      />
                    </div>
                    <div>
                      {errors.Upload_PanCard && (
                        <span className='text-danger fnsd'>
                          {errors.Upload_PanCard.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Aadhaar </label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Adhaar_Card", {
                          required: "Adhar Number is Required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                          },
                          minLength: {
                            value: 12,
                            message: " min 12 numbers ", // JS only: <p>error message</p> TS only support string
                          },
                          maxLength: {
                            value: 12,
                            message: " mix 12 numbers ", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Adhaar_Card && (
                        <span className='text-danger fnsd'>
                          {errors.Adhaar_Card.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Upload Aadhaar card</label>
                      <input
                        className='form-control'
                        type='file'
                        {...register("Upload_AdhaarCard", {
                          required: "Adhar  is Required",
                        })}
                      />
                    </div>
                    <div>
                      {errors.Upload_AdhaarCard && (
                        <span className='text-danger fnsd'>
                          {errors.Upload_AdhaarCard.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Marital Status</label>
                      <select
                        name='marital'
                        className='form-control'
                        {...register("Marrital_Status", {
                          required: "Marital Status is Required",
                        })}>
                        <option value=''>-- Select Marital Status --</option>
                        <option value='1'>Married</option>
                        <option value='2'>Single</option>
                      </select>
                      {/* <p className="text-danger fnsd">Company name is required!</p> */}
                    </div>
                    <div>
                      {errors.Marrital_Status && (
                        <span className='text-danger fnsd'>
                          {errors.Marrital_Status.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Nationality</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Nationality", {
                          required: "Nationality is Required",
                          pattern: {
                            value: /^[a-zA-Z]+$/,
                            message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Nationality && (
                        <span className='text-danger fnsd'>
                          {errors.Nationality.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Alternate Mobile no</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Alternate_Mobile_Number", {
                          required: "Phone Number is Required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                          },
                          minLength: {
                            value: 10,
                            message: " min 10 numbers ", // JS only: <p>error message</p> TS only support string
                          },
                          maxLength: {
                            value: 15,
                            message: " mix 15 numbers ", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Alternate_Mobile_Number && (
                        <span className='text-danger fnsd'>
                          {errors.Alternate_Mobile_Number.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Personal Email </label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Personal_Email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                            message: "Enter Valid Email ", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Personal_Email && (
                        <span className='text-danger fnsd'>
                          {errors.Personal_Email.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Upload Photograph </label>
                      <input
                        className='form-control'
                        type='file'
                        {...register("Upload_Photograph", {
                          required: "Photograph  is Required",
                        })}
                      />
                    </div>
                    <div>
                      {errors.Upload_Photograph && (
                        <span className='text-danger fnsd'>
                          {errors.Upload_Photograph.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Status</label>
                      <select
                        name='marital'
                        className='form-control'
                        {...register("Status", {
                          required: "Status is Required",
                        })}>
                        <option value=''>-- Select Status --</option>
                        <option value='Active'>Active</option>
                        <option value='Inactive'>Inactive</option>
                      </select>
                      {/* <p className="text-danger fnsd">Company name is required!</p> */}
                    </div>
                    <div>
                      {errors.Status && (
                        <span className='text-danger fnsd'>
                          {errors.Status.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
            {formStep >= 1 && (
              <section style={{ display: formStep === 1 ? "block" : "none" }}>
                <h2 className='font-semibold text-3xl mb-8'>
                  Employment Details
                </h2>

                {/* paste */}

                <div className='row'>
                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Department Name</label>
                      <select
                        name='Department_Name'
                        className='form-control'
                        {...register("Department_Name", {
                          required: "Department Name is Required",
                        })}>
                        <option value=''>-- Select Department Name --</option>
                        <option value='144'>ADMINISTRATION PSS</option>
                        <option value='145'>Development</option>
                        <option value='146'>QA Department</option>
                        <option value='147'>AngularJS</option>
                        <option value='154'>tesla</option>
                        <option value='155'>devops</option>
                        <option value='156'>nuclear</option>
                        <option value='157'>reactjs</option>
                        <option value='162'>gfhfhfhfd</option>
                        <option value='164'>react</option>
                        <option value='165'>reactjss</option>
                      </select>
                    </div>
                    <div>
                      {errors.Department_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Department_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Designation Name</label>
                      <select
                        name='Designation_Name'
                        className='form-control'
                        {...register("Designation_Name", {
                          required: "Designation Name is Required",
                        })}>
                        <option value=''>-- Select Designation Name --</option>
                        <option value='1'>HR Manager</option>
                        <option value='92'>Business Analyst</option>
                        <option value='93'>QA Analyst</option>
                      </select>
                    </div>
                    <div>
                      {errors.Designation_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Designation_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Reporting Manager</label>
                      <select
                        name='Reporting_Manager'
                        className='form-control'
                        {...register("Reporting_Manager", {
                          required: "Reporting Manager is Required",
                        })}>
                        <option value='1'>
                          Admin Vikram Batra (VGS-01PSE-0001)
                        </option>
                        <option value='569'>Supradeep G (PSS-1000)</option>
                        <option value='570'>Murali T (PSS-1001)</option>
                        <option value='572'>regina r (PSS-1002)</option>
                        <option value='573'>Tanvi P (PSS-1003)</option>
                        <option value='575'>Ashok Nidamanuri (PSS-1004)</option>
                        <option value='577'>ashok KS (PSS-1006)</option>
                      </select>
                    </div>
                    <div>
                      {errors.Reporting_Manager && (
                        <span className='text-danger fnsd'>
                          {errors.Reporting_Manager.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Date of Joining</label>
                      <input
                        className='form-control'
                        type='date'
                        {...register("Date_Of_Joining", {
                          required: "This field is Required",
                          //   pattern: {
                          //     value: /^[a-zA-Z]+$/ ,
                          //     message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                          //   },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Date_Of_Joining && (
                        <span className='text-danger fnsd'>
                          {errors.Date_Of_Joining.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Location</label>
                      <select
                        name='Location'
                        className='form-control'
                        {...register("Location", {
                          required: "Loaction is Required",
                        })}>
                        <option value=''>-- Select Location --</option>
                        <option value='1'>Hyderabad</option>
                        <option value='36'>Pune</option>
                        <option value='37'>Vijayawada</option>
                      </select>
                    </div>
                    <div>
                      {errors.Location && (
                        <span className='text-danger fnsd'>
                          {errors.Location.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Branch Name</label>
                      <select
                        name='Branch_Name'
                        className='form-control'
                        {...register("Branch_Name", {
                          required: "Branch Name is Required",
                        })}>
                        <option value=''>-- Select Branch --</option>
                        <option value='1'>Begampet Branch</option>
                      </select>
                    </div>
                    <div>
                      {errors.Branch_Name && (
                        <span className='text-danger fnsd'>
                          {errors.Branch_Name.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Mobile no</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Mobile_No", {
                          required: "Mobile Number is Required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Mobile_No && (
                        <span className='text-danger fnsd'>
                          {errors.Mobile_No.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Emergency contact no</label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Emargency_Contact_No", {
                          required: "Emergency Number is Required",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Emargency_Contact_No && (
                        <span className='text-danger fnsd'>
                          {errors.Emargency_Contact_No.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className='col-md-6 mb-2 linhe'>
                    <div className='form-group'>
                      <label className='form-label'>Official Email </label>
                      <input
                        className='form-control'
                        type='text'
                        {...register("Official_Email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}\.+[A-Z]{2,}$/i,
                            message: "Enter Valid Email ", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                    </div>
                    <div>
                      {errors.Official_Email && (
                        <span className='text-danger fnsd'>
                          {errors.Official_Email.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
            {formStep >= 2 && (
              <section style={{ display: formStep === 2 ? "block" : "none" }}>
                <h2 className='font-semibold text-3xl mb-8'>
                  3Contact Details
                </h2>
                <div className='row m-0'>
                  <div className='col-md-6 '>
                    <h3>Permanent Address</h3>

                    <div className='row'>
                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Address 1</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("PAdress1", {
                              required: "Address 1 is Required",
                              pattern: {
                                // value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.PAdress1 && (
                            <span className='text-danger fnsd'>
                              {errors.PAdress1.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Address 2</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("PAdress2", {
                              required: "Address 1 is Required",
                              pattern: {
                                // value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.PAdress2 && (
                            <span className='text-danger fnsd'>
                              {errors.PAdress2.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Pin Code</label>
                          <input
                            className='form-control'
                            type='text'
                            {...register("PPin_Code", {
                              required: "Pin Number is Required",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 5,
                                message: " min 5 numbers ", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 7,
                                message: " mix 7 numbers ", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.PPin_Code && (
                            <span className='text-danger fnsd'>
                              {errors.PPin_Code.message}
                            </span>
                          )}
                        </div>
                        <span className='fnsd' style={{ marginTop: "20px" }}>
                          Note:Please enter the area pincode in order to
                          populate the City and State
                        </span>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>State</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("PState", {
                              required: "State is Required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.PState && (
                            <span className='text-danger fnsd'>
                              {errors.PState.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>City</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("PCity", {
                              required: "City is Required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.PCity && (
                            <span className='text-danger fnsd'>
                              {errors.PCity.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <h3>Current Address</h3>
                    <div className='row'>
                      <div className='col-md-12 linhe mb-2'>
                        <div className='form-group'>
                          <label className='form-label'>Address 1</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("CAdress1", {
                              required: "Address 1 is Required",
                              pattern: {
                                // value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.CAdress1 && (
                            <span className='text-danger fnsd'>
                              {errors.CAdress1.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 linhe mb-2'>
                        <div className='form-group'>
                          <label className='form-label'>Address 2</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("CAdress2", {
                              required: "Address 2 is Required",
                              pattern: {
                                // value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.CAdress2 && (
                            <span className='text-danger fnsd'>
                              {errors.CAdress2.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>Pin Code</label>
                          <input
                            className='form-control'
                            type='text'
                            {...register("CPin_Code", {
                              required: "Phone Number is Required",
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Only Numbers allowed", // JS only: <p>error message</p> TS only support string
                              },
                              minLength: {
                                value: 5,
                                message: " min 5 numbers ", // JS only: <p>error message</p> TS only support string
                              },
                              maxLength: {
                                value: 7,
                                message: " mix 7 numbers ", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.CPin_Code && (
                            <span className='text-danger fnsd'>
                              {errors.CPin_Code.message}
                            </span>
                          )}
                        </div>
                        <span className='fnsd' style={{ marginTop: "20px" }}>
                          Note:Please enter the area pincode in order to
                          populate the City and State
                        </span>
                      </div>

                      <div className='col-md-12 linhe mb-2'>
                        <div className='form-group'>
                          <label className='form-label'>State</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("CState", {
                              required: "State is Required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.CState && (
                            <span className='text-danger fnsd'>
                              {errors.CState.message}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className='col-md-12 mb-2 linhe'>
                        <div className='form-group'>
                          <label className='form-label'>City</label>
                          <input
                            className='form-control '
                            type='text'
                            {...register("CCity", {
                              required: "City is Required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Only Alphabets allowed", // JS only: <p>error message</p> TS only support string
                              },
                            })}
                          />
                        </div>
                        <div>
                          {errors.CCity && (
                            <span className='text-danger fnsd'>
                              {errors.CCity.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {formStep >= 3 && (
              <section style={{ display: formStep === 3 ? "block" : "none" }}>
                <h2 className='font-semibold text-3xl mb-8'>Attachments</h2>
                {/* paste */}
                <div className='col-md-12'>
                  <h3>Attachments</h3>
                </div>
                {formValues.map((element, index) => (
                  <div className=' row form-inline mb-2' key={index}>
                    <div className='col-md-6'>
                      <input
                        type='file'
                        className='form-control'
                        accept='.png,.jpg,.pdf,.gif,.doc'
                        name='Attachment1'
                        value={element.Attachment1 || ""}
                        onChange={(e) => handleChange(index, e)}
                      />
                      <div className='text-danger'></div>
                      {/* jpg, png, gif, doc, pdf */}
                    </div>
                    <div className='col-md-5'>
                      {index ? (
                        <button
                          type='button'
                          className='button remove btn btn-danger'
                          onClick={() => removeFormFields(index)}>
                          Delete
                        </button>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div>
                  {/* <select id="size">
            <option value="2097152" selected>
              2 MB
            </option>
            <option value="3145728">3 MB</option>
            <option value="4194304">4 MB</option>
            <option value="5242880">5 MB</option>
          </select> */}
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}>
                    {Object.entries(colors).map((c) => (
                      <option value={c[1]}>{c[0]}</option>
                    ))}
                  </select>
                </div>
                <div className='button-section m-2'>
                  <button
                    className='button add btn btn-primary'
                    type='button'
                    onClick={() => addFormFields()}>
                    Add More Files
                  </button>
                </div>
              </section>
            )}
            {renderButton()}
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>View</Modal.Title>
        </Modal.Header>
        <h4 className='text-center'>comming soon</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={deleteRow}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size='md'
        show={smShow}
        onHide={() => setSmShowss(false)}
        aria-labelledby='example-modal-sizes-title-md'
        className='text-center'>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>send mai</Modal.Title>
        </Modal.Header>
        <h4 className='text-center'>comming soon</h4>
        <Modal.Footer>
          <Button variant='secondary'>Cancel</Button>
          <Button variant='primary' onClick={deleteRow}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <AddEmployee />
    </>
  );
};
export default ManageEmployee;
