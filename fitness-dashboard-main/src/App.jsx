import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './context/ThemeContext';

function App() {
	return (
		<ThemeProvider>
			<Router>
				<Routes>
					<Route
						path='/'
						element={<Login />}
					/>
					<Route
						path='/dashboard/*'
						element={<Dashboard />}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
