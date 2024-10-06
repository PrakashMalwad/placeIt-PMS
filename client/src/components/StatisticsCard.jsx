
import PropTypes from 'prop-types';
const StatisticsCard = ({ icon, title, count, bgColor }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg text-white ${bgColor}`}>
      <div className="flex items-center">
        <div className="text-4xl mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-2xl">{count}</p>
        </div>
      </div>
    </div>
  );
};

StatisticsCard.propTypes = {

  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default StatisticsCard;

