import React, { useState } from "react";
import { Link } from "react-router-dom";
const DepartmentInnerNav = () => {
  const [clockIn, setClockIn] = useState(true);
  const [clockOut, setClockOut] = useState(false);

  const webClockIn = () => {
    setClockIn(false);
    setClockOut(true);
  };
  const webClockOut = () => {
    setClockOut(false);
    setClockIn(true);
  };
  return (
    <>
      <div className='row fix' style={{ background: "#0b0b45" }}>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <div className=' p-3 navbar navbar-expand-lg'>
            <div className='row'>
              <div className='col-md-12'>
                <h4 className='text-white px-2'>EIM Administration</h4>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  <ul className='navbar-nav'>
                    <li className='nav-item active'>
                      <Link className='nav-link text-white' to='/department'>
                        Department
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className='nav-link text-white' to='/designation'>
                        Designation
                      </Link>
                    </li>
                    <li className='nav-item' disabled>
                      <Link className='nav-link text-white' to='/organization'>
                        Organization
                      </Link>
                    </li>
                    <li className='nav-item' disabled>
                      <Link className='nav-link text-white' to='/branch'>
                        Branch
                      </Link>
                    </li>
                    <li className='nav-item' disabled>
                      <Link className='nav-link text-white' to='/location'>
                        Location
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-1'></div>
      </div>
    </>
  );
};
export default DepartmentInnerNav;
