import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import React, { useEffect, useState } from "react";
import { display } from "@mui/system";

const BranchAdd = () => {
  const initialValues = {
    businessUnit: "",
    businessName: "",
    locationName: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //const [errors, setErrors] = useState({});

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

  const onClear = () => {
    setFormValues(initialValues);
    // errors.businessUnit = "";
    // errors.businessName = "";
    // errors.locationName = "";
  };

  const validate = (values) => {
    const errors = {};

    const onlyNumberRegex = /^[0-9]+$/;
    const onlyAlphabetRegex = /^[A-Za-z]+$/;
    if (!values.businessUnit) {
      errors.businessUnit = "Business unit is required!";
    }
    if (!values.businessName) {
      errors.businessName = "Business name is required!";
    } else if (!onlyAlphabetRegex.test(values.businessName)) {
      errors.businessName = "Enter only alphabets!";
    }
    if (!values.locationName) {
      errors.locationName = "Location name  is required!";
    }
    // if (!values.departmentSelect) {
    //   errors.departmentSelect = "Select status   is required!";
    // }
    return errors;
  };
  return (
    <>
      <div className="container ">
        <div className=" row justify-content-md-center bg-light  h-100 card ">
          <Form className="p-3" onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 w-50"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Business Unit
                <span className="text-danger mandatory-field">*</span>
              </Form.Label>
              <select
                name="businessUnit"
                className="form-control form-select"
                value={formValues.businessUnit}
                onChange={handleChange}
              >
                <option>Select Business Unit </option>
                <option>Business Unit</option>
                <option>Business Unit1</option>
                <option>Business Unit2</option>
              </select>
              <p className="text-danger">{formErrors.businessUnit}</p>
            </Form.Group>
            <Form.Group
              className="mb-3 w-50 "
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fs-bold">
                Business Name
                <span className="text-danger mandatory-field">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={formValues.businessName}
                onChange={handleChange}
              />

              <p className="text-danger">{formErrors.businessName}</p>
            </Form.Group>
            <Form.Group
              className="mb-3 w-50"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Location Name
                <span className="text-danger mandatory-field">*</span>
              </Form.Label>
              <select
                name="locationName"
                className="form-control form-select"
                value={formValues.locationName}
                onChange={handleChange}
              >
                <option>Select Location Name</option>
                <option>Location</option>
                <option>Location1</option>
                <option>Location2</option>
              </select>
              <p className="text-danger">{formErrors.locationName}</p>
            </Form.Group>

            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="reset"
              onClick={onClear}
            >
              Clear
            </Button>
            <Button
              className="btn btn-primary m-2"
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
export default BranchAdd;
