# Video Sharing Application  

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)  
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://videi-sharing-frontend.vercel.app/)  

## 🚀 About the Project  

This **Video Sharing Application** enables users to upload, delete, and manage videos seamlessly. Built using the **MERN stack**, the app incorporates secure **JWT-based authentication**, stores media using **Cloudinary**, and features a responsive frontend.  

🎉 **Achievements**  
- Fully implemented secure video management and sharing.  
- Leveraged **Cloudinary** for scalable image and video hosting.  
- Robust JWT authentication for protecting user data and sessions.  

---

## 🛠️ Features  

- **Upload & Manage Videos:** Users can upload videos, delete unwanted content, and manage their uploads easily.  
- **Secure Authentication:** Protect user data with JWT tokens for access and refresh mechanisms.  
- **Responsive Design:** Built with **React** and styled using **Tailwind CSS** for an engaging user interface.  
- **Backend Integration:** Built with **Express.js** and **MongoDB** for seamless data handling and processing.  

---

## 📷 Images 

![image](https://github.com/user-attachments/assets/130dc84e-b411-4a2d-bd4c-a9254289450f)

![image](https://github.com/user-attachments/assets/1bee1b96-262d-45de-aa92-36a10a0f04a8)

![image](https://github.com/user-attachments/assets/68ff59a9-af30-4a72-84a1-1bf7eb64c9a5)

![image](https://github.com/user-attachments/assets/9373e279-0294-4332-abc8-5f766b456f27)

![image](https://github.com/user-attachments/assets/577c5f66-5c7a-4b06-9131-0c296ec88dbb)

---

## 📋 Tech Stack  

### Frontend  
- **React** (with Vite for development)  
- **Tailwind CSS** for styling  
- **Redux Toolkit** for state management  
- **React Router DOM** for routing  
- **React Player** for video playback  

### Backend  
- **Node.js** with **Express**  
- **MongoDB** (with Mongoose ORM) for database management  
- **Cloudinary** for video and image storage  
- **JWT** for secure authentication  
- **Multer** for file uploads  

---

## 🌐 Live Demo  

Try the application here: [Video Sharing Application](https://videi-sharing-frontend.vercel.app/)  

---

## 📂 Project Structure  

### Frontend  

- Developed with **React**, using **Redux Toolkit** for state management and **Tailwind CSS** for styling.  
- Video playback powered by **React Player**.  
- Vite-powered development environment for fast builds and previews.  

### Backend  

- Built with **Node.js** and **Express** for RESTful API development.  
- Data storage and management powered by **MongoDB** with **Mongoose**.  
- Media files hosted using **Cloudinary**.  
- JWT-based authentication and secure session handling.  

---

## 🏗️ Installation and Running  

### Prerequisites  

- **Node.js** installed on your system.  
- **MongoDB** database connection string.  
- **Cloudinary** account for media hosting.  

### Clone the Repository  

```bash  
git clone https://github.com/username/video-sharing-app.git  
cd video-sharing-app  

cd backend  
npm install

PORT=5000
MONGODB_URI="your_mongodb_connection_string"
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

npm run dev

cd frontend  
npm install

VITE_API_URL=http://localhost:5000

npm run dev
```

## 📄 API Endpoints  

### Authentication  
- **POST** `/api/auth/login` - Log in a user.  
- **POST** `/api/auth/register` - Register a new user.  

### Video Management  
- **POST** `/api/videos` - Upload a new video.  
- **GET** `/api/videos` - Get all uploaded videos.  
- **DELETE** `/api/videos/:id` - Delete a specific video.  

---

## 🤝 Contributing  

Contributions, issues, and feature requests are welcome!  

---

## 📄 License  

This project is licensed under the **ISC License**.  

---

## 📞 Contact  

- **Author:** Junaid Khan  
- **GitHub:** junaid77khan(https://github.com/junaid77khan)  
