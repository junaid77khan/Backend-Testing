import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Upload() {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [upload, setUpload] = useState({
        title: '',
        description: '',
        videoFile: null,
        thumbnail: null,
    });
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        setUpload((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));

        if (name === 'thumbnail' && files) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => setThumbnailPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const token = useSelector((state) => state.accessTokenSlice.token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        Object.entries(upload).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/v1/videos/upload-video`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    mode: 'cors',
                    credentials: 'include',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Video not uploaded!');
            }

            navigate('/profile');
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <Header />
            {uploading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-75 flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500"></div>
                </div>
            )}
            <div className="w-full max-w-xl mt-12 px-8 py-6 bg-gray-900 shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-amber-400">
                    Upload Your Video
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="title" className="text-sm text-gray-400">
                            Video Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={upload.title}
                            onChange={handleInput}
                            placeholder="Enter a catchy title"
                            className="px-4 py-3 bg-gray-800 text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="flex flex-col space-y-2">
                        <label
                            htmlFor="description"
                            className="text-sm text-gray-400"
                        >
                            Video Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={upload.description}
                            onChange={handleInput}
                            placeholder="Describe your video content"
                            rows="4"
                            className="px-4 py-3 bg-gray-800 text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        ></textarea>
                    </div>

                    {/* Video File Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="videoFile" className="text-sm text-gray-400">
                            Upload Video
                        </label>
                        <input
                            id="videoFile"
                            name="videoFile"
                            type="file"
                            onChange={handleInput}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    {/* Thumbnail File Input */}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="thumbnail" className="text-sm text-gray-400">
                            Upload Thumbnail
                        </label>
                        <input
                            id="thumbnail"
                            name="thumbnail"
                            type="file"
                            onChange={handleInput}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        {thumbnailPreview && (
                            <img
                                src={thumbnailPreview}
                                alt="Thumbnail Preview"
                                className="mt-4 rounded-md shadow-md border border-gray-600"
                            />
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-md shadow-lg transition duration-300"
                    >
                        {uploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Upload;
