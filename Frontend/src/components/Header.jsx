import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [searchInput, setSearchInput] = useState("");
    const [userStatus, setUserStatus] = useState(false); // This state can be removed if userStatus is derived from Redux state directly
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/v1/users/verification', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const jsonResponse = await response.json();
                    if (jsonResponse.data.isAuthenticated) {
                        setUserStatus(true); 
                    } else {
                        setUserStatus(false);
                    }
                } else {
                    setUserStatus(false);
                }
            } catch (error) {
                console.error('Error checking user status:', error);
                setUserStatus(false); 
            }
        };
    
        checkUserStatus();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {    
            const validSearchInput = JSON.stringify({ searchInput });
            const response = await fetch('https://video-sharing-app-backend-fcv2.onrender.com/api/v1/search/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
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
                    {userStatus && (
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
