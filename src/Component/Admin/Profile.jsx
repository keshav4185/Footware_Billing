import React, { useState } from 'react';
import axios from "axios";
import { MdPerson, MdEdit, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Save } from 'lucide-react';

const Profile = ({ isDarkMode }) => {
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
    <div className={`p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : ''}`}>
      <div className={`rounded-xl shadow-lg p-4 md:p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <MdPerson size={24} className={isDarkMode ? 'text-[#B564C3]' : 'text-[#3D0448]'} /> Admin Profile
            </h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account information</p>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setOldAuth({ oldUser: '', oldPass: '' });
            }}
            className={`${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#3D0448] hover:bg-[#3D0448]/90'} text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 font-bold shadow-md active:scale-95 text-lg`}
          >
            {isEditing ? 'Cancel' : <><MdEdit size={24} /> Edit Profile</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* 1. OLD CREDENTIALS (UPPER SIDE) */}
            {isEditing && (
              <div className={`p-5 rounded-xl border-2 space-y-4 mb-6 transition-all ${
                isDarkMode 
                  ? 'bg-orange-900/10 border-orange-900/30 shadow-inner' 
                  : 'bg-orange-50 border-orange-100 shadow-sm'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-orange-500 animate-pulse' : 'bg-orange-500'}`} />
                  <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>Verify Current Identity</p>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Current Username"
                    value={oldAuth.oldUser}
                    onChange={(e) => setOldAuth({ ...oldAuth, oldUser: e.target.value })}
                    className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-900/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-50'
                    }`}
                  />
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={oldAuth.oldPass}
                    onChange={(e) => setOldAuth({ ...oldAuth, oldPass: e.target.value })}
                    className={`w-full p-3 text-sm border-2 rounded-xl outline-none transition-all ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white focus:border-orange-500 focus:ring-4 focus:ring-orange-900/20' 
                        : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-50'
                    }`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
                    className={`w-full p-3 border-2 rounded-lg transition-all outline-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-[#B564C3] disabled:bg-gray-800 disabled:text-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-[#3D0448] disabled:bg-gray-50'
                      }`}
              />
            </div>

            {/* 2. NEW CREDENTIALS (DOWN SIDE) */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {isEditing ? 'New Username' : 'Username'}
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                disabled={!isEditing}
                    className={`w-full p-3 border-2 rounded-lg transition-all outline-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-[#B564C3] disabled:bg-gray-800 disabled:text-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-[#3D0448] disabled:bg-gray-50'
                      }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {isEditing ? 'New Password' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={profileData.password}
                  onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full p-3 border-2 rounded-lg transition-all outline-none pr-10 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-[#B564C3] disabled:bg-gray-800 disabled:text-gray-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-[#3D0448] disabled:bg-gray-50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <MdVisibilityOff size={18} /> : <MdVisibility size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                    className={`w-full p-3 border-2 rounded-lg transition-all outline-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-[#B564C3] disabled:bg-gray-800 disabled:text-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-[#3D0448] disabled:bg-gray-50'
                      }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
              <input
                type="text"
                value={profileData.role}
                disabled
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Join Date</label>
              <input
                type="date"
                value={profileData.joinDate}
                onChange={(e) => setProfileData({ ...profileData, joinDate: e.target.value })}
                disabled={!isEditing}
                    className={`w-full p-3 border-2 rounded-lg transition-all outline-none ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-[#B564C3] disabled:bg-gray-800 disabled:text-gray-500' 
                          : 'bg-white border-gray-200 text-gray-900 focus:border-[#3D0448] disabled:bg-gray-50'
                      }`}
              />
            </div>
            <div className={`p-6 rounded-lg text-center transition-colors ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}>
              <div className="bg-gradient-to-br from-[#3D0448] to-[#B564C3] text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2 shadow-lg">
                {profileData.name.charAt(0)}
              </div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{profileData.name}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profileData.role}</p>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#3D0448] to-[#B564C3] text-white py-4 rounded-lg font-bold hover:opacity-90 flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 text-lg"
            >
              <Save size={24} /> Update Profile
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