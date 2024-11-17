import React from 'react';

function LoadingPage() {
    return (
        <div className="flex flex-wrap justify-center gap-6">
            {/* Skeleton Loader for Video Card */}
            {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-gray-700 rounded-lg shadow-lg p-4 mb-2 max-w-xs w-full animate-pulse">
                    <div className="bg-gray-600 h-36 rounded-lg mb-2"></div> {/* Placeholder for thumbnail */}
                    <div className="bg-gray-600 h-4 w-3/4 mb-2"></div> {/* Placeholder for title */}
                    <div className="flex justify-start items-center gap-2 mb-2">
                        <div className="bg-gray-600 h-8 w-8 rounded-full"></div> {/* Placeholder for avatar */}
                        <div className="bg-gray-600 h-4 w-24"></div> {/* Placeholder for username */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LoadingPage;
