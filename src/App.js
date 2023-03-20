import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./vendor/bootstrap/css/bootstrap.min.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./vendor/animate-css/vivify.min.css";
import "./vendor/c3/c3.min.css";
import "./vendor/chartist/css/chartist.min.css";
import "./vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css";
import "./vendor/jvectormap/jquery-jvectormap-2.0.3.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import "./App.css";
//Login
import Login from "./Components/Login/Login";
import ResetPassword from "./Components/Login/ResetPassword";
import LoginForm from "./Components/Login/LoginForm";

// import Sidenav from "./Components/Dashboard/SideNavigation";
import Header from "./Components/Dashboard/Header";
//dashboard

// Dashboard
import SideNavigation from "./Components/Dashboard/SideNavigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Auth from "./Components/route";
// import InnerNav from "./Components/EimAdmin/InnerNav/InnerNav";
//EIM

import Department from "./Components/EimAdmin/Department/Department";
import Designation from "./Components/EimAdmin/Designation/Designation";
import Organization from "./Components/EimAdmin/Organization/Organization";
import LeaveType from "./Components/LeaveManagement/LeaveType/Leave";
import LeaveConfig from "./Components/LeaveManagement/LeaveConfiguration/Leaveconfig";
import InnerSideNavigation from "./Components/Dashboard/InnerSideNavigation";

//Holiday
import Calenders from "./Components/LeaveManagement/Holiday/Calender";
//messages
import Location from "./Components/EimAdmin/Location/Location";
import Branch from "./Components/EimAdmin/Branch/Branch";
import Announcement from "./Components/Announcement/Announcement";
import Messages from "./Components/Announcement/Messages";
import LeaveEntitlement from "./Components/LeaveManagement/Leave-entitlements/LeaveEntitlement";
import Mess from "./Components/Announcement/Mess";
import Vali from "./Components/Announcement/Vali";
import NewPassword from "./Components/Login/NewPassword";
import AnnouncementNew from "./Components/Announcement/AnnouncementNew";
import AddForms from "./Components/Employee/AddForms";
import AddEmployee from "./Components/Employee/AddEmployee";
import ManageEmployee from "./Components/Employee/ManageEmployee";
import { Token } from "@mui/icons-material";
//function
export default function App() {
  // let user = JSON.parse(localStorage.getItem("user-info"));
  // let token = user.data.token.access;
  // console.log("Hello", token);
  // let tokenVal = JSON.stringify(token.slice(0, 36));
  // console.log("saiteja@vitelglobal.com");
  // localStorage
  let user = JSON.parse(localStorage.getItem("user-data"));
  console.log("local", user);
  const uid = user.uid;
  const usertoken = user.token;

  return (
    <BrowserRouter>
      {/* <SideNavigation /> */}
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/route" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/department" element={<Department />} />
        <Route path="/designation" element={<Designation />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/leavetype" element={<LeaveType />} />
        <Route path="/leaveconfiguration" element={<LeaveConfig />} />
        <Route path="/innersidenav" element={<InnerSideNavigation />} />
        <Route path="/holiday" element={<Calenders />} />
        <Route path="/location" element={<Location />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/leaveentitlement" element={<LeaveEntitlement />} />
        <Route path="/test" element={<Mess />} />
        <Route path="/vali" element={<Vali />} />
        <Route path="/new" element={<AnnouncementNew />} />
        <Route
          path={`/newpassword/${uid}/${usertoken}/`}
          element={<NewPassword />}
        />
        <Route path={`/newpassword/`} element={<NewPassword />} />
        <Route path={`/addforms/`} element={<AddForms />} />
        <Route path={`/addemployee/`} element={<AddEmployee />} />
        <Route path={`/manageemployee/`} element={<ManageEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}
