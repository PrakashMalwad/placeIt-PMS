import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("user");

  // Redirect to login if the user is not authenticated
  return isLoggedIn ? children : <Navigate to="/signin" />;
}
ProtectedRoute.propTypes = {
    children: PropTypes.string.isRequired,
  };
export default ProtectedRoute;
