import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: 'Smart Sales',
    companyAddress: '123 Business Street, City - 400001',
    companyPhone: '+91 9876543210',
    companyEmail: 'info@smartsales.com',
    companyGST: '27XXXXX1234X1ZX',
    invoicePrefix: 'INV',
    taxRate: 18,
    currency: 'INR',
    theme: 'light',
    notifications: true,
    autoBackup: true,
    emailReminders: false
  });

  const [activeTab, setActiveTab] = useState('company');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        companyName: 'Smart Sales',
        companyAddress: '123 Business Street, City - 400001',
        companyPhone: '+91 9876543210',
        companyEmail: 'info@smartsales.com',
        companyGST: '27XXXXX1234X1ZX',
        invoicePrefix: 'INV',
        taxRate: 18,
        currency: 'INR',
        theme: 'light',
        notifications: true,
        autoBackup: true,
        emailReminders: false
      };
      setSettings(defaultSettings);
      localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
      setShowSaveMessage(true);
      setTimeout(() => setShowSaveMessage(false), 3000);
    }
  };

  const exportData = () => {
    const bills = JSON.parse(localStorage.getItem('bills') || '[]');
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    
    const exportData = {
      bills,
      customers,
      products,
      settings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart-sales-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          
          if (window.confirm('This will replace all existing data. Are you sure?')) {
            if (importedData.bills) localStorage.setItem('bills', JSON.stringify(importedData.bills));
            if (importedData.customers) localStorage.setItem('customers', JSON.stringify(importedData.customers));
            if (importedData.products) localStorage.setItem('products', JSON.stringify(importedData.products));
            if (importedData.settings) {
              setSettings(importedData.settings);
              localStorage.setItem('adminSettings', JSON.stringify(importedData.settings));
            }
            
            alert('Data imported successfully! Please refresh the page.');
          }
        } catch (error) {
          alert('Invalid file format. Please select a valid backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('This will delete ALL data including bills, customers, and products. This action cannot be undone. Are you sure?')) {
      if (window.confirm('Last warning: This will permanently delete everything. Continue?')) {
        localStorage.removeItem('bills');
        localStorage.removeItem('customers');
        localStorage.removeItem('products');
        localStorage.removeItem('adminSettings');
        alert('All data has been cleared. Please refresh the page.');
      }
    }
  };

  const tabs = [
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'billing', label: 'Billing Settings', icon: '📄' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'data', label: 'Data Management', icon: '💾' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-gray-600">Manage your application settings and preferences</p>
        </div>
        
        {showSaveMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg">
            ✅ Settings saved successfully!
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap gap-2 sm:gap-0 sm:space-x-8 px-3 sm:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 sm:py-4 px-2 sm:px-2 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          {/* Company Info Tab */}
          {activeTab === 'company' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Company Information</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={settings.companyPhone}
                    onChange={(e) => setSettings({...settings, companyPhone: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) => setSettings({...settings, companyEmail: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                  <input
                    type="text"
                    value={settings.companyGST}
                    onChange={(e) => setSettings({...settings, companyGST: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
                <textarea
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({...settings, companyAddress: e.target.value})}
                  className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="3"
                />
              </div>
            </div>
          )}

          {/* Billing Settings Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Billing Configuration</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Prefix</label>
                  <input
                    type="text"
                    value={settings.invoicePrefix}
                    onChange={(e) => setSettings({...settings, invoicePrefix: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Example: INV-001, BILL-001</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Tax Rate (%)</label>
                  <input
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({...settings, taxRate: parseFloat(e.target.value)})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.currency}
                    onChange={(e) => setSettings({...settings, currency: e.target.value})}
                    className="w-full p-2 sm:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Application Preferences</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">Notifications</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Receive notifications for new invoices and payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">Auto Backup</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Automatically backup data to browser storage</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base">Email Reminders</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Send email reminders for overdue payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailReminders}
                      onChange={(e) => setSettings({...settings, emailReminders: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Data Management Tab */}
          {activeTab === 'data' && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-800">Data Management</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2 text-sm sm:text-base">📤 Export Data</h4>
                  <p className="text-xs sm:text-sm text-blue-600 mb-4">Download all your data as a backup file</p>
                  <button
                    onClick={exportData}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Export Backup
                  </button>
                </div>
                
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2 text-sm sm:text-base">📥 Import Data</h4>
                  <p className="text-xs sm:text-sm text-green-600 mb-4">Restore data from a backup file</p>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                    id="import-file"
                  />
                  <label
                    htmlFor="import-file"
                    className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer inline-block text-sm"
                  >
                    Import Backup
                  </label>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 sm:p-6 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-800 mb-2 text-sm sm:text-base">🗑️ Danger Zone</h4>
                <p className="text-xs sm:text-sm text-red-600 mb-4">Permanently delete all data. This action cannot be undone.</p>
                <button
                  onClick={clearAllData}
                  className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Save/Reset Buttons */}
        <div className="bg-gray-50 px-3 sm:px-6 py-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;