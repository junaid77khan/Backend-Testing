import React, { useCallback, useEffect, useState } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Footer({ isOwner, videoData, subscribed }) {
  const [boolLike, setBoolLike] = useState(null);
  const [boolDisLike, setBoolDisLike] = useState(null);
  const token = useSelector(state => state.accessTokenSlice.token);
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(subscribed);

  const fetchLikeData = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/likes/boolLike/b/${videoData?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong while fetching like information");
    }
    const jsonRes = await res.json();
    setBoolLike(jsonRes.data);
  }, [videoData?._id, token]);

  const fetchDislikeData = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dislikes/dislikebool/b/${videoData?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong while fetching dislike information");
    }
    const jsonRes = await res.json();
    setBoolDisLike(jsonRes.data);
  }, [videoData?._id, token]);

  const fetchSubscribe = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscriptions/d/${videoData?.owner?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const jsonRes = await res.json();
    if (!jsonRes.success) {
      throw new Error("Something went wrong while fetching subsribe information");
    }

    console.log(jsonRes.data);
    
    
    setIsSubscribed(jsonRes.data);
  }, [isSubscribed, token]);

  const toggleLike = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/likes/toggle/v/${videoData?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (!res.success) {
      throw new Error("Something went wrong while liking video");
    }
    const jsonRes = await res.json();
    setBoolLike(jsonRes.data);
  }, [videoData?._id, token]);

  const toggleDisLike = useCallback(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dislikes/toggle/v/${videoData?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong while disliking video");
    }
    const jsonRes = await res.json();
    setBoolDisLike(jsonRes.data);
  }, [videoData?._id, token]);

  const handleSubscribeButton = async () => {
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscriptions/c/${videoData?.owner?._id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!res.ok) {
      throw new Error('Failed to subscribe/unsubscribe');
    }

    const jsonRes = await res.json();
  };

  useEffect(() => {
    fetchLikeData();
    fetchDislikeData();
    fetchSubscribe();
  }, [fetchLikeData, fetchDislikeData]);

  const handleToggleLike = () => {
    if (boolLike) {
      toggleLike(); // Unselect the like if it was already selected
    } else {
      toggleLike(); // Select like
      if (boolDisLike) {
        toggleDisLike(); // Unselect dislike if it's selected
      }
    }
  };

  const handleToggleDislike = () => {
    if (boolDisLike) {
      toggleDisLike(); // Unselect the dislike if it was already selected
    } else {
      toggleDisLike(); // Select dislike
      if (boolLike) {
        toggleLike(); // Unselect like if it's selected
      }
    }
  };

  const deleteVideo = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/videos/c/${videoData?._id}`, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const jsonRes = await res.json();
    if (!jsonRes.success) {
      alert("Failed to delete video. Please try again later");
    }
    navigate("/profile");
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 rounded-lg w-full px-4 pb-4 text-white">
      <p className="text-gray-400 font-bolder mb-1">Views - {videoData?.views}</p>
      <h1 className="text-md md:text-xl mb-3 font-semibold text-gray-200">{videoData?.title}</h1>
      <div className='pr-3 flex flex-wrap justify-between items-center'>
        <div className='flex flex-wrap gap-2 items-center justify-between'>
          <img className='rounded-full h-10 w-10' src={videoData?.owner?.avatar} alt="Owner Avatar" />
          <h1 className='font-semibold text-gray-200'>{videoData?.owner?.username}</h1>
        </div>
        <div>
          {
            !isSubscribed ? (
              <Button onClick={handleSubscribeButton} className='py-1 px-3 text-sm md:text-md bg-orange-500 hover:bg-orange-600 transition duration-300'>Subscribe</Button>
            ) : (
              <Button onClick={handleSubscribeButton} className='py-1 px-3 text-sm md:text-md bg-gray-500 hover:bg-gray-400 transition duration-300'>Subscribed</Button>
            )
          }
        </div>
      </div>
      <div className='flex flex-wrap justify-start items-center gap-1 mt-3'>
        <div className='flex flex-wrap justify-center items-center gap-1'>
          <div onClick={handleToggleLike} className='rounded-full text-xs px-4 py-1 md:text-lg md:px-6 md:py-2 bg-gray-600 hover:bg-gray-500 cursor-pointer'>
            <FontAwesomeIcon style={{ color: boolLike ? 'orange' : 'white' }} icon={faThumbsUp} />
          </div>
          <div onClick={handleToggleDislike} className='rounded-full text-xs px-4 py-1 md:text-lg md:px-6 md:py-2 bg-gray-600 hover:bg-gray-500 cursor-pointer'>
            <FontAwesomeIcon style={{ color: boolDisLike ? 'orange' : 'white' }} flip="horizontal" icon={faThumbsDown} />
          </div>
        </div>
        {isOwner &&
          <div className='flex flex-wrap gap-2'>
            <FontAwesomeIcon onClick={deleteVideo} className='bg-red-600 text-white rounded-full text-xs px-4 py-1 md:text-lg md:px-6 md:py-2 cursor-pointer hover:bg-red-500 transition duration-300' flip="horizontal" icon={faTrash} />
          </div>
        }
      </div>
    </div>
  );
}

export default Footer;
