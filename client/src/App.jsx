import "./App.css";
// External Libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Protected Routes
import ProtectedRoute from "./routes/protectedRoute";

// Page Components
import AdminDashboard from "./pages/adminDashboard";
import CompanyDashboard from "./pages/company-dashboard";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import PlacementCellDashboard from "./pages/PlacementCell-dashboard";
import RoleSelection from "./pages/RolePage";
import SignIn from "./pages/SignIn";
import StudentDashboard from "./pages/student-dashboard";
import StudentRegisterPage from "./pages/StudentRegisterPage";

// Dashboard Components
import CreateDrive from "./components/company-dash-comp/createDrive";
import EditProfile from "./components/student-dash-comp/EditProfile";
import DriveDetails from "./components/student-dash-comp/drivedetails";
import Mailbox from "./components/student-dash-comp/Mailbox";
import MyApplications from "./components/student-dash-comp/MyApplications";
import MySkills from "./components/student-dash-comp/Myskills";
import ShowDrive from "./components/student-dash-comp/showDrive";
import StudentAnalytics from "./components/student-dash-comp/StudentAnalylics";
import StudentProfile from "./components/student-dash-comp/profile";
import Settings from "./components/student-dash-comp/Settings";

// Admin Components
import ManageDrive from "./components/admin-dash-comp/ManageDrive";
import ManageUser from "./components/admin-dash-comp/ManageUser";
import Reports from "./components/admin-dash-comp/reports";
import SettingsPage from "./components/admin-dash-comp/settings";
import ManageCollege from "./components/admin-dash-comp/ManageCollege";
import ManageCompany from "./components/admin-dash-comp/ManageCompany";
import AdminProfile from "./components/admin-dash-comp/profile";

// Placement Cell Components
import ManageStudents from "./components/placementcell-dash-comp/ManageStudents";
import PManageDrive from "./components/placementcell-dash-comp/ManageDrives";
import PlacementCellEnquiryForm from "./pages/placementcellequiry";
import CompanyEnquiryForm from "./pages/companyEnquiry";
import AdminEnquiries from "./components/admin-dash-comp/showEnquiry";
import ViewDriveRequest from "./components/placementcell-dash-comp/ViewDriveRequest";
import ShowApplication from "./components/placementcell-dash-comp/ShowApplication";
import GenerateCollegeCode from "./components/placementcell-dash-comp/GenerateCollegeCode";

//Company Components
import RequestDrive from "./components/company-dash-comp/RequestJobDrive";
import { DriveProvider } from "./components/placementcell-dash-comp/DriveContext";
import RequestedDrives from "./components/company-dash-comp/RequestedDrives";
import ScheduledDrive from "./components/company-dash-comp/ScheduledDrive";
import ManageInterview from "./components/company-dash-comp/ManageInterview";
import ScheduleInterview from "./components/company-dash-comp/ScheduledInterview";
import StudentInterviews from "./components/student-dash-comp/StudentInterview";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route
          path="/register/studentRegister"
          element={<StudentRegisterPage />}
        />
        <Route
          path="/register/companyRegister"
          element={<CompanyEnquiryForm />}
        />

        {/* Placement Cell Enquiry Form */}
        <Route
          path="/register/placementCellRegister"
          element={<PlacementCellEnquiryForm />}
        />

        {/* Protected Student Dashboard Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentAnalytics />} />
          <Route path="show-drive" element={<ShowDrive />} />
          <Route path="show-drive/drive/:id" element={<DriveDetails />} />
          <Route path="my-skills" element={<MySkills />} />
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="mailbox" element={<Mailbox />} />
        
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<StudentProfile />}>
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="interviews" element={<StudentInterviews />} />

        </Route>

        {/* Protected Company Dashboard Routes */}
        
        
        <Route
          path="/company-coordinator/dashboard"
          element={
            <ProtectedRoute>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="request-drive" element={<RequestDrive />} />
          <Route path="view-drive" element={<RequestedDrives />} />
          <Route
            path="view-drive/scheduled-drive/:applicationId"
            element={<ScheduledDrive />}
          />
          <Route path="manage-interview" element={<ManageInterview />} />
          <Route
            path="schedule-interview/:id"
            element={<ScheduleInterview />}
          />
        </Route>

        {/* Protected Admin Dashboard Routes */}
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
          <Route path="manage-college" element={<ManageCollege />} />
          <Route path="manage-company" element={<ManageCompany />} />
          <Route path="manage-drive" element={<ManageDrive />}>
            <Route path="create-drive" element={<CreateDrive />} />
          </Route>
          <Route path="showEnquiries" element={<AdminEnquiries />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* Additional Admin Routes */}
        <Route path="/admin/profile" element={<StudentProfile />} />

        {/* Protected PlacementCell Dashboard Routes */}
        <Route
          path="/placementcell-coordinator/dashboard"
          element={
            <ProtectedRoute>
              <PlacementCellDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="manage-students" element={<ManageStudents />} />

          {/* DriveProvider to wrap placement cell specific routes */}
          <Route
            path="manage-drive"
            element={
              <DriveProvider>
                <PManageDrive />
              </DriveProvider>
            }
          />
          <Route
            path="view-drive-request"
            element={
              <DriveProvider>
                <ViewDriveRequest />
              </DriveProvider>
            }
          />

          <Route
            path="manage-drive/applications/:id"
            element={<ShowApplication />}
          />
          <Route path="get-college-code" element={<GenerateCollegeCode />} />

          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Error Page Route */}
        <Route path="/err" element={<ErrorPage />} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
