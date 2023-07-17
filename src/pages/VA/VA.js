import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import logo from "/Users/mac/Desktop/VMS/react/frontend-backend/VMS/src/assets/imgs/logo.png";
import "/Users/mac/Desktop/VMS/react/frontend-backend/VMS/src/pages/VA/VA.css";
import dummyData from './dummyData.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import departmentsData from './departments.json';
import violationsData from './violations.json';
import SearchButton from "./SearchButton";
import DownloadButton from "./DownloadButton";

const VA = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [newVideoSource, setNewVideoSource] = useState("");
  const [data, setData] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedViolation, setSelectedViolation] = useState("");
  const [isSearchInteractive, setIsSearchInteractive] = useState(false);
  const [isDownloadInteractive, setIsDownloadInteractive] = useState(false);
  const [showDatabaseTable, setShowDatabaseTable] = useState(false);
  const [buttonStatus, setButtonStatus] = useState({});
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState(null);
  const [formName, setFormName] = useState("");
  const [formViolation, setFormViolation] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser === "true") {
      setAuthenticated(true);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    setData(dummyData);
    setDepartments(departmentsData);
  }, []);

  useEffect(() => {
    const isFormValid =
      selectedDepartment && selectedViolation && selectedDateTime && selectedEndDateTime;

    setIsSearchInteractive(isFormValid);
    setIsDownloadInteractive(isFormValid);
  }, [selectedDepartment, selectedViolation, selectedDateTime, selectedEndDateTime]);

  useEffect(() => {
    const initialButtonStatus = {};
    dummyData.forEach((data) => {
      initialButtonStatus[data.serialNumber] = true;
    });
    setButtonStatus(initialButtonStatus);
  }, []);

  const handleDownloadButtonClick = () => {
    const dataToDownload = dummyData.filter((data) => {
      return (
        data.department === selectedDepartment &&
        data.violation === selectedViolation &&
        data.dateTime >= selectedDateTime &&
        data.dateTime <= selectedEndDateTime
      );
    });

    const jsonData = JSON.stringify(dataToDownload);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearchButtonClick = () => {
    setShowDatabaseTable(true);
  };

  const handleResetButtonClick = () => {
    setSelectedDepartment("");
    setSelectedViolation("");
    setSelectedDateTime(null);
    setSelectedEndDateTime(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", false);
    setAuthenticated(false);
    navigate("/login");
  };

  const toggleButton = (serialNumber) => {
    setButtonStatus((prevState) => ({
      ...prevState,
      [serialNumber]: !prevState[serialNumber],
    }));
  };

  const handleOpenForm = (serialNumber) => {
    setSelectedButtonId(serialNumber);
    setShowFormModal(true);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
  };

  const handleFormSubmit = () => {
    toggleButton(selectedButtonId);
    handleCloseForm();
  };

  return (
    <div>
      <div className="sidebar">
        <img src={logo} alt="Logo" />
        <button onClick={() => handleNavigation("/dashboard")}>Dashboard</button>
        <button onClick={() => handleNavigation("/playback")}>Playback</button>
        <button onClick={() => handleNavigation("/add-stream")}>Add Stream</button>
        <button onClick={() => handleNavigation("/video-analytics")}>Video Analytics</button>
        <button onClick={() => handleNavigation("/stream-settings")}>ONVIF Settings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="container12">
        <div className="header12">
          <div className="left12">CAMERA RESULT / DEPARTMENT / CAMERA NAME</div>
          <div className="menu12">NAME SURNAME</div>
        </div>
        <div className="selection-row">
          <div className="department">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="violation">
            <select
              value={selectedViolation}
              onChange={(e) => setSelectedViolation(e.target.value)}
            >
              <option value="">Select Violation</option>
              {violationsData.map((violation, index) => (
                <option key={index} value={violation}>
                  {violation}
                </option>
              ))}
            </select>
          </div>
          <div className="start-date">
            <DatePicker
              id="duration-picker"
              selected={selectedDateTime}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              dateFormat="MM-dd-yyyy hh:mm aa"
              placeholderText="Start Date & Time"
              popperPlacement="bottom-end"
              onChange={(date) => setSelectedDateTime(date)}
              value={selectedDateTime ? selectedDateTime : ""}
            />
          </div>
          <div className="end-date">
            <DatePicker
              id="end-date-picker"
              selected={selectedEndDateTime}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={15}
              dateFormat="MM-dd-yyyy hh:mm aa"
              placeholderText="End Date & Time"
              popperPlacement="bottom-start"
              onChange={(date) => setSelectedEndDateTime(date)}
              value={selectedEndDateTime ? selectedEndDateTime : ""}
            />
          </div>
          {/* Search button */}
          <SearchButton
            isInteractive={isSearchInteractive}
            onClick={handleSearchButtonClick}
          />
          {/* Download button */}
          <DownloadButton
            isInteractive={isDownloadInteractive}
            onClick={handleDownloadButtonClick}
          />
          {/* Reset button */}
          <button className="va-reset-button" onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
      </div>
      <div className="divider">&nbsp;</div>
      <div className="va-database-table">
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>IMAGE</th>
              <th>CAMERA NAME</th>
              <th>PROCESS</th>
              <th>OPEN/CLOSE</th>
              <th>DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data) => (
              <tr key={data.serialNumber}>
                <td>{data.serialNumber}</td>
                <td>{data.image}</td>
                <td>{data.cameraName}</td>
                <td>{data.process}</td>
                <td>
                  <button
                    disabled={!buttonStatus[data.serialNumber]}
                    onClick={() => handleOpenForm(data.serialNumber)}
                  >
                    {buttonStatus[data.serialNumber] ? "OPEN" : "CLOSE"}
                  </button>
                </td>
                <td>{data.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="footer">
        <div className="copyright">
          &copy; 2023 Arcturus Business Solutions
        </div>
      </div>

      {/* Form Modal */}
      <Modal show={showFormModal} onHide={handleCloseForm} centered>
        <div className="form-modal-container">
          <Modal.Header closeButton>
          <div class="form-wrapper">
            <Modal.Title>Violation Form</Modal.Title>
          </div>
          </Modal.Header>
          <Modal.Body>
            <Form className="form-modal">
              <Form.Group className="form-group">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Enter Name"
                  maxLength={40}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label className="form-label">Violation</Form.Label>
                {violationsData.map((violation, index) => (
                  <Form.Check
                    className="form-check-label"
                    key={index}
                    type="radio"
                    label={violation}
                    checked={formViolation === violation}
                    onChange={() => setFormViolation(violation)}
                  />
                ))}
              </Form.Group>
              <div className="form-buttons">
                <Button variant="secondary" onClick={handleCloseForm}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default VA;