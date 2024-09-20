import "./App.css";
import HomePage from "./pages/HomePage";
import StudentRegisterPage from "./pages/StudentRegisterPage";
import CompanyRegisterPage from "./components/registeration-forms/CompanyRegisterform";
import PlacementCellRegisterPage from "./components/registeration-forms/PlacementCellRegisterform";

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
import Reports from "./components/admin-dash-comp/reports";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DriveDetails from "./components/student-dash-comp/drivedetails";
import ManageUser from "./components/admin-dash-comp/ManageUser";
import ManageDrive from "./components/admin-dash-comp/ManageDrive";
import ProtectedRoute from "./routes/protectedRoute";  // Import the ProtectedRoute component
import StudentAnalytics from "./components/student-dash-comp/StudentAnalylics";
import StudentProfile from "./components/student-dash-comp/profile";
import SettingsPage from "./components/admin-dash-comp/settings";

import PlacementCellDashboard from "./pages/PlacementCell-dashboard";
import ManageStudents from "./components/placementcell-dash-comp/ManageStudents";
import PManageDrive from "./components/placementcell-dash-comp/ManageDrives"
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/studentRegister" element={<StudentRegisterPage />} />
        <Route path="/register/companyRegister" element={<CompanyRegisterPage />} />
        <Route path="/register/placementCellRegister" element={<PlacementCellRegisterPage/>} />
        {/* Protected Student Dashboard Routes */}
        <Route 
          path="/student/dashboard" 
          
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
           <Route 
          index 
          element={<StudentAnalytics/>} 
        />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="show-drive" element={<ShowDrive />} />
          <Route path="show-drive/drive/:id" element={<DriveDetails />} />
          <Route path="my-skills" element={<MySkills />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="mailbox" element={<Mailbox />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<StudentProfile />} >
            <Route path="edit-profile" element={<EditProfile/>}/>
          </Route>
        </Route>

        {/* Protected Company Dashboard */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Dashboard Routes */}
        <Route
          path="/admin/"
          >
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute> 
          }
        >
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="manage-drive" element={<ManageDrive />}>

            <Route path="create-drive" element={<CreateDrive />} />

          </Route>
        </Route>
        {/* Protected PlacementCell Dashboard Routes */}
        <Route
          path="/placementcell-coordinator/dashboard"
          element={
            <ProtectedRoute>
              <PlacementCellDashboard/>
            </ProtectedRoute>
          }
        >
          <Route path="manage-students" element={<ManageStudents />}/>
          <Route path="manage-drive" element={<PManageDrive />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Errorpage route */}
        <Route path="/err" element={<ErrorPage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin/profile" element={<StudentProfile/>}/>
      </Routes>
      
    </Router>
  );
}

export default App;
