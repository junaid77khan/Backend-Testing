import React, { useEffect, useState } from 'react';
import Header from './Header';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';
import UseReactQuery from '../Custom_Hook/useReactQuery';
import ErrorPage from './ErrorPage';
import LoaderPage from './LoadingPage';

function Home() {
    const navigate = useNavigate()
    
    const videoObj = UseReactQuery(`https://video-sharing-app-backend-fcv2.onrender.com/api/v1/videos/home-videos`, 'GET')

    const handleClick = (videoId) => {
        navigate(`/v/${videoId}`, { state: videoId })
    }

    return (
        <>
            {/* <Header/> */}
            <div className="flex flex-col items-center">
                
                <div className='bg-gray-200 min-h-screen p-4 w-full'>
                    {videoObj.error && <ErrorPage/>}
                    {videoObj.loading && <LoaderPage />}
                    {videoObj.response.length === 0 && <div className='w-full text-xl font-semibold text-black flex flex-wrap justify-center items-center'>No videos</div>}
                    {   
                        !videoObj.error && !videoObj.loading && videoObj.response.length !== 0 && 
                        <div className=' flex flex-wrap items-center justify-center gap-6'>
                            {videoObj.response.map((video) => (
                                <div key={video._id} onClick={() => handleClick(video._id)} className='w-80'>
                                    <VideoCard thumbnail={video.thumbnail} title={video.title} fullName={video.fullName}/>
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
