// StudentRoutes.js
import { Route } from 'react-router-dom';
import StudentDashboard from './pages/student-dashboard';
import EditProfile from './components/student-dash-comp/EditProfile';
import MyApplications from './components/student-dash-comp/MyApplications';
import Mailbox from './components/student-dash-comp/Mailbox';
import Settings from './components/student-dash-comp/Settings';
import MySkills from './components/student-dash-comp/MySkills';
import ShowDrive from './components/student-dash-comp/ShowDrive';
import Interviews from './components/student-dash-comp/Interviews';

function StudentRoutes() {
  return (
    <>
      <Route path="/student-dashboard" element={<StudentDashboard />}>
        <Route path="show-drive" element={<ShowDrive />} />
        <Route path="my-skills" element={<MySkills />} />
        <Route path="my-applications" element={<MyApplications />} />
        <Route path="mailbox" element={<Mailbox />} />
        <Route path="interviews" element={<Interviews />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<EditProfile />} />
      </Route>
    </>
  );
}

export default StudentRoutes;
