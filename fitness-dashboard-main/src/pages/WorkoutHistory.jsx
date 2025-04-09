import React, { useState, useEffect } from 'react';

function WorkoutHistory({ entries = [] }) {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (entries.length > 0) {
			setLoading(false);
		}
	}, [entries]);

	const latestWorkout = entries.length > 0 ? entries[0] : null;

	return (
		<div className='p-6 max-w-5xl mx-auto'>
			<h1 className='text-3xl font-bold mb-4'>Workout History</h1>
			{loading ? (
				<p>Loading...</p>
			) : entries.length === 0 ? (
				<p>No workout entries found.</p>
			) : (
				<>
					{latestWorkout && (
						<div className='mb-6 p-4 bg-blue-100 border border-blue-300 rounded-lg'>
							<h2 className='text-2xl font-bold mb-2'>Latest Workout</h2>
							<p className='font-normal text-gray-700'>
								{latestWorkout.exercise} - {latestWorkout.reps} reps, {latestWorkout.duration} mins, {latestWorkout.intensity} intensity, {latestWorkout.calories} cal
							</p>
							<p className='text-sm text-gray-500'>
								{new Date(latestWorkout.created_at).toLocaleString()}
							</p>
						</div>
					)}
					<div className='grid grid-cols-1 gap-4'>
						{entries.map((entry) => (
							<div key={entry.id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-md'>
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
				</>
			)}
		</div>
	);
}

export default WorkoutHistory; 