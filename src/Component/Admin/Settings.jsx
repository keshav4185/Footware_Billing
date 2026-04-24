import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Save } from 'lucide-react';
import { MdEdit, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Settings = ({ isDarkMode }) => {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('adminProfile');
    return saved ? JSON.parse(saved) : {
      name: localStorage.getItem('adminName') || 'Admin',
      email: 'admin@smartsales.com',
      phone: '+91 98765 43210',
      role: 'Administrator',
      joinDate: '2024-01-01',
      username: '',
      password: ''
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [oldAuth, setOldAuth] = useState({ oldUser: '', oldPass: '' });

  // Fetch profile data from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/admin/profile");
        if (response.data) {
          setProfileData(prev => {
            const mergedData = {
              ...prev,
              name: response.data.name || prev.name,
              email: response.data.email || prev.email,
              phone: response.data.phone || prev.phone,
              joinDate: response.data.joinDate || prev.joinDate,
              username: response.data.username || prev.username
            };
            localStorage.setItem('adminProfile', JSON.stringify(mergedData));
            localStorage.setItem('adminName', mergedData.name);
            window.dispatchEvent(new Event('adminProfileUpdate'));
            return mergedData;
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSave = async () => {
    if (!oldAuth.oldUser || !oldAuth.oldPass) {
      alert("Please enter old username and password");
      return;
    }

    try {
      let backendSuccess = false;
      try {
        const response = await api.put(
          "/admin/update",
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
        backendSuccess = true;
      } catch (backendError) {
        console.warn("Backend update failed, saving to local storage only:", backendError);
      }

      alert(backendSuccess ? "Profile updated successfully!" : "Profile saved locally (Backend sync failed)");
      
      // Sync LocalStorage and notify components
      localStorage.setItem('adminName', profileData.name);
      localStorage.setItem('adminProfile', JSON.stringify(profileData));
      window.dispatchEvent(new Event('adminProfileUpdate'));
      
      setIsEditing(false);
      setOldAuth({ oldUser: "", oldPass: "" });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred while saving the profile.");
    }
  };

  return (
    <div className={`space-y-6 transition-colors duration-300 ${isDarkMode ? 'text-white' : ''}`}>
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Profile Settings</h2>
      </div>

      <div className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Admin Profile</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account information</p>
          </div>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setOldAuth({ oldUser: '', oldPass: '' });
            }}
            className={`${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 font-bold shadow-md active:scale-95 text-lg`}
          >
            {isEditing ? 'Cancel' : <><MdEdit size={24} /> Edit Profile</>}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 text-left">
            {isEditing && (
              <div className={`p-4 rounded-lg border space-y-3 transition-colors ${
                isDarkMode ? 'bg-orange-900/10 border-orange-900/30' : 'bg-orange-50 border-orange-200'
              }`}>
                <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-orange-400' : 'text-orange-700'}`}>Verify Current Identity</p>
                <input
                  type="text"
                  placeholder="Enter Old Username"
                  value={oldAuth.oldUser}
                  onChange={(e) => setOldAuth({ ...oldAuth, oldUser: e.target.value })}
                  className={`w-full p-2 text-sm border-2 rounded outline-none transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500'
                  }`}
                />
                <input
                  type="password"
                  placeholder="Enter Old Password"
                  value={oldAuth.oldPass}
                  onChange={(e) => setOldAuth({ ...oldAuth, oldPass: e.target.value })}
                  className={`w-full p-2 text-sm border-2 rounded outline-none transition-all ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-orange-500' : 'bg-white border-orange-200 text-gray-900 focus:border-orange-500'
                  }`}
                />
              </div>
            )}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {isEditing ? 'New Username' : 'Username'}
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
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
                  className={`w-full p-3 border-2 rounded-lg transition-all pr-10 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-left">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                disabled={!isEditing}
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
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
                className={`w-full p-3 border-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 disabled:bg-gray-800 disabled:text-gray-500' 
                    : 'bg-white border-gray-200 text-gray-900 focus:border-blue-500 disabled:bg-gray-50'
                }`}
              />
            </div>
            <div className={`p-6 rounded-lg text-center transition-colors ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'
            }`}>
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2 shadow-lg">
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
              onClick={handleProfileSave}
              className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 text-lg"
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

export default Settings;