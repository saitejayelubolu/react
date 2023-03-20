import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TableRows from "./TableRows";
// import Dummy1 from "../Dummy1";
// import Header from "../Dashboard/Header";
import InnerHeader from "../../Dashboard/InnerHeader";
import { useForm } from "react-hook-form";
import LeaveInnerNav from "../InnerNav/LeaveInnerNav";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022, 6, 0),
    end: new Date(2022, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function Calenders() {
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloses = () => setShows(false);
  const handleShows = () => setShows(true);

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: "",
      date: "",
      option: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  const disableStartDate = () => {
    console.log(newEvent.start);
    return newEvent.start;
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
    setShow(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => alert(JSON.stringify(data));
  return (
    <>
      <InnerHeader />
      <div className='p-2 mt-80'>
        <LeaveInnerNav />
        <div className='row p-3 mt-100'>
          {/* <InnerHeader />*/}
          <div className='main mt-4'>
            <div className='container'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='text-end'>
                    <form>
                      <Button
                        variant='primary'
                        className='me-3'
                        onClick={handleShows}>
                        UPLOAD HOLIDAYS
                      </Button>

                      <Modal size='lg' show={shows} onHide={handleCloses}>
                        <Modal.Header closeButton>
                          <Modal.Title>UPLOAD HOLIDAYS</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className='row'>
                            <div className='col-md-12'>
                              <table className='table'>
                                <thead>
                                  <tr>
                                    <th>Full Name</th>
                                    <th>Date</th>
                                    <th>Is Optional</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <TableRows
                                    rowsData={rowsData}
                                    deleteTableRows={deleteTableRows}
                                    handleChange={handleChange}
                                  />
                                </tbody>
                              </table>
                              <button
                                className='btn btn-outline-success'
                                onClick={addTableRows}>
                                +Add
                              </button>
                            </div>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant='secondary'
                            type='reset'
                            onClick={handleCloses}>
                            Close
                          </Button>
                          <Button variant='primary'>Save</Button>
                        </Modal.Footer>
                      </Modal>

                      <Button variant='primary' onClick={handleShow}>
                        Add Events
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div>
                            <label
                              name='leave'
                              {...register("leave", {
                                required: "Leave is required",
                              })}>
                              EVENT TITLE
                            </label>

                            <input
                              className='form-control'
                              type='text'
                              placeholder='Add Title'
                              style={{ width: "100%", marginRight: "10px" }}
                              value={newEvent.title}
                              onChange={(e) =>
                                setNewEvent({
                                  ...newEvent,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            {errors.leave && (
                              <span className='text-danger'>
                                {errors.leave.message}
                              </span>
                            )}
                          </div>
                          <div>
                            <label>Start Date</label>
                            <DatePicker
                              className='form-control'
                              placeholderText='Start Date'
                              style={{ marginRight: "10px" }}
                              name='start'
                              selected={newEvent.start}
                              // min={disablePastDate()}
                              minDate={new Date()}
                              onChange={(start) =>
                                setNewEvent({
                                  ...newEvent,
                                  start,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label>End Date</label>

                            <DatePicker
                              className='form-control'
                              placeholderText='End Date'
                              selected={newEvent.end}
                              minDate={disableStartDate()}
                              onChange={(end) =>
                                setNewEvent({
                                  ...newEvent,
                                  end,
                                })
                              }
                            />
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant='secondary'
                            type='reset'
                            onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            type='button'
                            variant='primary'
                            value='submit'
                            aria-label='Close'
                            onClick={handleAddEvent}>
                            Save
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </form>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12 p-3'>
                  <Calendar
                    localizer={localizer}
                    events={allEvents}
                    startAccessor='start'
                    endAccessor='end'
                    style={{ height: 500 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calenders;
