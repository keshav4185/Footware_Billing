import React from 'react';
import { Download, Palette, Type, Image as ImageIcon, LayoutTemplate, Layers } from 'lucide-react';
import Logo from '../../assets/logo.jpg';

const BrandAssets = () => {
    const colors = [
        { name: 'Primary Indigo', hex: '#4F46E5', rgb: 'rgb(79, 70, 229)', class: 'bg-indigo-600' },
        { name: 'Deep Purple', hex: '#7E22CE', rgb: 'rgb(126, 34, 206)', class: 'bg-purple-700' },
        { name: 'Dark Slate', hex: '#111827', rgb: 'rgb(17, 24, 39)', class: 'bg-gray-900' },
        { name: 'Subtle Gray', hex: '#F9FAFB', rgb: 'rgb(249, 250, 251)', class: 'bg-gray-50 border border-gray-200' },
    ];

    const handleDownload = (e) => {
        e.preventDefault();
        // Create an invisible anchor to trigger the download
        const a = document.createElement('a');
        a.href = Logo;
        a.download = 'Smart_Group_Logo.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen bg-white font-inter">
            {/* Header Section */}
            <div className="bg-gray-50 pt-32 pb-20 px-6 border-b border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                        <Layers size={14} /> Official Resources
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        Smart Group <span className="text-indigo-600">Brand Assets</span>
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        Everything you need to represent the Smart Group brand correctly. Download our official logos, color palettes, and typography guidelines for your projects.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Navigation Sidebar (Desktop) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-2">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-4">Contents</h3>
                            <a href="#logo" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-colors">
                                <ImageIcon size={18} className="text-indigo-600" /> Logo & Usage
                            </a>
                            <a href="#colors" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-colors">
                                <Palette size={18} className="text-purple-600" /> Color Palette
                            </a>
                            <a href="#typography" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-bold transition-colors">
                                <Type size={18} className="text-blue-600" /> Typography
                            </a>
                        </div>
                    </div>

                    {/* Main Content Areas */}
                    <div className="lg:col-span-9 space-y-24">
                        
                        {/* Logo Section */}
                        <section id="logo" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <ImageIcon size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Our Logo</h2>
                            </div>
                            
                            <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100 flex flex-col items-center justify-center mb-8 relative group overflow-hidden">
                                <div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                                <div className="relative z-10 p-6 bg-white rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                                    <img src={Logo} alt="Smart Group Logo" className="w-32 h-32 object-contain" />
                                </div>
                                <div className="relative z-10 mt-8 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Primary Master Logo</h3>
                                    <p className="text-gray-500 text-sm max-w-sm">Use this logo on light backgrounds for maximum legibility and brand recognition.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button onClick={handleDownload} className="flex-1 bg-indigo-600 text-white px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center justify-center gap-3">
                                    <Download size={18} /> Download Logo (JPG)
                                </button>
                                <div className="flex-1 px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center gap-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                    <LayoutTemplate size={18} /> Do Not Alter Proportions
                                </div>
                            </div>
                        </section>

                        {/* Colors Section */}
                        <section id="colors" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                    <Palette size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Color Palette</h2>
                            </div>
                            <p className="text-gray-500 mb-8 font-medium">Our color palette is vibrant and modern. We rely on deep indigos and purples for our primary brand identity, supported by clean grays for UI elements.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {colors.map((color, index) => (
                                    <div key={index} className="group cursor-pointer">
                                        <div className={`h-40 rounded-t-2xl ${color.class} transition-transform duration-300 group-hover:-translate-y-2 relative shadow-lg`}>
                                            <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-5 border border-t-0 border-gray-100 rounded-b-2xl bg-white shadow-sm relative -mt-2 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                                            <h4 className="font-black text-gray-900 mb-3">{color.name}</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                                    <span>HEX</span>
                                                    <span className="text-gray-900 font-mono">{color.hex}</span>
                                                </div>
                                                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                                                    <span>RGB</span>
                                                    <span className="text-gray-900 font-mono">{color.rgb}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Typography Section */}
                        <section id="typography" className="scroll-mt-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Type size={24} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Typography</h2>
                            </div>
                            
                            <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 border border-gray-100">
                                <div className="mb-10">
                                    <h3 className="text-5xl font-black text-gray-900 mb-2 font-inter">Inter Font Family</h3>
                                    <p className="text-gray-500 font-medium">Primary Typeface — Used for all headings and body text to ensure maximum readability and a modern aesthetic.</p>
                                </div>
                                
                                <div className="space-y-8">
                                    <div className="pb-8 border-b border-gray-200">
                                        <div className="flex items-end gap-6 mb-2">
                                            <span className="text-4xl font-black text-gray-900">Aa</span>
                                            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Black (900)</span>
                                        </div>
                                        <p className="text-gray-900 font-black text-xl md:text-2xl tracking-tighter">The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                    <div className="pb-8 border-b border-gray-200">
                                        <div className="flex items-end gap-6 mb-2">
                                            <span className="text-4xl font-bold text-gray-900">Aa</span>
                                            <span className="text-sm font-bold text-purple-600 uppercase tracking-widest">Bold (700)</span>
                                        </div>
                                        <p className="text-gray-900 font-bold text-xl md:text-2xl tracking-tight">The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                    <div>
                                        <div className="flex items-end gap-6 mb-2">
                                            <span className="text-4xl font-medium text-gray-900">Aa</span>
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Medium (500)</span>
                                        </div>
                                        <p className="text-gray-600 font-medium text-xl md:text-2xl">The quick brown fox jumps over the lazy dog.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandAssets;
