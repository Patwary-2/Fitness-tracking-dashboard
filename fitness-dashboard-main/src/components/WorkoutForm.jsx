import React, { useEffect, useState } from 'react';
import 'flowbite';

function WorkoutForm({ user, exercise, setExercise, reps, setReps, duration, setDuration, intensity, setIntensity, calories, setCalories, handleAddWorkout, entries }) {
	const latestWorkout = entries.length > 0 ? entries[0] : null;

	return (
		<div className='space-y-6'>
			<form onSubmit={handleAddWorkout} className='bg-white p-4 rounded-lg shadow-md space-y-4'>
				<h2 className='text-lg font-semibold mb-3'>Log Workout</h2>
				<div className='flex flex-col space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>Exercise</label>
					<input
						type='text'
						placeholder='Exercise'
						value={exercise}
						onChange={(e) => setExercise(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						required
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>Reps</label>
					<input
						type='number'
						placeholder='Reps'
						value={reps}
						onChange={(e) => setReps(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
						required
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>Duration (minutes)</label>
					<input
						type='number'
						placeholder='Duration (minutes)'
						value={duration}
						onChange={(e) => setDuration(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<div className='flex flex-col space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>Intensity</label>
					<select
						value={intensity}
						onChange={(e) => setIntensity(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					>
						<option value=''>Select Intensity</option>
						<option value='Low'>Low</option>
						<option value='Medium'>Medium</option>
						<option value='High'>High</option>
					</select>
				</div>
				<div className='flex flex-col space-y-2'>
					<label className='block text-sm font-medium text-gray-700'>Calories Burned</label>
					<input
						type='number'
						placeholder='Calories Burned'
						value={calories}
						onChange={(e) => setCalories(e.target.value)}
						className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
				>
					Add
				</button>
			</form>
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
		</div>
	);
}

export default WorkoutForm; 