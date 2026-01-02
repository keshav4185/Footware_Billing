
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
  <>
    <Navbar/>
    {children}
    <Footer/>
  </>
);

function App() {
  return (
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
  );
}

export default App;
