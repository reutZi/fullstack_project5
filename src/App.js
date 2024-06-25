import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";
import Todos from "./components/Todos";
import Albums from "./components/Albums";
import Info from "./components/Info";
import PrivateRoute from "./components/PrivateRoute";
import PhotosPage from "./components/PhotosPage";
import NavBar from "./components/NavBar";
import PostContent from "./components/PostContent";
import PostsPageA from "./components/PostsPageA";

const App = () => {
  const location = useLocation();

  // List of paths where the NavBar should not be displayed
  const noNavBarPaths = ["/login", "/register", "/userdetails", "/"];

  return (
    <AuthProvider>
      {!noNavBarPaths.includes(location.pathname) && <NavBar />}  
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userdetails" element={<UserDetails />} />

        <Route
          path="/users/:userId/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId/todos"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId/albums/:albumId/photos"
          element={
            <PrivateRoute>
              <PhotosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId/posts"
          element={
            <PrivateRoute>
              <PostsPageA />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:userId/posts/:postId/postContent"
          element={
            <PrivateRoute>
              <PostContent />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId/albums"
          element={
            <PrivateRoute>
              <Albums />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:userId/info"
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
