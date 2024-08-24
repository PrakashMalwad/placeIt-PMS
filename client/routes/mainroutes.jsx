// MainRoutes.js
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/StudentRegisterPage';
import RoleSelection from './pages/RolePage';
import SignIn from './pages/SignIn';
import ErrorPage from './pages/ErrorPage';

function MainRoutes() {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<RoleSelection />} />
      <Route path="/register/studentRegister" element={<RegisterPage />} />
      <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for 404 errors */}
    </>
  );
}

export default MainRoutes;
