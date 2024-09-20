import  { useState } from 'react';

const SettingsPage = () => {
    const user = localStorage.getItem('user')
  const [settings, setSettings] = useState({
    username: user.name,
    email: 'johndoe@example.com',
    notifications: true,
    privacy: 'public',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Settings updated:', settings);
  };

  return (
   
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={settings.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Enable Notifications</span>
            </label>
          </div>

          <div className="mb-6">
            <label htmlFor="privacy" className="block text-gray-700 text-sm font-semibold mb-2">Privacy Setting</label>
            <select
              id="privacy"
              name="privacy"
              value={settings.privacy}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="restricted">Restricted</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    
  );
};

export default SettingsPage;
