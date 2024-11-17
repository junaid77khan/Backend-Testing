import React from 'react';

function ProfileLoadingPage() {
    return (
        <div className="w-full flex flex-col items-center p-6">
            {/* Skeleton for Profile */}
            <div className="bg-gray-600 rounded-full h-32 w-32 mb-6 animate-pulse"></div>
            <div className="bg-gray-600 h-6 w-2/3 mb-4 animate-pulse"></div>
            <div className="bg-gray-600 h-4 w-1/3 mb-6 animate-pulse"></div>

            {/* Skeleton for Stats */}
            <div className="flex justify-center gap-8 mb-8 animate-pulse">
                <div className="bg-gray-600 h-6 w-32"></div>
                <div className="bg-gray-600 h-6 w-32"></div>
            </div>

            {/* Skeleton for Video Cards */}
            <div className="flex flex-wrap justify-center gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-600 rounded-lg p-4 mb-2 max-w-xs w-full animate-pulse">
                        <div className="bg-gray-500 h-36 rounded-lg mb-2"></div>
                        <div className="bg-gray-500 h-4 w-3/4 mb-2"></div>
                        <div className="flex gap-2 mb-2">
                            <div className="bg-gray-500 h-8 w-8 rounded-full"></div>
                            <div className="bg-gray-500 h-4 w-24"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProfileLoadingPage;
