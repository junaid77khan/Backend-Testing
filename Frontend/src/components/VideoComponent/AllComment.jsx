import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function AllComment({ comment }) {
    const [user, setUser] = useState(null);
    const token = useSelector(state => state.accessTokenSlice.token);
    const [boolLike, setBoolLike] = useState(null);
    const [boolDisLike, setBoolDisLike] = useState(null);

    const fetchUser = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/user-by-id`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({ _id: comment?.owner })
            });

            if (!response) {
                throw new Error("Something went wrong while adding a comment");
            }

            const jsonResponse = await response.json();
            setUser(jsonResponse);
        } catch (error) {
            console.error(error);
        }
    }, [comment?.owner, token]);

    const fetchLikeData = useCallback(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/likes/boolComment/b/${comment?._id}`, {
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
    }, [comment?._id, token]);

    const fetchDisLikeData = useCallback(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dislikes/dislikecommentbool/b/${comment?._id}`, {
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
    }, [comment?._id, token]);

    const toggleLike = useCallback(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/likes/toggle/c/${comment?._id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!res.ok) {
            throw new Error("Something went wrong while fetching comment toggle");
        }
        const jsonRes = await res.json();
        setBoolLike(jsonRes.data);
    }, [comment?._id, token]);

    const toggleDisLike = useCallback(async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dislikes/toggle/c/${comment?._id}`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (!res.ok) {
            throw new Error("Something went wrong while fetching dislike toggle");
        }
        const jsonRes = await res.json();
        setBoolDisLike(jsonRes.data);
    }, [comment?._id, token]);

    const handleToggleLike = () => {
        if ((boolDisLike === boolLike) || boolLike) {
            toggleLike();
        } else {
            toggleLike();
            toggleDisLike();
        }
    };

    const handleToggleDislike = () => {
        if ((boolDisLike === boolLike) || boolDisLike) {
            toggleDisLike();
        } else {
            toggleLike();
            toggleDisLike();
        }
    };

    useEffect(() => {
        fetchLikeData();
        fetchDisLikeData();
    }, [fetchLikeData, fetchDisLikeData]);

    useEffect(() => {
        fetchUser();
    }, [comment, fetchUser]);

    return (
        <div className="flex flex-wrap justify-start w-full items-start gap-2 p-1 md:p-2 bg-gray-900"> {/* Dark background */}
            <div className="w-full max-w-3xl mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex flex-wrap justify-start items-start gap-4 p-2 bg-gray-700 rounded-lg">
                    <img className="w-12 h-12 rounded-full" src={user?.data?.avatar} alt="Profile" />
                    <div className="flex-1">
                        <h1 className="text-lg text-orange-400">{user?.data?.username}</h1>
                        <p className="text-white text-sm">{comment?.content}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div onClick={handleToggleLike} className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-600">
                            <FontAwesomeIcon style={{ color: boolLike ? 'orange' : 'gray' }} icon={faThumbsUp} />
                            <span className="text-white">{boolLike ? 'Liked' : 'Like'}</span>
                        </div>
                        <div onClick={handleToggleDislike} className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-600">
                            <FontAwesomeIcon style={{ color: boolDisLike ? 'orange' : 'gray' }} flip="horizontal" icon={faThumbsDown} />
                            <span className="text-white">{boolDisLike ? 'Disliked' : 'Dislike'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllComment;
