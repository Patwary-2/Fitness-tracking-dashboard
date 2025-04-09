import React from 'react';
import { Link } from 'react-router-dom';

function WorkoutHistorySection({ entries }) {
    return (
        <>
            {/* Workout History */}
            <div className='flex items-center justify-between mt-6'>
                <h2 className='text-lg font-semibold mb-3'>Workout History</h2>
            </div>
            <div className='flex items-start mt-6'>
                <div className='flex gap-4 flex-wrap'>
                    {entries.slice(0, 3).map((entry) => (
                        <div key={entry.id} className='bg-white border border-gray-200 rounded-lg shadow-md w-72'>
                            <div className='p-5'>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{entry.exercise}</h5>
                                <p className='mb-3 font-normal text-gray-700'>
                                    {entry.reps} reps, {entry.duration} mins, {entry.intensity} intensity, {entry.calories} cal
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {new Date(entry.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {entries.length > 3 && (
                    <Link to='/dashboard/history' className='text-blue-500 hover:underline inline-flex items-center ml-4'>
                        <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' />
                        </svg>
                    </Link>
                )}
            </div>
        </>
    );
}

export default WorkoutHistorySection;
