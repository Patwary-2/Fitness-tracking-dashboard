import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
	const navigate = useNavigate();

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<h1 className='text-3xl font-bold mb-4'>Welcome to Your Fitness Dashboard</h1>
			<p className='text-lg'>Track your workouts, set goals, and monitor your progress all in one place.</p>
			<button
				className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 mt-4'
				onClick={() => navigate('/dashboard/workouts')}
			>
				Add Workout
			</button>
		</div>
	);
}

export default Home; 