import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Users/mac/Desktop/VMS/react/frontend-backend/VMS/src/assets/imgs/logo.png";
import "/Users/mac/Desktop/VMS/react/frontend-backend/VMS/src/pages/VA/VA.css";
import dummyData from './dummyData.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import departmentsData from './departments.json'; // Importing the department data
import violationsData from './violations.json'; // Importing the violation data
import SearchButton from "./SearchButton";
import DownloadButton from "./DownloadButton";


const VA = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [newVideoSource, setNewVideoSource] = useState("");
  const [data, setData] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedEndDateTime, setSelectedEndDateTime] = useState(null);
  const [departments, setDepartments] = useState([]); // State variable for department data
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State variable for selected department
  const [selectedViolation, setSelectedViolation] = useState("");
  const [isSearchInteractive, setIsSearchInteractive] = useState(false);
  const [isDownloadInteractive, setIsDownloadInteractive] = useState(false);


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

    // Fetch department data from the JSON file
    setDepartments(departmentsData);

  }, []);

  useEffect(() => {
    if (
      selectedDepartment &&
      selectedViolation &&
      selectedDateTime &&
      selectedEndDateTime
    ) {
      setIsSearchInteractive(true);
      setIsDownloadInteractive(true);
    } else {
      setIsSearchInteractive(false);
      setIsDownloadInteractive(false);
    }
  }, [selectedDepartment, selectedViolation, selectedDateTime, selectedEndDateTime]);  

  useEffect(() => {
  
    // Enable search button if all four selections are made
    if (
      selectedDepartment &&
      selectedViolation &&
      selectedDateTime &&
      selectedEndDateTime
    ) {
      setIsSearchInteractive(true);
    } else {
      setIsSearchInteractive(false);
    }
  }, [selectedDepartment, selectedViolation, selectedDateTime, selectedEndDateTime]);
  

  const [showDatabaseTable, setShowDatabaseTable] = useState(false);

  const handleDownloadButtonClick = () => {
    // Perform API call and fetch the data for download here
  
    // Example code to download data as a file
    const dataToDownload = dummyData.filter((data) => {
      // Add your own filtering logic based on user selections
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
    // Make API call and fetch data here
  
    // Show the database table
    setShowDatabaseTable(true);
  };    

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.setItem("authenticated", false);
    setAuthenticated(false);
    navigate("/login");
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
              selected={selectedDateTime} // Use the state variable to set the selected date and time stamp
              showTimeSelect // Enable time selection
              timeFormat="hh:mm aa" // Set the time format (12-hour format)
              timeIntervals={15} // Set the time intervals (e.g., 15 minutes)
              dateFormat="MM-dd-yyyy hh:mm aa" // Set the desired date and time format
              placeholderText="Start Date & Time" // Placeholder text for the input field
              popperPlacement="bottom-end" // Position the date picker below the input field
              onChange={(date) => setSelectedDateTime(date)} // Update the state variable with the selected value
              value={selectedDateTime ? selectedDateTime : ''} // Display the selected value from the state variable
            />
          </div>
          <div className="end-date">
            <DatePicker
              id="end-date-picker"
              selected={selectedEndDateTime} // Use the state variable to set the selected end date and time stamp
              showTimeSelect // Enable time selection
              timeFormat="hh:mm aa" // Set the time format (12-hour format)
              timeIntervals={15} // Set the time intervals (e.g., 15 minutes)
              dateFormat="MM-dd-yyyy hh:mm aa" // Set the desired date and time format
              placeholderText="End Date & Time" // Placeholder text for the input field
              popperPlacement="bottom-start" // Position the date picker below the input field
              onChange={(date) => setSelectedEndDateTime(date)} // Update the state variable with the selected value
              value={selectedEndDateTime ? selectedEndDateTime : ''} // Display the selected value from the state variable
            />
          </div>
          {/* Download button */}
          <DownloadButton
            isInteractive={isDownloadInteractive}
            onClick={handleDownloadButtonClick}
          />
          {/* Search button */}
          <SearchButton
            isInteractive={isSearchInteractive}
            onClick={handleSearchButtonClick}
          />
        </div>
      </div>
      <div className="divider">
          &nbsp;
      </div>  
      {showDatabaseTable && (
      <div className="va-database-table">
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>IMAGE</th>
              <th>CAMERA NAME</th>
              <th>PROCESS</th>
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
                <td>{data.dateTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
      )}
      <div className="footer">
        <div className="copyright">
          &copy; 2023 Arcturus Business Solutions
        </div>
      </div>
    </div>
  );
};

export default VA;