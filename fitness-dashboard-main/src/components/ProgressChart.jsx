import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
} from 'recharts';

function ProgressChart({ entries }) {
	return (
		<div className='grid grid-cols-3 gap-4'>
			<div className='mb-8'>
				<h2 className='text-lg font-semibold mb-3'>Progress Chart (Calories)</h2>
				<ResponsiveContainer width='100%' height={250}>
					<LineChart data={entries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='created_at' tickFormatter={(date) => new Date(date).toLocaleDateString()} />
						<YAxis />
						<Tooltip />
						<Line type='monotone' dataKey='calories' stroke='#8884d8' activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<div className='mb-8'>
				<h2 className='text-lg font-semibold mb-3'>Exercise Frequency</h2>
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={Object.values(entries.reduce((acc, entry) => {
						if (!acc[entry.exercise]) acc[entry.exercise] = { exercise: entry.exercise, count: 0 };
						acc[entry.exercise].count += 1;
						return acc;
					}, {}))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='exercise' />
						<YAxis />
						<Tooltip />
						<Bar dataKey='count' fill='#82ca9d' />
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className='mb-8'>
				<h2 className='text-lg font-semibold mb-3'>Exercise Distribution</h2>
				<ResponsiveContainer width='100%' height={250}>
					<PieChart>
						<Pie data={Object.values(entries.reduce((acc, entry) => {
							if (!acc[entry.exercise]) acc[entry.exercise] = { name: entry.exercise, value: 0 };
							acc[entry.exercise].value += entry.calories;
							return acc;
						}, {}))} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80} fill='#8884d8' label>
							{Object.values(entries.reduce((acc, entry) => {
								if (!acc[entry.exercise]) acc[entry.exercise] = { name: entry.exercise, value: 0 };
								acc[entry.exercise].value += entry.calories;
								return acc;
							}, {})).map((entry, index) => (
								<Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>
			<div className='mb-8'>
				<h2 className='text-lg font-semibold mb-3'>Cumulative Calories Burned</h2>
				<ResponsiveContainer width='100%' height={250}>
					<AreaChart data={entries.map((entry, index) => ({ ...entry, cumulative: entries.slice(0, index + 1).reduce((sum, e) => sum + e.calories, 0) }))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='created_at' tickFormatter={(date) => new Date(date).toLocaleDateString()} />
						<YAxis />
						<Tooltip />
						<Area type='monotone' dataKey='cumulative' stroke='#8884d8' fill='#8884d8' />
					</AreaChart>
				</ResponsiveContainer>
			</div>
			<div className='mb-8'>
				<h2 className='text-lg font-semibold mb-3'>Total Calories Burned Per Day</h2>
				<ResponsiveContainer width='100%' height={250}>
					<BarChart data={Object.values(entries.reduce((acc, entry) => {
						const date = new Date(entry.created_at).toLocaleDateString();
						if (!acc[date]) acc[date] = { date, calories: 0 };
						acc[date].calories += entry.calories;
						return acc;
					}, {}))} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='date' />
						<YAxis />
						<Tooltip />
						<Bar dataKey='calories' fill='#82ca9d' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ProgressChart; 