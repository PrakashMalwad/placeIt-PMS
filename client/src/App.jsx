import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/StudentRegisterPage";
import RoleSelection from "./pages/RolePage";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/student-dashboard";
import EditProfile from "./components/student-dash-comp/EditProfile";
import MyApplications from "./components/student-dash-comp/MyApplications";
import Mailbox from "./components/student-dash-comp/Mailbox";
import Settings from "./components/student-dash-comp/Settings";
import MySkills from "./components/student-dash-comp/Myskills";
import ShowDrive from "./components/student-dash-comp/showDrive";
import Interviews from "./components/student-dash-comp/Interviews";
import ErrorPage from "./pages/ErrorPage";
import CompanyDashboard from "./pages/company-dashboard";
import CreateDrive from "./components/company-dash-comp/createDrive";
import AdminDashboard from "./pages/adminDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DriveDetails from "./components/student-dash-comp/drivedetails";
import ManageUser from "./components/admin-dash-comp/ManageUser";
import ManageDrive from "./components/admin-dash-comp/ManageDrive";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/err" element={<ErrorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/studentRegister" element={<RegisterPage />} />
        {/* Student Route */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="show-drive" element={<ShowDrive />} />
          <Route path="show-drive/drive/:id" element={<DriveDetails />} />
          <Route path="my-skills" element={<MySkills />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="mailbox" element={<Mailbox />} />
          <Route path="interviews" element={<Interviews />} />
          
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        {/* Admin DashRoute */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
        <Route path="*" element={<ManageUser />} />
        <Route path="manage-drive" element={<ManageDrive />} >
        <Route path="create-drive" element={<CreateDrive />}/>
        </Route>
        {/* <Route path="/reports"/> */}
        <Route path="manage-users" element={<ManageUser/>}/>
        </Route> 
        {/* Errorpage route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
