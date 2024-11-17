import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeATLS, setTokenWithExpiry } from '../store/accessTokenSlice';
import { login } from '../store/authSlice';
import LoaderPage from './LoadingPage';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Register() {
  const navigate = useNavigate();
  const [registering, setRegistering] = useState(false);
  const [usernameErrMessage, setUsernameErrMessage] = useState('');
  const [fullNameErrMessage, setFullNameErrMessage] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const dispatch = useDispatch();
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
    setRegistering(true);
    const formData = new FormData();
    Object.entries(register).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/register`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: formData,
      });

      const dataFromServer = await response.json();

      if (!dataFromServer.success) {
        setUsernameErrMessage(dataFromServer?.data?.usernameError);
        setFullNameErrMessage(dataFromServer?.data?.fullNameError);
        setEmailErrMessage(dataFromServer?.data?.emailError);
        setPasswordErrMessage(dataFromServer?.data?.passwordError);
        return;
      }

      dispatch(setTokenWithExpiry({ ttl: 30000 }));
      dispatch(storeATLS(dataFromServer.data.accessToken));
      dispatch(login());
      navigate('/upload-avatar');
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className='w-full bg-gray-900 text-white'>
      {registering && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-75 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500'></div>
        </div>
      )}

      <div onClick={() => navigate('/')} className='rounded-full px-6 py-1 bg-gray-700 absolute top-5 left-5'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className='flex flex-col h-screen justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-xs md:text-lg w-full'>
        <div className='bg-gray-800 p-10 rounded-lg shadow-md w-5/6 md:w-3/6'>
          <h2 className='text-xl md:text-3xl font-semibold text-orange-500 mb-5'>Sign Up</h2>
          <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='flex flex-col pb-2'>
              <label htmlFor='username' className='text-gray-300 font-semibold'>
                Username
              </label>
              <input
                type='text'
                name='username'
                id='username'
                value={register.username}
                onChange={handleInput}
                className='py-1 md:py-2 px-4 rounded-md border border-gray-600 focus:outline-none w-full focus:border-orange-500 bg-gray-700 text-white'
              />
              {usernameErrMessage?.length > 0 && <span className='text-red-500 text-xs pb-2'>{usernameErrMessage}</span>}
            </div>

            <div className='flex flex-col pb-2'>
              <label htmlFor='fullName' className='text-gray-300 font-semibold'>
                Fullname
              </label>
              <input
                type='text'
                name='fullName'
                id='fullName'
                value={register.fullName}
                onChange={handleInput}
                className='py-1 md:py-2 px-4 rounded-md border border-gray-600 focus:outline-none focus:border-orange-500 bg-gray-700 text-white'
              />
              {fullNameErrMessage?.length > 0 && <span className='text-red-500 text-xs pb-2'>{fullNameErrMessage}</span>}
            </div>

            <div className='flex flex-col pb-2'>
              <label htmlFor='email' className='text-gray-300 font-semibold'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={register.email}
                onChange={handleInput}
                className='py-1 md:py-2 px-4 rounded-md border border-gray-600 focus:outline-none focus:border-orange-500 bg-gray-700 text-white'
              />
              {emailErrMessage?.length > 0 && <span className='text-red-500 text-xs pb-2'>{emailErrMessage}</span>}
            </div>

            <div className='flex flex-col pb-2'>
              <label htmlFor='password' className='text-gray-300 font-semibold'>
                Password
              </label>
              <input
                autoComplete='off'
                type='password'
                name='password'
                id='password'
                value={register.password}
                onChange={handleInput}
                className='py-1 md:py-2 px-4 rounded-md border border-gray-600 focus:outline-none focus:border-orange-500 bg-gray-700 text-white'
              />
              {passwordErrMessage?.length > 0 && <span className='text-red-500 text-xs pb-2'>{passwordErrMessage}</span>}
            </div>

            <button
              type='submit'
              className='bg-orange-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 mt-4'
            >
              Register
            </button>
          </form>
          <div className='mt-5'>
            <span className='text-gray-300'>Already have an account?</span>{' '}
            <Link to='/login' className='text-orange-500 font-semibold hover:underline'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
