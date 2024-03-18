import React from 'react'
import {NavLink } from 'react-router-dom'

function Header() {
    return (
        <div className='w-full shadow-lg flex flex-col justify-center items-center'>
            {/* Search Bar */}
            <div className="w-1/2 mt-2 mb-4 flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-3/4 py-2 px-4 rounded-l-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded-r-full">Search</button>
            </div>

            {/* Navigation Links */}
            <div className="flex mb-3">
                <ul className="flex gap-8 font-semibold">
                    <li>
                        <NavLink
                            to={"/home"}
                            className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 ${isActive?"text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={"/profile"}
                            className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 ${isActive?"text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            Profile
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={"/history"}
                            className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 ${isActive?"text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            History
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={"/upload"}
                            className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 ${isActive?"text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            Upload
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to={"/logout"}
                            className={({isActive}) =>
                                    `block py-2 pr-4 pl-3 duration-200 ${isActive?"text-blue-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-blue-700 lg:p-0`
                            }
                        >
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
