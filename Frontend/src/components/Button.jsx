import React from 'react';

function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600",  // Updated to match dark background
    textColor = "text-gray-200",  // Lighter text color for contrast
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-xl ${bgColor} ${textColor} ${className} transition-all duration-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300`}
            {...props}
            type={type}
        >
            {children}
        </button>
    );
}

export default Button;
