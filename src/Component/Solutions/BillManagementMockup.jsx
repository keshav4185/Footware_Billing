import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Eye, 
  Printer, 
  Trash2, 
  Loader2,
  Calendar,
  IndianRupee,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BillManagementMockup = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [bills, setBills] = useState([
        { id: "1001", customerName: "Keshav Pralhad Golande", date: new Date().toISOString(), grandTotal: 177.00, paymentStatus: "paid" },
        { id: "1002", customerName: "Amit Kumar Jha", date: new Date().toISOString(), grandTotal: 112.10, paymentStatus: "paid" },
        { id: "1003", customerName: "Priya Sharma", date: new Date().toISOString(), grandTotal: 2450.00, paymentStatus: "pending" },
        { id: "1004", customerName: "Rahul Verma", date: new Date(Date.now() - 86400000).toISOString(), grandTotal: 850.50, paymentStatus: "paid" },
        { id: "1005", customerName: "Sneha Patel", date: new Date(Date.now() - 172800000).toISOString(), grandTotal: 3200.00, paymentStatus: "pending" },
        { id: "1006", customerName: "Vikram Singh", date: new Date(Date.now() - 259200000).toISOString(), grandTotal: 450.00, paymentStatus: "paid" }
    ]);

    const filteredBills = bills.filter(bill => 
        bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        String(bill.id).includes(searchTerm)
    );

    return (
        <div className="w-full max-w-6xl p-6 md:p-10 bg-white rounded-[3rem] shadow-2xl border border-gray-100 mx-auto relative overflow-hidden text-left">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-40 -mt-40"></div>

            {/* Header - Dash Style */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 relative z-10">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 text-white">
                        <FileText size={32} />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Recent Invoices</h3>
                            {loading && <Loader2 size={24} className="animate-spin text-indigo-600"/>}
                        </div>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-1">Live from your Dashboard</p>
                    </div>
                </div>

                <div className="relative w-full lg:w-96 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input 
                        type="text"
                        placeholder="Search invoices or customers..."
                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-900 outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-inner"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content - Dashboard List Style */}
            <div className="space-y-4 relative z-10">
                {filteredBills.length > 0 ? (
                    filteredBills.map((bill, idx) => (
                        <div 
                            key={idx} 
                            className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl transition-all duration-300 group hover:border-indigo-200"
                        >
                            <div className="flex items-center gap-5 mb-4 sm:mb-0 w-full sm:w-auto">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    #{bill.id}
                                </div>
                                <div className="text-left">
                                    <p className="font-black text-gray-900 text-lg leading-none mb-1 group-hover:text-indigo-600 transition-colors">{bill.customerName}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-widest">
                                        <Calendar size={12}/> {new Date(bill.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-2xl font-black text-gray-900 justify-end">
                                        <IndianRupee size={18} className="text-gray-400"/>
                                        {bill.grandTotal.toLocaleString()}
                                    </div>
                                    <span className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 border ${
                                        bill.paymentStatus === 'paid' 
                                        ? 'bg-green-50 text-green-600 border-green-100' 
                                        : 'bg-red-50 text-red-600 border-red-100'
                                    }`}>
                                        {bill.paymentStatus}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <Link to="/Signin" className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-sm">
                                        <Eye size={20} />
                                    </Link>
                                    <Link to="/Signin" className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-sm">
                                        <Printer size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-24 text-center">
                        <Loader2 className="animate-spin text-gray-100 mx-auto mb-4" size={64}/>
                        <p className="text-gray-400 font-black uppercase tracking-[0.2em]">Searching for active data...</p>
                    </div>
                )}
                
                <div className="pt-8 text-center">
                    <Link 
                        to="/Signin" 
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl group"
                    >
                        Access Full Dashboard <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BillManagementMockup;
