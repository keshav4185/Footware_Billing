import BillManagementMockup from '../Solutions/BillManagementMockup';

function Documentation() {
    return (
        <div className="min-h-screen bg-gray-50/30">
            {/* Header mimicking Homesection6 title structure */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#3D0448]/10 text-[#3D0448] text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
                        <FileText size={12} />
                        <span>Resource Center</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        Bill Management <br/><span className="text-[#3D0448]">Dashboard</span>
                    </h2>

                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-16 leading-relaxed">
                        Track all your invoices, manage payments, and monitor billing history in one place with our intuitive interface.
                    </p>

                    <BillManagementMockup />

                    {/* Documentation Footer CTA */}
                    <div className="mt-24 max-w-2xl mx-auto p-12 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-100/50">
                        <h3 className="text-2xl font-black text-gray-900 mb-4">Master Every Feature</h3>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Need more help exploring the dashboard? Our interactive tutorials cover everything from GST compliance to payment tracking.
                        </p>
                        <Link to="/tutorial" className="inline-flex items-center gap-2 bg-[#3D0448] text-white px-8 py-4 rounded-2xl font-black text-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#3D0448]/20">
                            Watch Tutorials <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Documentation;