import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeATLS } from '../store/accessTokenSlice';
import { login } from '../store/authSlice';

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [register, setRegister] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    avatar: null,
  });

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(register).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5000/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 

      const dataFromServer = await response.json();
      dispatch(storeATLS(dataFromServer.data.accessToken))
      dispatch(login(dataFromServer))
      navigate('/home');
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={register.username}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-gray-700 font-semibold">
              Fullname
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={register.fullName}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={register.email}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              value={register.password}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-gray-700 font-semibold">
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-5">
          <span className="text-gray-700">Already have an account?</span>{' '}
          <Link to="/" className="text-blue-500 font-semibold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
