import React, { useEffect, useState } from 'react';
import Header from './Header';
import VideoCard from './VideoCard';
import { useNavigate } from 'react-router-dom';
import UseReactQuery from '../Custom_Hook/useReactQuery';
import ErrorPage from './ErrorPage';
import LoaderPage from './LoadingPage';

function Home() {
    // const [videos, setVideos] = useState([]);
    // const token = useSelector(state => state.accessTokenSlice.token)
    const navigate = useNavigate()
    
    const videoObj = UseReactQuery('/api/v1/videos/home-videos', 'GET')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/v1/videos/home-videos', {
    //                 method: 'GET',
    //                 headers: {
    //                 'Authorization': `Bearer ${token}`
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Server response is not ok");
    //             }
    
    //             const responseData = await response.json();
    //             setVideos(responseData.data);
    //         } catch (error) {
    //             console.log(error);
    //             throw new Error("Something went wrong while fetching videos from server");
    //         }
    //     };
    
    //     fetchData();
    // }, [])

    const handleClick = (videoId) => {
        navigate(`/v/${videoId}`, { state: videoId })
    }

    return (
        <div className="flex flex-col items-center">
            <Header />

            {/* Video Section */}
            
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
    );
}

export default Home;
