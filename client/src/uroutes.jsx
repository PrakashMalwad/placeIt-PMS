
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import StudentDashboard from './pages/StudentDashboard';
import RegisterPage from './pages/RegisterPage';

function uroutes() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/Studentdashboard:" element={<StudentDashboard />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default uroutes;