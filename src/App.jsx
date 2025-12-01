import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header, AuthLayout } from './components'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import AllPostsPage from './pages/AllPost'
import AddPostPage from './pages/AddPost'
import EditPostPage from './pages/EditPost'
import PostPage from './pages/Post'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .catch((error) => {
      // Silently handle expected 401 errors when no session exists
      if (error.code !== 401) {
        console.error("Error getting current user:", error);
      }
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <AuthLayout authentication={false}>
                  <LoginPage />
                </AuthLayout>
              }
            />

            <Route
              path="/signup"
              element={
                <AuthLayout authentication={false}>
                  <SignupPage />
                </AuthLayout>
              }
            />

            <Route
              path="/all-posts"
              element={
                <AuthLayout authentication>
                  <AllPostsPage />
                </AuthLayout>
              }
            />

            <Route
              path="/add-post"
              element={
                <AuthLayout authentication>
                  <AddPostPage />
                </AuthLayout>
              }
            />

            <Route
              path="/edit-post/:slug"
              element={
                <AuthLayout authentication>
                  <EditPostPage />
                </AuthLayout>
              }
            />

            <Route path="/post/:slug" element={<PostPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App