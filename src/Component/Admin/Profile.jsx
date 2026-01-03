import React, { useState } from 'react';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Keshav',
    email: 'admin@smartsales.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    joinDate: '2024-01-01',
    username: 'admin',
    password: 'admin123'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    localStorage.setItem('adminProfile', JSON.stringify(profileData));
    localStorage.setItem('adminCredentials', JSON.stringify({
      username: profileData.username,
      password: profileData.password
    }));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">👤</span> Admin Profile
            </h2>
            <p className="text-sm text-gray-600">Manage your account information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={profileData.password}
                  onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={profileData.role}
                disabled
                className="w-full p-3 border-2 border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
              <input
                type="date"
                value={profileData.joinDate}
                onChange={(e) => setProfileData({...profileData, joinDate: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl">
                  {profileData.name.charAt(0)}
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-sm text-gray-600">{profileData.role}</p>
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all"
            >
              💾 Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;