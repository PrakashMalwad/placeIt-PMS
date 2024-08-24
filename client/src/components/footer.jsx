import PropTypes from 'prop-types';

function Footer({ variant }) {
  const footerClasses = variant === 'dark'
    ? 'bg-black text-white text-center p-4'
    : 'bg-blue-50 text-blue-950 text-center p-4';

  return (
    <footer className={footerClasses}>
      <p>Copyright © 2024 <span className="text-blue-600">MLD Studios</span>. All rights reserved.</p>
    </footer>
  );
}

// Define PropTypes for the component
Footer.propTypes = {
  variant: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default Footer;
