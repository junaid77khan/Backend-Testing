import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeATLS } from '../store/accessTokenSlice';
import { login } from '../store/authSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch('https://video-sharing-app-backend-fcv2.onrender.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        setLoading(false);
        console.log('Credentials are wrong');
      }

      const dataFromServer = await response.json();
      const accessToken = dataFromServer.data.accessToken;
      dispatch(storeATLS(accessToken));
      dispatch(login());
      navigate('/');

    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong while login');
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex flex-col h-screen justify-center items-center bg-gray-100 relative">
      { 
        loading &&
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-75 flex justify-center items-center z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div> 
      }
      <div onClick={() => navigate("/")} className='rounded-full px-6 py-1 bg-gray-300 absolute top-5 left-5'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginData.username}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleInput}
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-5">
          <span className="text-gray-700">Don't have an account?</span>{' '}
          <Link to="/register" className="text-blue-500 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
