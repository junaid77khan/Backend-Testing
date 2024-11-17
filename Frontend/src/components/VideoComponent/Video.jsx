import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoPlayer from '../VideoPlayer';
import Container from '../container/Container';
import Footer from './Footer';
import Header from '../Header';
import UseReactQuery from '../../Custom_Hook/useReactQuery.js';
import AllComment from './AllComment';
import CommentForm from './CommentForm';
import ErrorPage from '../ErrorPage.jsx';
import LoaderPage from '../LoadingPage.jsx';

function Video() {
  const [isOwner, setIsOwner] = useState(false);
  const [curUser, setCurUser] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const videoObj = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/videos/home-videos`, 'GET');
  const location = useLocation();
  const videoId = location.state;
  const videoInfo = UseReactQuery(`${import.meta.env.VITE_API_URL}/api/v1/videos/c/${videoId}`, 'GET');
  const userId = videoInfo?.response?.owner?._id;
  const [videoData, setVideoData] = useState(null);
  const token = useSelector(state => state.accessTokenSlice.token);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleClick = (videoId) => {
    navigate(`/v/${videoId}`, { state: videoId });
  };

  const onAddComment = useCallback(async (commentContent) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/comments/d/${videoId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentContent }),
      });

      if (!response.ok) {
        console.log('Something went wrong while adding a comment');
      } else {
        fetchComments();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [videoId, token]);

  const fetchVideoData = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/videos/c/${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Server response is not ok');
      }

      const jsonResponse = await response.json();
      setVideoData(jsonResponse.data);
    } catch (error) {
      console.log(error);
    }
  }, [videoId, token]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/comments/d/${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Server response is not ok');
      }

      const jsonResponse = await response.json();
      setComments(jsonResponse.data);
    } catch (error) {
      console.log(error);
    }
  }, [videoId, token]);

  useEffect(() => {
    fetchVideoData();
    fetchComments();
  }, [fetchVideoData, fetchComments]);

  useEffect(() => {
    (async () => {
      try {
        if (userId) {
          let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscriptions/s/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setSubscribed(data.data);
          } else {
            console.error('Failed to fetch subscription status');
          }

          response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/current-user`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setCurUser(data?.data?._id);
            if (curUser === userId) {
              setIsOwner(true);
            }
          } else {
            console.error('Failed to fetch current user');
          }
        }
      } catch (error) {
        console.error('Error fetching subscription status:', error);
      }
    })();
  }, [userId, token, curUser]);

  useEffect(() => {
    if (userId && curUser) {
      if (userId === curUser) {
        setIsOwner(true);
      }
    }
  }, [curUser, userId]);

  const handleSubscribeButton = async () => {
    let response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscriptions/c/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      let response2 = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/subscriptions/c/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response2.ok) {
        const data = await response2.json();
        setSubscribed(data.data);
      } else {
        console.error('Failed to fetch subscription status');
      }
    }
  };

  return (
    <Container>
      <div className='flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700'>
        <Header />
      </div>
      <div className="w-full h-screen flex flex-wrap justify-center items-start p-4 bg-gray-900 text-white">
        <div className='w-full md:w-2/3 overflow-y-auto shadow-2xl rounded-lg bg-gray-800 p-6'>
          {videoData && (
            <div className="bg-gray-200 rounded-lg p-4 mb-4">
              <VideoPlayer videoFile={videoData?.videoFile} />
            </div>
          )}

          {videoData && (
            <Footer
              isOwner={isOwner}
              videoData={videoData}
              subscribed={subscribed}
              handleSubscribeButton={handleSubscribeButton}
            />
          )}

          <div className='w-full px-2 py-4 rounded-lg'>
            <p>{videoData?.description}</p>
          </div>

          {/* Comments Section */}
          <div className='p-3 mt-2 flex flex-wrap flex-col gap-4'>
            <CommentForm onAddComment={onAddComment} comments={comments} />
            {comments?.map((comment) => (
              <div key={comment._id}>
                <AllComment comment={comment} />
              </div>
            ))}
          </div>
        </div>

        <div className='w-full md:w-1/3 overflow-y-auto max-h-[100vh]'>
          {videoObj.error && <ErrorPage />}
          {videoObj.loading && <LoaderPage />}
          {!videoObj.error && !videoObj.loading && videoObj.response.map((video) => (
            <div
              key={video._id}
              onClick={() => handleClick(video._id)}
              className='p-3 flex flex-row gap-3 items-center bg-gray-800 m-2 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200'
            >
              <img className='h-20 w-32 rounded-md' src={video.thumbnail} alt={video.title} />
              <div className="flex flex-col">
                <h1 className='text-xl font-semibold'>{video.title}</h1>
                <h2 className='text-sm text-gray-400'>{video.fullName}</h2>
                <p className='text-sm text-gray-500'>{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Video;
