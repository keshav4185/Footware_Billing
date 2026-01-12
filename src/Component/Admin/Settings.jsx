import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyGST: '',
    companyLogo: '' // URL or base64 of the logo
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  // Fetch company details from backend
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/company'); // Replace with your API endpoint
        if (response.data) setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, []);

  // Handle logo file selection
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyDetails({ ...companyDetails, companyLogo: reader.result });
      };
      reader.readAsDataURL(file); // Convert to base64 for preview
    }
  };

  // Save updated company details
  const handleSave = async () => {
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('companyName', companyDetails.companyName);
      formData.append('companyAddress', companyDetails.companyAddress);
      formData.append('companyPhone', companyDetails.companyPhone);
      formData.append('companyEmail', companyDetails.companyEmail);
      formData.append('companyGST', companyDetails.companyGST);
      if (logoFile) formData.append('companyLogo', logoFile);

      await axios.put('/api/company', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('✅ Company details saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving company details:', error);
      setMessage('❌ Failed to save company details.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading company details...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Company Settings</h2>
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        {/* Company Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden flex items-center justify-center">
            {companyDetails.companyLogo ? (
              <img
                src={companyDetails.companyLogo}
                alt="Company Logo"
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="text-gray-400">Logo</span>
            )}
          </div>
          <div>
            <label
              htmlFor="logo-upload"
              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 cursor-pointer text-sm"
            >
              Upload Logo
            </label>
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-1">PNG/JPG, max 2MB</p>
          </div>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyDetails.companyName}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, companyName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={companyDetails.companyPhone}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, companyPhone: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={companyDetails.companyEmail}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, companyEmail: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
            <input
              type="text"
              value={companyDetails.companyGST}
              onChange={(e) =>
                setCompanyDetails({ ...companyDetails, companyGST: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
          <textarea
            value={companyDetails.companyAddress}
            onChange={(e) =>
              setCompanyDetails({ ...companyDetails, companyAddress: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows="3"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
          >
            {saving ? 'Saving...' : 'Save Company Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
