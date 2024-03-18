import React from 'react';

function VideoCard({ thumbnail, title, fullName, views = 0, duration }) {
    duration = Math.round(duration)
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-2 max-w-xs w-full">
            <img className="rounded-lg mb-2 w-full h-36 object-cover" src={thumbnail} alt={title} />
            <h2 className="text-base font-bold mb-1">{title}</h2>
            <h3 className='text-gray-400'>{fullName}</h3>
            <div className='flex flex-wrap justify-start gap-3 items-start'>
                <p className="text-gray-600 mb-1">{views} views</p>
            </div>
        </div>
    );
}

export default VideoCard;
