import React, { useState } from "react";
// import ReactDOM from 'react-dom';
import logo from "../../images/hrms-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import SideNavigation from "./SideNavigation";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import {
  FaFileAlt,
  FaCalendarAlt,
  FaTree,
  FaBuilding,
  FaChartBar,
  FaChartLine,
} from "react-icons/fa";
import { MdSettingsSuggest } from "react-icons/md";
import { RiNotificationFill } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";
import "./Dashboard.css";
import Header from "./Header";
import Modal from "react-bootstrap/Modal";

//header
const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className='p-3 mt-80'>
        <div className='row'>
          <marquee className='text-warning f-20'>Independence Day</marquee>
        </div>
        <div className='row'>
          <div className='col-md-3 p-4'>
            <div className='card border-0'>
              <div className='align-items-center'>
                {/* <input type='file' id='upload' multiple='false' /> */}
                <CompanyLogo />
              </div>
              {/* <p>dfsfsda</p> */}
            </div>
          </div>
          <div className='col-md-2'>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "#2A9D8F" }}>
              <GoFileDirectory className='direct' />
              <h6 className='p-3 text-dark'>Directory</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Gray" }}>
              <FaFileAlt className='direct' />
              <h6 className='p-3 text-dark'>Reports</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Orange" }}>
              <RiNotificationFill className='direct' />
              <h6 className='p-3 text-dark'>Announcement</h6>
            </div>
          </div>
          <div className='col-md-2 '>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "SlateBlue" }}>
              <BsFillCalendarCheckFill className='direct' />
              <h6 className='p-3 text-dark'>Attendance</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "MediumSeaGreen" }}>
              <FaTree className='direct' />
              <h6 className='p-3 text-dark'>Leave</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "#2A9D8F" }}>
              <FaChartLine className='direct' />
              <h6 className='p-3 text-dark'>Monthly KRA</h6>
            </div>
          </div>
          <div className='col-md-2'>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Violet" }}>
              <BiTransferAlt className='direct' />
              <h6 className='p-3 text-dark'>Payroll</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "DodgerBlue" }}>
              <FaCalendarAlt className='direct' />
              <h6 className='p-3 text-dark'>Calendar</h6>
            </div>
            <div
              className='card border-0 m-3 align-items-center icon direct1'
              style={{ color: "Tomato" }}>
              <MdSettingsSuggest className='direct' />
              <h6 className='p-3 text-dark'>Settings</h6>
            </div>
          </div>
          <div className='col-md-2'>
            <div className='card  m-3 align-items-center reinvite'>
              <div className='m-3'>
                <h6>Employees Onboard: 7</h6>
                <h6>Employees Not Activated: 5</h6>
                <h6>Invalid Email: 0</h6>
                <h6>Mobile Number not Verified: 3</h6>
                <button type='button' className='form-control rounded'>
                  Re-invite
                </button>
              </div>
            </div>
            <div className='card  m-3 align-items-center reinvite'>
              <div className='m-3'>
                <h5 className='text-center'>Announcement</h5>
                <h5>Title:</h5>
                <h6> Independence Day</h6>
                <h5>Description: </h5>
                <h6>
                  Independence Day is celebrated annually on 15 August ...
                </h6>
                {/* <button type='button' className='form-control rounded'>
                  Read more
                </button> */}
                <AnnouncementDetails />
              </div>
            </div>
          </div>
          <div className='colmd-1'></div>
        </div>
      </div>
    </div>
  );
};

function CompanyLogo() {
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = (e) => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none",
        }}
      />
      <div
        style={{
          height: "150px",
          width: "150px",
          // border: "1px dashed black",
        }}
        onClick={() => imageUploader.current.click()}>
        <img
          ref={uploadedImage}
          style={{
            width: "150px",
            height: "150px",
            position: "absolute",
          }}
        />
        <h6 className='align-items-center m-4'>Upload Logo</h6>
      </div>
      Company Logo
    </div>
  );
}

const AnnouncementDetails = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <button
        onClick={handleShow}
        className='form-control rounded btn btn-light '>
        Read more
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <h4>Title</h4>
              <span>Independence Day</span>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h4>Description</h4>
              <span>
                Independence Day is celebrated annually on 15 August as a
                national holiday in India commemorating the nation's
                independence from the United Kingdom on 15 August 1947
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
