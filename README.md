
# MegaBlog - A Modern Blogging Platform

MegaBlog is a full-featured blogging platform built with React, Vite, and Appwrite. It provides a beautiful, responsive interface for creating, managing, and sharing blog posts with rich text editing and image support.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality
- **Rich Text Editing**: Create beautiful posts with the TinyMCE editor
- **Image Support**: Upload and embed images in your posts
- **Responsive Design**: Looks great on all devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations
- **Post Management**: Create, edit, and delete your own posts
- **Public Viewing**: Anyone can read published posts
- **Real-time Updates**: See your changes immediately

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TailwindCSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Backend**: Appwrite (Authentication, Database, Storage)
- **Rich Text Editor**: TinyMCE
- **Deployment**: Ready for cloud deployment

## 📁 Project Structure

```
src/
├── appwrite/           # Appwrite service configuration
├── components/         # Reusable UI components
├── conf/               # Configuration files
├── pages/              # Page components
├── store/              # Redux store and slices
└── ...
```

## ⚙️ Environment Variables

The project uses Appwrite for backend services. Configuration is stored in `src/conf/conf.js`:

- Appwrite Endpoint
- Project ID
- Database ID
- Collection ID
- Storage Bucket ID

## ▶️ Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser

## 📤 Deployment

Build the project for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔧 Appwrite Setup

For detailed instructions on configuring Appwrite for image uploads and proper permissions, see [APPWRITE_SETUP.md](APPWRITE_SETUP.md).

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.



