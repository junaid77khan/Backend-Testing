import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeATLS, setTokenWithExpiry } from '../store/accessTokenSlice';
import { login } from '../store/authSlice';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userErrMessage, setUserErrMessage] = useState("");
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
      });

      const dataFromServer = await response.json();
      console.log(dataFromServer);

      if (!dataFromServer.success) {
        setUserErrMessage(dataFromServer?.data?.userError);
        return;
      }

      const accessToken = dataFromServer.data.accessToken;
      dispatch(setTokenWithExpiry({ ttl: 30000 }));
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
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-xs md:text-lg">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-75 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}

      <div
        onClick={() => navigate("/")}
        className="rounded-full px-6 py-1 bg-gray-700 text-white absolute top-5 left-5 cursor-pointer hover:bg-gray-600 transition-all duration-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className="bg-gray-800 p-10 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-semibold text-orange-500 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-white font-semibold">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginData.username}
              onChange={handleInput}
              className="py-3 px-4 rounded-md border border-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              placeholder="Enter your username"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-white font-semibold">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleInput}
              className="py-3 px-4 rounded-md border border-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
              placeholder="Enter your password"
            />
          </div>

          {userErrMessage?.length > 0 && <span className="text-red-500 text-sm">{userErrMessage}</span>}

          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 px-4 rounded-md border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-white">Don't have an account?</span>{' '}
          <Link to="/register" className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
