import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    switch (role) {
      case 'student':
        navigate('/register/studentRegister');
        break;
      case 'company':
        navigate('/register/companyRegister');
        break;
      case 'placement-cell':
        navigate('/register/placementCellRegister');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center  h-screen bg-gray-100">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          What&apos;s your <span className="text-blue-500">Role</span>?
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl px-4">
          <div
            onClick={() => handleRoleSelection('student')}
            className="cursor-pointer bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:bg-blue-50 transform transition duration-300 hover:scale-105"
          >
            <img src="default-profile.png" alt="Student" className="mb-4 h-16 sm:h-20 mx-auto" />
            <p className="text-base sm:text-lg font-semibold">Student</p>
          </div>
          <div
            onClick={() => handleRoleSelection('company')}
            className="cursor-pointer bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:bg-blue-50 transform transition duration-300 hover:scale-105"
          >
            <img src="company-image.png" alt="Company" className="mb-4 h-16 sm:h-20 mx-auto" />
            <p className="text-base sm:text-lg font-semibold">Company</p>
          </div>
          <div
            onClick={() => handleRoleSelection('placement-cell')}
            className="cursor-pointer bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center hover:bg-blue-50 transform transition duration-300 hover:scale-105"
          >
            <img src="placement-cell-image.png" alt="Placement Cell" className="mb-4 h-16 sm:h-20 mx-auto" />
            <p className="text-base sm:text-lg font-semibold">Placement Cell</p>
          </div>
          
        </div>
       
      </div>
      
    </>
  );
};

export default RoleSelection;
