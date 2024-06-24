// src/App.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Posts from "./components/Posts";
import Albums from "./components/Albums";
import Info from "./components/Info";
import PrivateRoute from "./components/PrivateRoute";
import PhotosPage from "./components/PhotosPage";
import PostsPageA from "./components/PostsPageA";
import PostContent from "./components/PostContent";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />
        <Route
          path="/albums/:albumId/photos"
          element={
            <PrivateRoute>
              <PhotosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <PostsPageA />
            </PrivateRoute>
          }
        />
        <Route
          path="/posts/:postId/postContent"
          element={
            <PrivateRoute>
              <PostContent />
            </PrivateRoute>
          }
        />
        <Route
          path="/albums"
          element={
            <PrivateRoute>
              <Albums />
            </PrivateRoute>
          }
        />
        <Route
          path="/info"
          element={
            <PrivateRoute>
              <Info />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
