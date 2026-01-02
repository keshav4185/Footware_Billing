
// Mock data to structure the course cards as seen in the image
// src/Pages/Community/tutorial.jsx (Updated Snippet)

import React from 'react';

// 🛑 FIX: Using more generic placeholder URLs for better compatibility.
const courseData = [
    { 
        title: "Getting Started", 
        duration: "5h 37m", 
        steps: "28 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/101/300/160" // Generic image 1
    },
    { 
        title: "CRM", 
        duration: "2h 21m", 
        steps: "19 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/102/300/160" // Generic image 2
    },
    { 
        title: "Sales", 
        duration: "3h 23m", 
        steps: "24 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/103/300/160" // Generic image 3
    },
    { 
        title: "Purchase", 
        duration: "1h 17m", 
        steps: "10 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/104/300/160" // Generic image 4
    },
    { 
        title: "Accounting and Invoicing", 
        duration: "9h 56m", 
        steps: "40 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/105/300/160" // Generic image 5
    },
    { 
        title: "Website", 
        duration: "1h 10m", 
        steps: "12 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/106/300/160" // Generic image 6
    },
    { 
        title: "eCommerce", 
        duration: "57m", 
        steps: "10 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/107/300/160" // Generic image 7
    },
    { 
        title: "Point of Sale", 
        duration: "2h 18m", 
        steps: "23 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/108/300/160" // Generic image 8
    },
    { 
        title: "Inventory", 
        duration: "4h 18m", 
        steps: "34 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/109/300/160" // Generic image 9
    },
    { 
        title: "MRP - Manufacturing & Shop Floor", 
        duration: "5h 56m", 
        steps: "42 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/110/300/160" // Generic image 10
    },
    { 
        title: "Project & Timesheets", 
        duration: "4h 45m", 
        steps: "18 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/111/300/160" // Generic image 11
    },
    { 
        title: "Subscription", 
        duration: "1h 24m", 
        steps: "11 steps", 
        category: "Odoo Tutorials", 
        imageUrl: "https://picsum.photos/id/112/300/160" // Generic image 12
    },
];

// ... (Rest of the component code remains the same) ...


// Helper component for a single course card
const CourseCard = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
            <div className="h-40 overflow-hidden bg-gray-200">
                <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: `url(${course.imageUrl})` }}
                    aria-label={`Image for ${course.title} course`}
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={course.title}>
                    {course.title}
                </h3>
                <span className="inline-block text-xs font-medium text-purple-main bg-purple-100 px-2 py-0.5 rounded-full mb-3" style={{ color: '#80628B', backgroundColor: '#F0E6F3' }}>
                    {course.category}
                </span>
                <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <p><span className="font-semibold text-gray-700">{course.duration}</span></p>
                    <p><span className="font-semibold text-gray-700">{course.steps}</span></p>
                </div>
            </div>
        </div>
    );
};


// 🛑 FIX: Component name changed to 'Tutorial' (PascalCase)
const Tutorialscom = () => { 
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <h1 className="text-3xl font-bold text-gray-800 mb-8">All Courses</h1>

                <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow mb-8 border border-gray-100">
                    
                    <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                        <button className="flex items-center text-sm font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                            Odoo Tutorials 
                            <span className="ml-2 text-xs">x</span> 
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center space-x-3 mb-4 sm:mb-0">
                        <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center">
                            🏆 Certifications
                        </button>
                        <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center">
                            📚 Courses ▼
                        </button>
                        <button className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center">
                            🏅 Certification ▼
                        </button>
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <input
                            type="search"
                            placeholder="Search courses"
                            className="w-full sm:w-64 px-4 py-1.5 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                        />
                        <button className="absolute right-0 top-0 mt-1 mr-2 text-gray-400">
                            🔍
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {courseData.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tutorialscom; // 🛑 FIX: Exporting the capitalized name