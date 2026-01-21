import React, { useState } from 'react';
import axios from "axios";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'Keshav',
    email: 'admin@smartsales.com',
    phone: '+91 98765 43210',
    role: 'Administrator',
    joinDate: '2024-01-01',
    username: '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // State for manual entry of old credentials
  const [oldAuth, setOldAuth] = useState({ oldUser: '', oldPass: '' });

const handleSave = async () => {
  if (!oldAuth.oldUser || !oldAuth.oldPass) {
    alert("Please enter old username and password");
    return;
  }

  try {
    const response = await axios.put(
      "https://backend-billing-software-ahxt.onrender.com/api/admin/update",
      {
        oldUsername: oldAuth.oldUser,
        oldPassword: oldAuth.oldPass,

        newUsername: profileData.username,
        newPassword: profileData.password,

        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        joinDate: profileData.joinDate,
      }
    );

    alert(response.data); // "Admin credentials updated successfully"

    setIsEditing(false);
    setOldAuth({ oldUser: "", oldPass: "" });

  } catch (error) {
    console.error(error);
    alert(
      error.response?.data || "Old username or password is incorrect"
    );
  }
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
            onClick={() => {
              setIsEditing(!isEditing);
              setOldAuth({ oldUser: '', oldPass: '' });
            }}
            className={`${isEditing ? 'bg-gray-500' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg transition-colors`}
          >
            {isEditing ? 'Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* 1. OLD CREDENTIALS (UPPER SIDE) */}
            {isEditing && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 space-y-3">
                <p className="text-xs font-bold text-orange-700 uppercase">Verify Current Identity</p>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Old Username"
                    value={oldAuth.oldUser}
                    onChange={(e) => setOldAuth({...oldAuth, oldUser: e.target.value})}
                    className="w-full p-2 text-sm border-2 border-orange-200 rounded focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Enter Old Password"
                    value={oldAuth.oldPass}
                    onChange={(e) => setOldAuth({...oldAuth, oldPass: e.target.value})}
                    className="w-full p-2 text-sm border-2 border-orange-200 rounded focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            )}

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
            
            {/* 2. NEW CREDENTIALS (DOWN SIDE) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isEditing ? 'New Username' : 'Username'}
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isEditing ? 'New Password' : 'Password'}
              </label>
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
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
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg text-center">
                <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2">
                  {profileData.name.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-800">{profileData.name}</h3>
                <p className="text-sm text-gray-600">{profileData.role}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
            >
              💾 Update Profile
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600"
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