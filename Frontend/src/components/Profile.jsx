import React from 'react';
import Header from './Header';
import VideoCard from './VideoCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UseReactQuery from '../Custom_Hook/useReactQuery';
import ErrorPage from './ErrorPage';
import ProfileLoadingPage from './ProfileLoadingPage';  // Custom Profile Loading Page

function Profile() {
    const token = useSelector(state => state.accessTokenSlice.token)
    const navigate = useNavigate()

    const stats = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/stats`, 'GET')
    const videos = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/videos`, 'GET')
    console.log(videos);
    
    let user = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, 'GET')
    

    const handleClick = (videoId) => {
        navigate(`/v/${videoId}`, { state: videoId });
    };

    return (
        <div className="flex flex-wrap items-center flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen w-full">
            <Header />
            {
                (user.error || stats.error || videos.error) &&
                <ErrorPage />
            }
            {
                (user.loading || stats.loading || videos.loading) &&
                <ProfileLoadingPage />
            }
            {
                (!user.error && !user.loading && !videos.error && !videos.loading && !stats.error && !stats.loading &&
                    <div className="w-full bg-transparent">
                        {/* Profile Section */}
                        <div className="rounded-lg bg-transparent shadow-xl p-6 w-full mb-6">
                            <div className="flex items-center justify-center mb-6">
                                <img
                                    className="rounded-full h-32 w-32 object-cover border-4 border-orange-500 hover:scale-105 transition-transform"
                                    src={user.response.avatar ? user.response.avatar : 'image/null-avatar.png'}
                                    alt="Profile"
                                />
                            </div>
                            <div className="text-center text-white">
                                <h2 className="text-2xl font-semibold">{user.response.fullName}</h2>
                                <p className="text-gray-400">@{user.response.username}</p>
                            </div>

                            {/* Stats Section */}
                            <div className="flex flex-wrap justify-center items-center gap-6 text-white mt-6">
                                {/* Subscribers Section */}
                                <div className="flex flex-col justify-center items-center gap-2 bg-gray-700 p-4 rounded-lg shadow-md">
                                    <p className="text-sm text-gray-400">Subscribers</p>
                                    <p className="text-xl font-medium">{stats?.response?.subscribers?.subscribersCount}</p>
                                </div>

                                {/* Total Videos Section */}
                                <div className="flex flex-col justify-center items-center gap-2 bg-gray-700 p-4 rounded-lg shadow-md">
                                    <p className="text-sm text-gray-400">Total Videos</p>
                                    <p className="text-xl font-medium">{stats?.response?.totalVideos?.videosCount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Videos Section */}
                        {
                            (videos.response.length !== 0) ? (
                                <div className="flex flex-wrap justify-start items-start gap-6 p-6 bg-transparent">
                                    {   
                                        videos?.response?.map((video) => (
                                            <div key={video._id} onClick={() => handleClick(video?._id)} className="w-80 hover:scale-105 transition-transform">
                                                <VideoCard
                                                    thumbnail={video.thumbnail}
                                                    title={video.title}
                                                    username={user.response.username}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="w-full text-xl font-semibold text-white flex flex-wrap justify-center items-center">
                                    No videos found
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Profile;
