import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import "/Users/mac/Desktop/VMS/react/frontend-backend/ABS_VMS/src/pages/VA/VA.css";
import dummyData from './dummyData.json';

const AddStream = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [newVideoSource, setNewVideoSource] = useState("");
  const [data, setData] = useState([]);

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
  }, []);

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
          <div className="notification-icon12">
            <img src="./assets/Bell.png" alt="Notification Icon" />
          </div>
          <div className="profile12">
            <img src="" alt="Profile" />
          </div>
          <div className="menu12">NAME SURNAME</div>
        </div>
        <div className="row112">
          <div className="dropdown12">
            <select>
              <option value="department" selected>Department</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <div className="dropdown12">
            <select>
              <option value="department" selected>Selection of Violation:</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
          <div className="date-chooser12">
            <div className="calendar-icon12">
              <img src="/Users/mac/Desktop/VMS/react/frontend-backend/ABS_VMS/src/assets/icon/Calender.png" alt="Calendar Icon" />
              <span>Duration:</span>
            </div>
            <input type="text" id="duration-picker" />
          </div>
          <button className="download-btn12">
            <img src="/Users/mac/Desktop/VMS/react/frontend-backend/ABS_VMS/src/assets/icon/download.png" alt="Download Icon" />
          </button>
          <button className="search-btn12">Search</button>
        </div>
      </div>
      <div className="divider">
          &nbsp;
      </div>
      <div className="database-table">
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
      <div className="footer">
        <div className="copyright">
          &copy; 2023 Arcturus Business Solutions
        </div>
      </div>
    </div>
  );
};

export default AddStream;