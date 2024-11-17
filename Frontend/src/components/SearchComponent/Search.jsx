import React from 'react';
import Header from '../Header';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorPage from '../ErrorPage';
import LoaderPage from '../LoadingPage';

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchResult = location.state.data.videos;

    const handleClick = (videoId) => {
        navigate(`/v/${videoId}`, { state: videoId });
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen">
            <Header />
            <div className="w-full max-h-[100vh] overflow-y-auto">
                {searchResult.error && <ErrorPage />}
                {searchResult.loading && <LoaderPage />}
                {!searchResult.error && !searchResult.loading && (
                    <div className="w-full">
                        {searchResult.map((video) => (
                            <div
                                key={video._id}
                                onClick={() => handleClick(video._id)}
                                className="p-4 flex gap-6 items-center bg-gray-800 mt-4 mb-2 rounded-lg cursor-pointer"
                            >
                                <img
                                    className="h-32 w-48 md:h-36 md:w-52 rounded-lg"
                                    src={video.thumbnail}
                                    alt={video.title}
                                />
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-lg md:text-2xl font-semibold text-white">
                                        {video.title}
                                    </h1>
                                    <h2 className="text-sm md:text-lg text-gray-400 mt-1">
                                        {truncateDescription(video.description, 100)}
                                    </h2>
                                    {/* Optional: You can add more fields like views, duration, etc. */}
                                    {/* <p className='text-sm text-gray-500'>{video.views} views</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
