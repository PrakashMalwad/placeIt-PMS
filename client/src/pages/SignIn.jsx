
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Oval } from "react-loader-spinner";
import Footer from "../components/footer";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
        const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();
        if (response.ok) {
            const { token, user } = data;

            if (!user || !user.role) {
                throw new Error("Invalid response format");
            }

            sessionStorage.setItem("token", token);

            sessionStorage.setItem("user", JSON.stringify(user));

            setSuccessMessage("Login successful!");
            setErrorMessage("");

            switch (user.role) {
                case "student":
        
                    navigate("/student/dashboard");
                    break;
                case "admin":
                    navigate("/admin/dashboard");
                    break;
                case "company-coordinator":
                    navigate("/company/dashboard");
                    break;
                case "placementcell-coordinator":
                    navigate("/placementcell-coordinator/dashboard");
                    break;
                default:
                    navigate("/");
            }
        } else {
            setErrorMessage(data.msg || "Login failed");
            setSuccessMessage("");
        }
    } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
        console.error("Login error:", error);
        setSuccessMessage("");
    } finally {
        setIsLoading(false);
    }
};


  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="bg-white text-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 lg:mx-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Sign In</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="role" className="block text-base sm:text-lg font-medium mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="company-coordinator">Company</option>
                <option value="placementcell-coordinator">Placement Cell Coordinator</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block text-base sm:text-lg font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="block text-base sm:text-lg font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm sm:text-base mb-4 sm:mb-0">
                Forgot your password?
              </Link>
              <button
                type="submit"
                className={`bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base ${
                  isLoading ? "cursor-wait" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Oval color="#fff" height={20} width={20} />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            {successMessage && (
              <div className="mt-4 text-green-600 text-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mt-4 text-red-600 text-center">
                {errorMessage}
              </div>
            )}
          </form>
          <div className="text-center mt-6">
            <Link to="/register" className="text-blue-600 hover:underline text-sm sm:text-base">
              Create a new account
            </Link>
          </div>
        </div>
      </div>
      <Footer variant="dark" />
    </>
  );
}

export default SignIn;
