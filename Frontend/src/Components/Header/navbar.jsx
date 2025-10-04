import { useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Define SVG icons as reusable components for cleaner code
const MenuIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const PlusIcon = () => (
    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const BellIcon = () => (
    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

const ChevronDownIcon = () => (
     <svg className="w-4 h-4 text-gray-600 hidden md:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);


/**
 * A responsive top navigation bar component.
 * @param {object} props - The component props.
 * @param {Function} props.onMenuClick - Function to call when the mobile menu toggle is clicked.
 */
export default function Navbar({ onMenuClick }) {
    // State to manage the visibility of the profile dropdown menu
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    
    // Ref to detect clicks outside the profile menu to close it
    const profileMenuRef = useRef(null);

    // Effect to add an event listener for closing the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <header className="bg-white/80 backdrop-blur-sm shadow-sm p-4 flex items-center justify-between w-full sticky top-0 z-30">
            {/* Mobile Menu Toggle */}
            <button onClick={onMenuClick} className="lg:hidden text-gray-600">
                <MenuIcon />
            </button>

            {/* Global Search Bar */}
            <div className="relative hidden sm:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <SearchIcon />
                </span>
                <input 
                    type="text" 
                    placeholder="Search for reports, users, data..."
                    className="w-full md:w-96 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>

            {/* Right-side actions */}
            <div className="flex items-center space-x-4">
                <button className="hidden md:flex items-center bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition duration-300">
                    <PlusIcon />
                    New Log
                </button>

                {/* Notifications Button */}
                <div className="relative">
                    <button className="text-gray-600 hover:text-gray-800">
                        <BellIcon />
                    </button>
                    {/* Notification indicator dot */}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>

                {/* Profile Menu */}
                <div className="relative" ref={profileMenuRef}>
                    <button 
                        onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} 
                        className="flex items-center space-x-2"
                    >
                        <img 
                            src="https://placehold.co/40x40/E2E8F0/4A5568?text=A" 
                            alt="Admin Avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="hidden md:block font-medium">Admin User</span>
                        <ChevronDownIcon />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {isProfileMenuOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <div className="border-t border-gray-200 my-1"></div>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}