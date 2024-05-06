"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage=() => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
  const onSignUp = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/users/signup`, user);
      console.log("SignUp Success", res.data);
      router.push("/verifyemail");
    } catch (error: any) {
      console.log("SignUp Failed");
      toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="min-w-72 md:min-w-96  mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl text-gray-700 font-semibold mb-4">
            {loading ? "Processing..." : "Sign Up"}
        </h2>
        <form onSubmit={onSignUp}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
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
              className={`${buttonDisabled && "cursor-not-allowed" } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={buttonDisabled}
            >
                Sign Up
            </button>
          </div>
        </form>
        <div className="mt-4 text-gray-700">
          <p>
            Already have an account ?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignupPage;