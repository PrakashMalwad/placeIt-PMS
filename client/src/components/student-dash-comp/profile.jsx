  import Navbar from "../navbar";
  const StudentProfile = () => {
    return <>
      <Navbar role='student'/>
      <aside className="bg-white fixed top-0 left-0 shadow-md rounded-lg p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <img
            src="default-profile.png"
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover mb-4"
          />

          {/* Student Name */}
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>

          {/* Contact Info */}
          <p className="text-gray-600">johndoe@example.com</p>
          <p className="text-gray-600">+123456789</p>

          {/* Basic Details */}
          <div className="mt-4 w-full text-left">
            <h3 className="font-semibold text-lg text-gray-700">Profile Information</h3>
            <div className="mt-2 space-y-2">
              <div>
                <span className="font-medium text-gray-600">University:</span> XYZ University
              </div>
              <div>
                <span className="font-medium text-gray-600">Course:</span> BSc in Computer Science
              </div>
              <div>
                <span className="font-medium text-gray-600">Year:</span> 3rd Year
              </div>
              <div>
                <span className="font-medium text-gray-600">CGPA:</span> 8.5
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6 w-full text-left">
            <h3 className="font-semibold text-lg text-gray-700">Skills</h3>
            <div className="mt-2">
              <span className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">React</span>
              <span className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">Node.js</span>
              <span className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">Python</span>
            </div>
          </div>
        </div>
      </aside>
      </>
    
  };

  export default StudentProfile;
