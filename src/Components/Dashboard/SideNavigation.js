import React from "react";
import "./SlideNavigation.css";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart, FaTachometerAlt } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

import {
  MdAdminPanelSettings,
  MdManageAccounts,
  MdSettingsSuggest,
} from "react-icons/md";
import { FaFileAlt, FaCalendarAlt, FaTree } from "react-icons/fa";
import { BsFillCalendarCheckFill, BsCalendarRangeFill } from "react-icons/bs";
import { SiChakraui } from "react-icons/si";
import { TbPhysotherapist } from "react-icons/tb";
import {
  RiNotificationFill,
  RiMessageFill,
  RiFolderHistoryLine,
} from "react-icons/ri";

const SideNavigation = () => {
  //useState
  const [collapsed, setCollapsed] = useState(true);

  // added styles
  const styles = {
    sideBarHeight: {
      height: "100%",
      position: "fixed",
      zindex: 1,
      top: 0,
      left: 0,
      overflowx: "hidden",
    },
  };

  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='side'>
      {/* <Header /> */}
      {/* <NavLink to="/department">department</NavLink> */}
      <ProSidebar
        className='bg-danger'
        style={styles.sideBarHeight}
        collapsed={collapsed}>
        <SidebarHeader>
          <div className='m-4  ' onClick={onClickMenuIcon}>
            {/* <h3 className='px-3'>Menu</h3> */}
            {/* float-right */}
            <AiOutlineMenu size={30} />
          </div>
        </SidebarHeader>
        <Menu iconShape='square'>
          <MenuItem
            className='nnn1'
            icon={<FaTachometerAlt />}
            active={window.location.pathname === "/dashboard"}>
            Dashboard
            <Link to='/dashboard' />
          </MenuItem>
          <SubMenu title='EIM Administration' icon={<MdAdminPanelSettings />}>
            <MenuItem
              active={window.location.pathname === "/departmentmaster/"}>
              Department Master
              <Link to='/department' />
            </MenuItem>
            <MenuItem>
              Designation Master
              <Link to='/designation' />
            </MenuItem>
            <MenuItem>
              Organization Master
              <Link to='/organization' />
            </MenuItem>
            <MenuItem>
              Location Master
              <Link to='/location' />
            </MenuItem>
            <MenuItem>
              Branch Master
              <Link to='/branch' />
            </MenuItem>
          </SubMenu>
          <SubMenu title='Employee' icon={<MdManageAccounts />}>
            <MenuItem>Add Employee</MenuItem>
            <MenuItem>Manage Employee</MenuItem>
            <MenuItem>Import Employee Data</MenuItem>
          </SubMenu>
          <SubMenu title='Leave Management' icon={<FaTree />}>
            <MenuItem>
              Leave Configuration
              <Link to='/leaveconfiguration' />
            </MenuItem>
            <MenuItem>
              Leave Type
              <Link to='/leavetype' />
            </MenuItem>
            <MenuItem>
              Holiday Master
              <Link to='/holiday' />
            </MenuItem>
            <MenuItem>
              Leave Entitlement
              <Link to='/leaveentitlement' />
            </MenuItem>
            <MenuItem>
              Leave Application
              <Link to='/leavehistory' />
            </MenuItem>
            <MenuItem>
              Leave Approval
              <Link to='/leaveapproval' />
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<BsFillCalendarCheckFill />}>Attendance</MenuItem>
          <MenuItem icon={<BsCalendarRangeFill />}>Manual Attendance</MenuItem>
          <SubMenu title='Monthly KRA' icon={<SiChakraui />}>
            <MenuItem>Add Questionnaire</MenuItem>
            <MenuItem>Send Questionnaire</MenuItem>
            <MenuItem>All KRA Form List</MenuItem>
            <MenuItem>Notification Dates</MenuItem>
            <MenuItem>Employee KRA</MenuItem>
          </SubMenu>
          <MenuItem icon={<RiNotificationFill />}>Announcement</MenuItem>
          <MenuItem icon={<RiMessageFill />}>
            Message
            <Link to='/messages' />
          </MenuItem>
          <MenuItem icon={<FaFileAlt />}>Reports</MenuItem>
          <SubMenu title='Log History' icon={<RiFolderHistoryLine />}>
            <MenuItem>Active Log</MenuItem>
            <MenuItem>Login Activity</MenuItem>
          </SubMenu>
          <SubMenu title='Other Modules' icon={<TbPhysotherapist />}>
            <MenuItem>Asset Management</MenuItem>
            <MenuItem>ATS</MenuItem>
            <MenuItem>Payroll</MenuItem>
            <MenuItem>Document Management Login</MenuItem>
          </SubMenu>
          <SubMenu title='Settings' icon={<MdSettingsSuggest />}>
            <MenuItem>Create Role</MenuItem>
            <MenuItem>User Mapping</MenuItem>
            <MenuItem>Access Privilege</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar>
    </div>
  );
};
export default SideNavigation;
