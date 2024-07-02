import React, { useCallback, useEffect } from 'react';
import { NavLink, json } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Header() {
    const [searchInput, setSearchInput] = useState("");
    const [userStatus, setUserStatus] = useState(null); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/verification`, {
                    method: 'GET',
                    mode: 'cors',  
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });
    
                if (response.ok) {
                        const jsonResponse = await response.json();
                        setUserStatus(jsonResponse.data.isAuthenticated);
                        // let expiry = JSON.parse(localStorage.getItem("accessToken"));
                        // if(new Date().getTime() < expiry) {
                        //     setUserStatus(jsonResponse.data.isAuthenticated);
                        // } else {
                        //     if(jsonResponse.data.isAuthenticated) {
                        //         dispatch(logout());
                        //         setUserStatus(false);
                        //         try {
                        //             await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/logout`, {
                        //                 method: 'GET',
                        //                 mode: 'cors',
                        //                 credentials: 'include',
                        //                 headers: {
                        //                 'Content-Type': 'application/json'
                        //                 },
                        //             });
                        //         } catch (error) {
                        //             console.error('Error during logout:', error);
                        //         }
                        //     }
                        // }
                } else {
                    dispatch(logout());
                    setUserStatus(false);
                }
            } catch (error) {
                console.error('Error checking user status:', error);
                dispatch(logout());
                setUserStatus(false); 
            }
        };
    
        checkUserStatus();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {    
            const validSearchInput = JSON.stringify({ searchInput });
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/search/videos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'include',
                body: validSearchInput,
            });
        
            if (!response.ok) {
                console.log('Something went wrong');
            }
        
            const searchResult = await response.json();
            navigate(`/search/videos`, { state: searchResult });
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong');
        }
    };

    const handleInput = (e) => {
        setSearchInput(e.target.value);
    };
    

    return (
        <div className='w-full shadow-lg flex flex-col justify-center items-center'>

            <form onSubmit={handleSubmit} className="w-1/2 mt-2 mb-4 flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-3/4 py-2 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    name='content'
                    value={searchInput}
                    onChange={handleInput}
                />
                <input className="bg-blue-500 text-white py-2 px-4 rounded-r-full" type='submit' value='Search' />
            </form>

            <div className="flex mb-3">
                <ul className="flex gap-8 font-semibold">
                    <li>
                        <NavLink
                            to={"/"}
                            className={({isActive}) =>
                                `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {userStatus === true && (
                        <>
                            <li>
                                <NavLink
                                    to={"/profile"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/history"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/upload"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Upload
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/logout"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Logout
                                </NavLink>
                            </li>
                        </>
                    )}
                    {!userStatus && (
                        <>
                            <li>
                                <NavLink
                                    to={"/login"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={"/register"}
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                                    }
                                >
                                    Signup
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Header;
