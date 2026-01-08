
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Featurespage from './Pages/Home/Features/Featurespage';
import Account from './Pages/Home/Account/Account';
import Resetpassword from './Pages/Home/Account/Resetpassword';
import Signup from './Pages/Home/Account/Signup';

import Tutorial from './Pages/Community/tutorial';
import DocumentationPage from './Pages/Community/documentationpage';
import Welcomepage from './Pages/Home/TryPage/welcomepage';

import Myaccountpage from './Pages/Mypage/myaccountpage';
import Dashboard from './Pages/Dashboard/Dashboard';
import AdminPage from './Pages/Admin/AdminPage';
import AdminDashboardPage from './Pages/Admin/AdminDashboardPage';
import './Pages/Dashboard/Dashboard.css'; 

// Layout component with navbar and footer
const LayoutWithNavbar = ({ children }) => (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
    {/* Global Background Effects */}
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-200/20 to-indigo-200/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-200/15 to-yellow-200/15 rounded-full blur-xl animate-bounce-slow"></div>
    </div>
    
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1">
        {children}
      </main>
      <Footer/>
    </div>
  </div>
);

function App() {
  return (
    <div className="app-container relative">
      {/* Global cursor trail effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="cursor-trail"></div>
      </div>
      
      <BrowserRouter>
      <Routes>
        {/* Routes with navbar and footer */}
        <Route path="/" element={<LayoutWithNavbar><HomePage /></LayoutWithNavbar>} />
        <Route path="/Featurespage" element={<LayoutWithNavbar><Featurespage /></LayoutWithNavbar>} />
        <Route path="/Account" element={<LayoutWithNavbar><Account /></LayoutWithNavbar>} />
        <Route path="/Signin" element={<LayoutWithNavbar><Account /></LayoutWithNavbar>} />
        <Route path="/Resetpassword" element={<LayoutWithNavbar><Resetpassword /></LayoutWithNavbar>} />
        <Route path="/Signup" element={<LayoutWithNavbar><Signup /></LayoutWithNavbar>} />

        <Route path="/tutorial" element={<LayoutWithNavbar><Tutorial /></LayoutWithNavbar>} />
        <Route path="/documentation" element={<LayoutWithNavbar><DocumentationPage /></LayoutWithNavbar>} />
        <Route path="/welcome" element={<Welcomepage />} />

        <Route path="/myaccountpage" element={<LayoutWithNavbar><Myaccountpage /></LayoutWithNavbar>} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin" element={<AdminPage />} />
         <Route path="/admin/dashboard" element={<AdminDashboardPage />} /> 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
