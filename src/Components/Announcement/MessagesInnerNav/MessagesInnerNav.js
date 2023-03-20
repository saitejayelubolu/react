import React, { useState } from "react";
import { Link } from "react-router-dom";
const MessagesInnerNav = () => {
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
                <h4 className='text-white px-2'>Messages</h4>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  <ul className='navbar-nav'>
                    <li className='nav-item active'>
                      <Link className='nav-link text-white' to='/Messages'>
                        Messages
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
export default MessagesInnerNav;
