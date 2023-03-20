import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

import Select from "react-select";
let data = [
  { value: 18, label: "eighteen" },
  { value: 20, label: "twenty" },
  { value: 10, label: "Ten" },
];
export default function App() {
  const { register, handleSubmit, errors, control } = useForm();
  const [initailSelect, setInitialSelect] = useState({
    value: 18,
    label: "eighteen",
  });

  const submitForm = (e) => {
    console.log(errors);
    console.log(e);
  };
  const onChangeAge = (e) => {
    setInitialSelect(e);
  };
  return (
    <div className='App'>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <div className='form-group'>
              <label htmlFor='fname'>first name</label>
              <input
                type='text'
                name='fname'
                id='fname'
                className={
                  errors.fname ? "form-control error_input" : "form-control"
                }
                placeholder='first name'
                ref={register({
                  required: "first name is required",
                })}
              />

              {errors.fname && (
                <div>
                  <span className='text-danger'>{errors.fname.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
            <div className='form-group'>
              <label className='' htmlFor='group_name'>
                Device type
              </label>
              <Controller
                name='deviceType'
                as={Select}
                defaultValue=''
                options={[{ value: "", label: "Select Device Type" }, ...data]}
                control={control}
                rules={{ required: true }}
              />
              {errors.deviceType && errors.deviceType.type === "required" ? (
                <div>
                  <span className='text-danger'>
                    {"Device Type is required"}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='form-group mt-4'>
          <button className='btn btn-primary' type='submit'>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
