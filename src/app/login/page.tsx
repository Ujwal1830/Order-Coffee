"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage =()=> {
	const router = useRouter();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);
	const handleChange = (e: any) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onLogin = async (e: any) => {
		e.preventDefault();
		const result = await signIn('credentials', {
			email: user.email,
			password: user.password,
			redirect: false,
		});

		if (result?.url) {
			router.replace('/profile');
		}
	};
	return (
		<div className="flex items-center justify-center">
			<div className="min-w-80 max-w-2xl sm:max-w-4xl  mx-auto p-6 bg-white shadow-md rounded-md">
				<h2 className="text-2xl text-gray-700 font-semibold mb-4">
					{loading ? "Processing..." : "Login"}
				</h2>
				<form onSubmit={onLogin}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							name="email"
							value={user.email}
							onChange={handleChange}
							placeholder="Enter your email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="password"
							value={user.password}
							onChange={handleChange}
							placeholder="Enter your password"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className={`${buttonDisabled && "cursor-not-allowed"} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
							type="submit"
							disabled={buttonDisabled}
						>
							Login
						</button>
					</div>
				</form>
				<div className="mt-4 text-gray-700">
					<p>
          			    <span>Do not have an account ?</span>
						<Link href={'/signup'} className="text-blue-500">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;