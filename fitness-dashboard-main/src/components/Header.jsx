import React from 'react';

function Header({ displayName, logout, toggleTheme, theme }) {
    return (
        <div className='flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md w-full max-w-5xl mx-auto'>
            <h1 className='text-2xl font-bold text-gray-800 ml-4 mr-6'>
                Welcome, {displayName}
            </h1>
            <div className='flex space-x-2 mr-4'>
                <button
                    onClick={logout}
                    className='bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300'
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header; 