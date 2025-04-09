import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const [isHistoryExpanded, setIsHistoryExpanded] = React.useState(false);

    const baseLinkClasses = `flex items-center p-2 text-base font-normal rounded-lg w-full`;
    const getLinkClasses = (path) =>
        `${baseLinkClasses} 
        ${location.pathname === path ? 'border-b-2 border-blue-500' : ''} 
        text-white hover:bg-gray-700`;

    const isHistoryActive = location.pathname.includes('/dashboard/workout-history') || location.pathname.includes('/dashboard/goal-history');

    return (
        <div className='w-64 h-full fixed bg-gray-800 text-white'>
            <div className='p-4 font-bold text-lg'>Dashboard</div>
            <ul className='mt-4 space-y-2'>
                <li>
                    <Link to='/dashboard' className={getLinkClasses('/dashboard')}>

                        <span className='ml-3'>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/workouts' className={getLinkClasses('/dashboard/workouts')}>

                        <span className='ml-3'>Workouts</span>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/goals' className={getLinkClasses('/dashboard/goals')}>

                        <span className='ml-3'>Goals</span>
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard/progress' className={getLinkClasses('/dashboard/progress')}>

                        <span className='ml-3'>Progress</span>
                    </Link>
                </li>
                <li>
                    <button onClick={() => setIsHistoryExpanded(!isHistoryExpanded)} className={`${baseLinkClasses} ${isHistoryActive ? 'border-b-2 border-blue-500' : ''} text-white hover:bg-gray-700 text-left`}>
                        <svg className='w-6 h-6 text-gray-400 relative -top-1.5' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M10 20a1 1 0 01-.707-.293l-7-7a1 1 0 011.414-1.414L10 17.586l6.293-6.293a1 1 0 011.414 1.414l-7 7A1 1 0 0110 20z' />
                        </svg>
                        <span className='ml-3'>History</span>
                    </button>
                    {isHistoryExpanded && (
                        <ul className='pl-8 space-y-2'>
                            <li>
                                <Link to='/dashboard/workout-history' className={`${baseLinkClasses} text-white hover:bg-gray-700`}>
                                    <span className='ml-3'>Workout History</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/goal-history' className={`${baseLinkClasses} text-white hover:bg-gray-700`}>
                                    <span className='ml-3'>Goal History</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
