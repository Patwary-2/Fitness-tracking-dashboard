import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

function GoalHistory() {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        const { data, error } = await supabase.from('goals').select('*');
        if (error) {
            setError('Failed to fetch goals.');
        } else {
            setGoals(data);
        }
        setLoading(false);
    };

    return (
        <div className='p-6 max-w-5xl mx-auto'>
            <h1 className='text-3xl font-bold mb-4'>Goal History</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : goals.length === 0 ? (
                <p>No goals found.</p>
            ) : (
                <div className='grid grid-cols-1 gap-4'>
                    {goals.map((goal) => (
                        <div key={goal.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md'>
                            <div className='p-5'>
                                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{goal.type}</h5>
                                <p className='mb-3 font-normal text-gray-700'>
                                    Progress: {goal.progress}/{goal.target}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {new Date(goal.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GoalHistory; 