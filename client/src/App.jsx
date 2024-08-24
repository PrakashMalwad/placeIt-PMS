import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/StudentRegisterPage';
import RoleSelection from './pages/RolePage';
import SignIn from './pages/SignIn';
import StudentDashboard from './pages/student-dashboard';
import EditProfile from './components/student-dash-comp/EditProfile';
import MyApplications from './components/student-dash-comp/MyApplications';
import Mailbox from './components/student-dash-comp/Mailbox';
import Settings from './components/student-dash-comp/Settings';
import MySkills from './components/student-dash-comp/Myskills';
import ShowDrive from './components/student-dash-comp/showDrive';
import Interviews from './components/student-dash-comp/interviews';
import ErrorPage from './pages/ErrorPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/err" element={<ErrorPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/studentRegister" element={<RegisterPage />} />
        <Route path="/student-dashboard" errorElement={ErrorPage} element={<StudentDashboard />} >
          {/* sidebar */}
          <Route path="show-drive" element={<ShowDrive />} /> 
          <Route path="my-skills" element={<MySkills />}/>
          <Route path="my-applications" element={<MyApplications />} />
          <Route path="mailbox" element={<Mailbox />} />
         <Route path="interviews" element={<Interviews />} />
          <Route path="my-skills" element={<MySkills />} />
          {/* stud-nav */}
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>  
        <Route path='*' element={ErrorPage}/>
      </Routes>
    </Router>
  );
}

export default App;
