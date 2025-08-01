import React, { useState, useContext } from 'react';
import colors from '../color';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {toast,Toaster} from 'react-hot-toast'; 
import { CircleLoader } from 'react-spinners'; 
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useContext(AuthContext);
  

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result.token) {
        setIsLogin(true);
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
        toast.success('Login successful!');
      } else {
        toast.error(result.message || 'Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen"
    >
      <Toaster />
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-xl"
        style={{ backgroundColor: colors.primary }}
      >
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: colors.text }}
        >
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2" style={{ color: colors.text }}>
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2" style={{ color: colors.text }}>
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              className="w-full px-4 py-2 rounded-lg border-none focus:ring-2 focus:ring-opacity-50"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text
              }}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg shadow hover:shadow-md transition-all mb-4"
            style={{ backgroundColor: colors.accent, color: colors.text }}
          >
            {loading ? (
              <div className="flex justify-center">
                <CircleLoader color={colors.text} size={24} />
              </div>
            ) : (
              'Login'
            )}
          </button>

          {/* Link to Register */}
          <p className="text-center" style={{ color: colors.text }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold hover:underline focus:outline-none"
              style={{ color: colors.text }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
