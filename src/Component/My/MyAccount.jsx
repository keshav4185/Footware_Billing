import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DocumentPlusIcon, 
  TableCellsIcon, 
  UserCircleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const StaffAccount = () => {
  const navigate = useNavigate();
  const [todaySales, setTodaySales] = useState(0);

  useEffect(() => {
   
    const savedData = JSON.parse(localStorage.getItem('quotations') || '[]');
    const today = new Date().toLocaleDateString();
    const total = savedData
      .filter(inv => new Date(inv.date).toLocaleDateString() === today)
      .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
    setTodaySales(total);
  }, []);

  const staffActions = [
    { 
      title: 'Create New Bill', 
      desc: 'Start a new quotation or tax invoice', 
      Icon: DocumentPlusIcon,
      path: '/new-quotation',
      color: 'bg-indigo-600'
    },
    { 
      title: 'My Recent Sales', 
      desc: 'Check your previous bills of the day', 
      Icon: TableCellsIcon,
      path: '/sdashboardpage',
      color: 'bg-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans">
      {/* Header for Staff */}
    

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Welcome, Keshav</h1>
          <p className="text-slate-500 text-sm">Have a great day at the billing desk!</p>
        </div>

        {/* Today's Sales Counter - Staff */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-8 rounded-3xl text-white shadow-lg mb-10">
          <p className="text-indigo-100 text-sm font-bold uppercase tracking-wider">Your Sales Today</p>
          <h2 className="text-4xl font-black mt-2">₹{todaySales.toLocaleString('en-IN')}</h2>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {staffActions.map((action, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(action.path)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all cursor-pointer flex items-center gap-6"
            >
              <div className={`${action.color} p-4 rounded-2xl text-white shadow-lg shadow-indigo-100`}>
                <action.Icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{action.title}</h3>
                <p className="text-sm text-slate-500">{action.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profile Summary Footer */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-dashed border-slate-300 flex flex-wrap gap-8 items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">K</div>
              <div>
                <p className="text-sm font-bold text-slate-800">Keshav Golande</p>
                <p className="text-xs text-slate-400">Store Executive</p>
              </div>
           </div>
           <div className="flex gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1"><PhoneIcon className="w-4 h-4"/> +91 77768 81055</span>
              <span className="flex items-center gap-1"><EnvelopeIcon className="w-4 h-4"/> keshav@gmail.com</span>
           </div>
        </div>
      </main>
    </div>
  );
};

export default StaffAccount;