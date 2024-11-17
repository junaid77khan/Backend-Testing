import React from 'react';
import Header from './Header';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';
import UseReactQuery from '../Custom_Hook/useReactQuery';
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';  // Updated import

function Home() {
    const navigate = useNavigate();
    const videoObj = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/videos/home-videos`, 'GET');

    const handleClick = (videoId) => {
        navigate(`/v/${videoId}`, { state: videoId });
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center">
                <div className="bg-gray-900 min-h-screen p-4 w-full"> {/* Dark background */}
                    {videoObj.error && <ErrorPage />}
                    {videoObj.loading && <LoadingPage />} {/* Show the loading page while data is loading */}
                    {videoObj.response.length === 0 && !videoObj.loading && (
                        <div className="w-full text-xl font-semibold text-white flex flex-wrap justify-center items-center">
                            No videos
                        </div>
                    )}
                    {
                        !videoObj.error && !videoObj.loading && videoObj.response.length !== 0 &&
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            {videoObj.response.map((video) => (
                                <div key={video._id} onClick={() => handleClick(video._id)} className="w-80">
                                    <VideoCard
                                        avatar={video.owner.avatar}
                                        thumbnail={video.thumbnail}
                                        title={video.title}
                                        username={video.owner.username}
                                        uploadDate={video.createdAt}
                                    />
                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default Home;
