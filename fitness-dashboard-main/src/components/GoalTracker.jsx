import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

function GoalTracker() {
	const [goals, setGoals] = useState([]);
	const [newGoalType, setNewGoalType] = useState('');
	const [newGoalTarget, setNewGoalTarget] = useState('');

	useEffect(() => {
		fetchGoals();
	}, []);

	const fetchGoals = async () => {
		const { data, error } = await supabase.from('goals').select('*');
		if (!error) setGoals(data);
	};

	const addGoal = async () => {
		const user = supabase.auth.user(); // Retrieve the current user
		if (newGoalType && newGoalTarget && user) {
			const { error } = await supabase.from('goals').insert([
				{ type: newGoalType, target: parseInt(newGoalTarget), user_id: user.id }
			]);
			if (!error) {
				setNewGoalType('');
				setNewGoalTarget('');
				fetchGoals();
			}
		}
	};

	const checkGoalStatus = (goal) => {
		if (goal.progress >= goal.target) {
			return 'Goal Met! 🎉';
		} else {
			return 'Keep Going!';
		}
	};

	const updateProgress = async (goalId, newProgress) => {
		const { error } = await supabase.from('goals').update({ progress: newProgress }).eq('id', goalId);
		if (!error) fetchGoals();
	};

	return (
		<div className='mb-6'>
			<h2 className='text-lg font-semibold mb-2'>Goals</h2>
			<div className='mb-4'>
				<input
					type='text'
					value={newGoalType}
					onChange={(e) => setNewGoalType(e.target.value)}
					placeholder='Goal Type'
					className='w-full p-2 border rounded mb-2'
				/>
				<input
					type='number'
					value={newGoalTarget}
					onChange={(e) => setNewGoalTarget(e.target.value)}
					placeholder='Target'
					className='w-full p-2 border rounded mb-2'
				/>
				<button
					onClick={addGoal}
					className='bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300'
				>
					Add Goal
				</button>
			</div>
			<ul>
				{goals.map((goal) => (
					<li key={goal.id} className='mb-2'>
						{goal.type}: {goal.progress}/{goal.target} - {checkGoalStatus(goal)}
						<div className='flex items-center mt-2'>
							<input
								type='number'
								value={goal.progress}
								onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
								className='w-20 p-1 border rounded mr-2'
							/>
							<button
								onClick={() => updateProgress(goal.id, goal.progress + 1)}
								className='bg-green-500 text-white p-1 rounded hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300'
							>
								+1
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default GoalTracker; 