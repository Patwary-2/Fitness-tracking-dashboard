import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [isSignup, setIsSignup] = useState(false);

	const navigate = useNavigate();

	const handleAuth = async (e) => {
		e.preventDefault();
		let result;

		if (isSignup) {
			result = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { display_name: displayName },
				},
			});
		} else {
			result = await supabase.auth.signInWithPassword({ email, password });
		}

		const { error } = result;

		if (error) {
			alert(error.message);
		} else {
			navigate('/dashboard');
		}
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 max-w-5xl mx-auto'>
			<h2 className='text-2xl font-bold mb-4'>
				{isSignup ? 'Sign Up' : 'Log In'}
			</h2>
			<form
				onSubmit={handleAuth}
				className='flex flex-col gap-4 w-full max-w-sm'
			>
				<input
					className='p-2 border border-gray-300 rounded'
					type='email'
					placeholder='Email'
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					className='p-2 border border-gray-300 rounded'
					type='password'
					placeholder='Password'
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{isSignup && (
					<input
						className='p-2 border border-gray-300 rounded'
						type='text'
						placeholder='Display Name'
						onChange={(e) => setDisplayName(e.target.value)}
						required
					/>
				)}
				<button
					className='bg-blue-600 text-white p-2 rounded cursor-pointer hover:opacity-80'
					type='submit'
				>
					{isSignup ? 'Create Account' : 'Login'}
				</button>
				<button
					type='button'
					className='text-sm text-blue-600 hover:underline cursor-pointer'
					onClick={() => setIsSignup(!isSignup)}
				>
					{isSignup ? 'Already have an account?' : "Don't have an account?"}
				</button>
			</form>
		</div>
	);
}

export default Login;
