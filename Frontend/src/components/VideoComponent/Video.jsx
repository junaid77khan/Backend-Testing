import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoPlayer from '../VideoPlayer';
import Container from '../container/Container';
import Footer from './Footer';
import Header from '../Header'
import AllComment from './AllComment';
import CommentForm from './CommentForm'

function Video() {
    const location = useLocation();
    const videoId = location.state;
    const [videoData, setVideoData] = useState(null);
    const token = useSelector(state => state.accessTokenSlice.token);
    const[comments, setComments] = useState([])

    const onAddComment = useCallback(async (commentContent) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/comments/d/${videoId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: commentContent })
            });

            if (!response.ok) {
                console.log("Something went wrong while adding a comment")
            } else {
                // Fetch the updated comments from the server after adding a new comment
                fetchComments();
            }
        } catch (error) {
            throw new Error(error)
        }
    }, [videoId, token]);

    const fetchVideoData = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/videos/c/${videoId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Server response is not ok");
            }

            const jsonResponse = await response.json();
            setVideoData(jsonResponse.data);
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong while fetching video from server");
        }
    }, [videoId, token]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/comments/d/${videoId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error("Server response is not ok");
            }

            const jsonResponse = await response.json();
            setComments(jsonResponse.data);
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong while fetching video from server");
        }
    }, [videoId, token]);

    useEffect(() => {
        fetchVideoData();
        fetchComments();
    }, [fetchVideoData, fetchComments]);
    return (
        <Container>
            <div className='flex flex-col items-center'>
                <Header />
            </div>
            <div className="w-full h-screen flex flex-wrap justify-centee items-between p-3 shadow-lg">
                <div className='w-1/2 overflow-y-auto scrollbar-none max-h-[100vh] shadow-2xl rounded-lg' >
                    
                    {/* Video player */}
                    {
                        videoData &&
                        <div className="w-full bg-gray-200 rounded-lg p-4">
                            <VideoPlayer videoFile={videoData?.videoFile} />
                        </div>
                    }

                    {/* Video data */}
                    {videoData && 
                        <div>
                            <Footer videoData={videoData} />
                        </div>
                    }

                    {/* Description */}
                    <div className='bg-gray-100 w-full px-2 py-4 rounded-lg'>
                       {videoData?.description}
                    </div>

                    {/* Comments */}
                    <div className='p-3 mt-2 flex flex-wrap flex-col gap-4'>
                        <CommentForm onAddComment={onAddComment} comments={comments} />
                        {
                            comments?.map((comment) => (
                                <div key={comment._id}> <AllComment comment={comment} /> </div>
                            ))
                        }
                    </div>
                </div>
                <div className=' overflow-y-auto max-h-[100vh] bg-red-500 w-1/2'>
                    
                </div>
            </div>
        </Container>
    );
}

export default Video;
