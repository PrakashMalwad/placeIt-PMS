
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <FaExclamationTriangle className="text-red-600 text-6xl mb-4" aria-hidden="true" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Something Went Wrong</h1>
      <p className="text-lg text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or an error has occurred.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
