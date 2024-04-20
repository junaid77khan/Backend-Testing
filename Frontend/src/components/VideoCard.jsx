import React from 'react';

function VideoCard({ thumbnail, title, fullName, views = 0, duration }) {
    duration = Math.round(duration)
    const maxLen = 30;
    const truncatedTitle = (title?.length > maxLen) ? title.slice(0, maxLen)+"..." : title
    const truncatedFullname = (fullName?.length > maxLen) ? fullName.slice(0, maxLen)+"..." : fullName
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2 max-w-xs w-full">
            <img className="rounded-lg mb-2 w-full h-36 object-cover" src={thumbnail} alt={title} />
            <h2 className="text-base font-bold mb-1">{truncatedTitle}</h2>
            <h3 className='text-gray-400'>{truncatedFullname}</h3>
            <div className='flex flex-wrap justify-start gap-3 items-start'>
                <p className="text-gray-600 mb-1">{views} views</p>
            </div>
        </div>
    );
}

export default VideoCard;
