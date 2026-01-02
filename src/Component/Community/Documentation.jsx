// src/Pages/DocumentationPage.jsx
import React from 'react';

// Data structure for the documentation sections
const docSections = [
    {
        title: "User Guides",
        description: "User guides and tutorials for each app.",
        icon: "👤", // Placeholder for Blue User Icon
        color: 'text-blue-500' 
    },
    {
        title: "White Papers",
        description: "Compare Odoo with leading competitors.",
        icon: "📄", // Placeholder for Teal Document Icon
        color: 'text-teal-500'
    },
    {
        title: "Developer Guide",
        description: "Tutorials and reference guides.",
        icon: "💻", // Placeholder for Yellow/Orange Code Icon
        color: 'text-yellow-600'
    },
    {
        title: "Installation",
        description: "How to install, maintain and upgrade Odoo databases.",
        icon: "🛠️", // Placeholder for Red Wrench Icon
        color: 'text-red-500'
    },
    {
        title: "Training Center",
        description: "Learning videos, exercises and Quizz.",
        icon: "⏱️", // Placeholder for Pink Clock Icon
        color: 'text-pink-500'
    },
    {
        title: "Certifications",
        description: "Officialize your knowledge and expertise.",
        icon: "🏆", // Placeholder for Gold Trophy Icon
        color: 'text-yellow-700'
    },
    {
        title: "Legal",
        description: "About Odoo licensing and contracts.",
        icon: "💼", // Placeholder for Orange Briefcase Icon
        color: 'text-orange-600'
    },
];

// Helper component for a single documentation card
const DocCard = ({ section }) => {
    return (
        // Card container matching the image style: white background, rounded, shadow
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition duration-300 hover:shadow-xl cursor-pointer h-full">
            
            {/* Icon Section */}
            <div className={`text-4xl mb-4 ${section.color}`}>
                {section.icon}
            </div>

            {/* Title */}
            <h2 className="text-xl font-serif italic text-gray-900 mb-1">
                {section.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">
                {section.description}
            </p>
        </div>
    );
};

function Documentation() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Optional: Page Header/Title */}
                <header className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Odoo Documentation</h1>
                </header>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {docSections.map((section, index) => (
                        <DocCard key={index} section={section} />
                    ))}
                </div>
                
                {/* Blank spot for the 7th item in the 3-column grid layout (if present) */}
                <div className="mt-6">
                    {docSections.length % 3 === 1 && <div className="hidden lg:block"></div>}
                    {docSections.length % 3 === 2 && <div className="hidden lg:block"></div>}
                </div>
            </div>
        </div>
    );
}

export default Documentation;