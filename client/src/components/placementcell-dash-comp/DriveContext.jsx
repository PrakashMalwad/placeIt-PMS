import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DriveContext = createContext();
export const DriveProvider = ({ children }) => {
  DriveProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [selectedDrive, setSelectedDrive] = useState(null);

  return (
    <DriveContext.Provider value={{ selectedDrive, setSelectedDrive }}>
      {children}
    </DriveContext.Provider>
  );
};
