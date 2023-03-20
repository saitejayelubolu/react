import React from "react";
// import ReactDOM from 'react-dom';
function Employee() {
  return <h1>Employee</h1>;
}
export default Employee;
<form onSubmit={handleSubmit(submitForm)}>
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
      <h2 className='font-semibold text-3xl mb-8'>Personal Details</h2>

      {/* paste */}
      <div className='row'>
        <div className='col-md-6 mb-2 linhe'>
          <div class='form-group'>
            <label className='form-label'>Company Name</label>
            <select
              name='Company_name'
              class='form-control'
              {...register("Company_name", {
                required: "Company Name is Required",
              })}>
              <option value=''>-- Select Company name --</option>
              <option value='73'>Pranathi Software Services</option>
              <option value='34'>Vitel Global Communication</option>
            </select>
            {/* <p class="text-danger fnsd">Company name is required!</p> */}
          </div>
          {/* <div> */}
          {errors.Company_name && (
            <span className='text-danger fnsd'>
              {errors.Company_name.message}
            </span>
          )}
          {/* </div> */}
        </div>

        <div className='col-md-6 mb-2 linhe'>
          <div class='form-group'>
            <label className='form-label'>Business Unit</label>
            <select
              name='Business_Unit'
              class='form-control'
              {...register("Business_Unit", {
                required: "Business Unit is Required",
              })}>
              <option value=''>-- Select Business Unit --</option>
              <option value='73'>Pranathi Software Services</option>
              <option value='34'>Vitel Global Communication</option>
            </select>
            {/* <p class="text-danger fnsd">Company name is required!</p> */}
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
            {/* <DatePicker
                    className="form-control"
                    onChange={handleChangeDate}
                    selected={dates}
                    showYearDropdown
                    // dateFormatCalendar="MMMM"
                    dateFormat="YYYY/MM/DD"
                    yearDropdownItemNumber={150}
                    minDate={moment().subtract(150, "years")._d}
                    maxDate={moment().subtract(18, "years")._d}
                    scrollableYearDropdown
                  /> */}
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
          <div class='form-group'>
            <label className='form-label'>Gender</label>
            <select
              name='Gender'
              class='form-control'
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
              <span className='text-danger fnsd'>{errors.Gender.message}</span>
            )}
          </div>
        </div>

        <div className='col-md-6 mb-2 linhe'>
          <div class='form-group'>
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
          <div class='form-group'>
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
          <div class='form-group'>
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
          <div class='form-group'>
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
          <div class='form-group'>
            <label className='form-label'>Marital Status</label>
            <select
              name='marital'
              class='form-control'
              {...register("Marrital_Status", {
                required: "Marital Status is Required",
              })}>
              <option value=''>-- Select Marital Status --</option>
              <option value='1'>Married</option>
              <option value='2'>Single</option>
            </select>
            {/* <p class="text-danger fnsd">Company name is required!</p> */}
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
          <div class='form-group'>
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
      </div>
    </section>
  )}
  {formStep >= 1 && (
    <section style={{ display: formStep === 1 ? "block" : "none" }}>
      <h2 className='font-semibold text-3xl mb-8'>Employment Details</h2>
      {/* <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="text-input"
              {...register("address", {
                required: {
                  value: true,
                  message: "please type a address",
                },
              })}
            />
            {errors.address && <p>{errors.address.message}</p>} */}

      {/* paste */}

      <div className='row'>
        <div className='col-md-6 mb-2 linhe'>
          <div class='form-group'>
            <label className='form-label'>Department Name</label>
            <select
              name='Department_Name'
              class='form-control'
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
          <div class='form-group'>
            <label className='form-label'>Designation Name</label>
            <select
              name='Designation_Name'
              class='form-control'
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
          <div class='form-group'>
            <label className='form-label'>Reporting Manager</label>
            <select
              name='Reporting_Manager'
              class='form-control'
              {...register("Reporting_Manager", {
                required: "Reporting Manager is Required",
              })}>
              <option value='1'>Admin Vikram Batra (VGS-01PSE-0001)</option>
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
          <div class='form-group'>
            <label className='form-label'>Location</label>
            <select
              name='Location'
              class='form-control'
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
          <div class='form-group'>
            <label className='form-label'>Branch Name</label>
            <select
              name='Branch_Name'
              class='form-control'
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
      <h2 className='font-semibold text-3xl mb-8'>3Contact Details</h2>
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
                Note:Please enter the area pincode in order to populate the City
                and State
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
                Note:Please enter the area pincode in order to populate the City
                and State
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
        <select value={color} onChange={(e) => setColor(e.target.value)}>
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
  {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
</form>;
