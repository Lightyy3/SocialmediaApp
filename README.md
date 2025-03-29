Deployment Link: https://yc-s42s.vercel.app/

![React](https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB&color=000000)
![Appwrite](https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logo=appwrite&logoColor=FFFFFF&color=3A7BFB)
![React Query](https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logo=reactquery&logoColor=FF4154&color=FF4154)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&color=000000)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6)

## Overview

Threadr is a social media app, designed or both ease of use and aesthetic appeal. Effortlessly create and browse posts, while benefiting from a robust authentication system and efficient data fetching powered by React Query, ensuring a smooth and responsive user experience.

## Tech Stack

- **React 19**
- **Appwrite**
- **React Query**
- **TailwindCSS** (UI Styling)
- **ShadCN** (UI Components)
- **TypeScript** (Type Safety)

## Features

- **Authentication System**: A secure and reliable authentication framework that ensures user privacy and data protection.
- **Explore Page**: The homepage provides users with an engaging space to explore posts, featuring a dedicated section for top creators and trending content.
- **Like and Save Functionality**: Users can easily like and save posts, with dedicated pages for managing liked and saved content for quick access.
- **Detailed Post Page**: Each post has its own detailed page, showcasing comprehensive content along with related posts to create an immersive browsing experience.
- **Profile Page**: A personalized user profile page that displays liked posts and offers options to edit and manage personal details.
- **Browse Other Users**: Users can explore and discover other profiles, enabling interaction with a broader community.
- **Create Post Page**: A user-friendly interface that allows effortless post creation, featuring intuitive file management, storage, and a drag-and-drop feature.
- **Edit Post Functionality**: Provides users the flexibility to edit their posts at any time, ensuring easy content management.
- **Responsive UI**: A mobile-responsive user interface that includes a bottom navigation bar, ensuring seamless usability across devices.
- **React Query Integration**: Leveraging React Query (Tanstack Query) for efficient data fetching, including auto-caching, parallel queries for optimized performance, and robust mutation handling.
- **Backend as a Service (BaaS)** - Appwrite: Utilizing Appwrite as a comprehensive Backend as a Service solution, providing essential backend services such as authentication, database management, file storage, and more.

## Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
VITE_APPWRITE_URL=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_STORAGE_ID=
VITE_APPWRITE_USER_COLLECTION_ID=
VITE_APPWRITE_POST_COLLECTION_ID=
VITE_APPWRITE_SAVES_COLLECTION_ID=
```
  

  **Running the Project**

```bash
npm run dev
```

  <p class="text-lg text-gray-700">Open <a href="http://localhost:3000" class="text-blue-600">http://localhost:3000</a> in your browser to view the project.</p>
