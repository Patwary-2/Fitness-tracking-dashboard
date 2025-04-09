import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
	BarChart,
	Bar,
	Legend,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import WorkoutForm from '../components/WorkoutForm';
import GoalTracker from '../components/GoalTracker';
import ProgressChart from '../components/ProgressChart';
import Home from './Home';
import 'flowbite';
import WorkoutHistory from './WorkoutHistory';
import GoalHistory from './GoalHistory';
import './Dashboard.css';
import Header from '../components/Header';
import WorkoutHistorySection from '../components/WorkoutHistorySection';
import Sidebar from '../components/Sidebar';

function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [displayName, setDisplayName] = useState('');
	const [exercise, setExercise] = useState('');
	const [reps, setReps] = useState('');
	const [duration, setDuration] = useState('');
	const [intensity, setIntensity] = useState('');
	const [calories, setCalories] = useState('');
	const [entries, setEntries] = useState([]);
	const [goal, setGoal] = useState('');
	const [lastEntry, setLastEntry] = useState(null);
	const [loading, setLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const getUser = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (!data?.user) {
				navigate('/');
			} else {
				setUser(data.user);
				setDisplayName(
					data.user.user_metadata?.display_name || data.user.email
				);
			}
		};

		getUser();
		fetchEntries();
	}, []);

	const fetchEntries = async () => {
		const { data, error } = await supabase
			.from('workouts')
			.select('*')
			.order('created_at', { ascending: false });

		if (!error) {
			setEntries(data);
			if (data.length > 0) setLastEntry(data[0]);
		}
		setLoading(false);
	};

	const handleAddWorkout = async (e) => {
		e.preventDefault();
		const { error } = await supabase.from('workouts').insert([
			{
				user_id: user.id,
				exercise,
				duration: parseFloat(duration),
				intensity,
				calories: parseFloat(calories),
			},
		]);
		if (!error) {
			setExercise('');
			setDuration('');
			setIntensity('');
			setCalories('');
			fetchEntries();
		} else alert('Error logging workout.');
	};

	const logout = async () => {
		await supabase.auth.signOut();
		navigate('/');
	};

	const shareText = encodeURIComponent(
		`🔥 My latest workout!\n💪 Exercise: ${lastEntry?.exercise}\n🔥 Calories: ${lastEntry?.calories}`
	);

	const whatsappUrl = `https://wa.me/?text=${shareText}`;
	const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=https://yourapp.com`;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
	const telegramUrl = `https://t.me/share/url?url=https://yourapp.com&text=${shareText}`;

	return (
		<div className="flex">
			<Sidebar />
			<div className="p-6 max-w-5xl mx-auto ml-64 w-full bg-white text-gray-900 min-h-screen transition-colors duration-300 ease-in-out">
				<Header displayName={displayName} logout={logout} />

				{loading ? (
					<div className="flex justify-center items-center h-full">
						<div className="loader"></div>
					</div>
				) : (
					<>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/workouts"
								element={
									<WorkoutForm
										user={user}
										exercise={exercise}
										setExercise={setExercise}
										reps={reps}
										setReps={setReps}
										duration={duration}
										setDuration={setDuration}
										intensity={intensity}
										setIntensity={setIntensity}
										calories={calories}
										setCalories={setCalories}
										handleAddWorkout={handleAddWorkout}
										entries={entries}
									/>
								}
							/>
							<Route path="/goals" element={<GoalTracker goal={goal} setGoal={setGoal} />} />
							<Route path="/progress" element={<ProgressChart entries={entries} />} />
							<Route path="/workout-history" element={<WorkoutHistory entries={entries} />} />
							<Route path="/goal-history" element={<GoalHistory />} />
						</Routes>

						{location.pathname === '/dashboard' && <WorkoutHistorySection entries={entries} />}

						{lastEntry && (
							<div className="mt-6">
								<h2 className="text-lg font-semibold mb-2">Share Progress</h2>
								<div className="flex gap-2">
									<a
										href={whatsappUrl}
										target="_blank"
										rel="noreferrer"
										className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M16.988 13.675c-.25-.125-1.475-.725-1.7-.8-.225-.075-.4-.125-.575.125-.175.25-.65.8-.8.975-.15.175-.3.2-.55.075-.25-.125-1.05-.4-2-1.275-.75-.675-1.25-1.5-1.4-1.75-.15-.25-.015-.375.1-.5.1-.1.225-.25.35-.375.1-.125.125-.225.175-.375.05-.15.025-.275-.025-.4-.05-.125-.575-1.375-.8-1.925-.2-.5-.4-.425-.575-.425-.15 0-.275-.025-.425-.025s-.4.05-.6.275c-.2.225-.775.75-.775 1.825s.8 2.125.9 2.275c.1.125 1.575 2.4 3.825 3.375.525.225.925.35 1.225.45.515.175.975.15 1.35.1.425-.05 1.3-.525 1.475-1.025.175-.5.175-.925.125-1.025-.05-.1-.225-.175-.475-.3zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.115 1.523 5.857L0 24l6.143-1.523A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.123 0-4.115-.553-5.857-1.523L2 22l1.523-4.143C2.553 16.115 2 14.123 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
										</svg>
									</a>
									<a
										href={facebookUrl}
										target="_blank"
										rel="noreferrer"
										className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325C24 .593 23.407 0 22.675 0z" />
										</svg>
									</a>
									<a
										href={twitterUrl}
										target="_blank"
										rel="noreferrer"
										className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.573 4.897 4.897 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.918 4.918 0 004.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557z" />
										</svg>
									</a>
									<a
										href={telegramUrl}
										target="_blank"
										rel="noreferrer"
										className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
									>
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
											<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.115 1.523 5.857L0 24l6.143-1.523A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.123 0-4.115-.553-5.857-1.523L2 22l1.523-4.143C2.553 16.115 2 14.123 2 12 2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
										</svg>
									</a>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Dashboard;
