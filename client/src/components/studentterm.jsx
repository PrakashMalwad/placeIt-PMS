
import PropTypes from 'prop-types';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
          <p className="text-gray-700 mb-4">
            {/* Add your terms and conditions content here */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis id turpis eu velit euismod vulputate. Nulla facilisi. Phasellus eu urna id orci pharetra pretium. 
            {/* Continue adding more content as needed */}
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

TermsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TermsModal;
