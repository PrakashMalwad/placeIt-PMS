const getNotifications = (req, res) => {
    res.status(200).json({
      notification: "Welcome to the Student Analytics page! Stay tuned for upcoming updates and insights.",
      timestamp: new Date().toISOString()
    });
  };
  
  const markRead = (req, res) => {
    res.status(200).json({ message: 'Notifications marked as read' });
  };
  
  module.exports = { getNotifications, markRead };
  