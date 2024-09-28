import PropTypes from 'prop-types';

const ResumeModal = ({ isOpen, onClose, resumeUrl }) => {
    if (!isOpen) return null; // Don't render if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-5 max-w-screen-md w-full h-auto max-h-screen overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Resume</h2>
                <iframe
                    src={resumeUrl}
                    title="Resume"
                    className="w-full h-96 border"
                    frameBorder="0"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

ResumeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    resumeUrl: PropTypes.string.isRequired,
};

export default ResumeModal;
