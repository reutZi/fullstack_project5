import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Search from './Search';
import '../styles.css';
import PostsList from './PostsList';

const PostsPageA = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useUser();
    const [filteredPosts, setFilteredPosts] = useState([]);
    const API_URL = 'http://localhost:5000/posts';

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user) return;
            const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
            setPosts(response.data);
        };
        try{
            fetchPosts();
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
        setIsLoading(false);
    }, [user]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Posts</h1>
                <div className="flex-container">
                    <Search features={[["title", "Title"], ["id", "Post Number"]]} list={posts} setFilteredList={setFilteredPosts} />
                </div>
            </div>
            <PostsList posts={posts} setPosts={setPosts} filteredPosts={filteredPosts}/>
        </div>
    );
};

export default PostsPageA;
