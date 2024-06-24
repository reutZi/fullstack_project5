import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import Search from './Search';
import { AddIcon, DeleteIcon, EditIcon, CommentIcon } from './Icons';
import '../styles.css';
import Posts from './Posts';
import PostsList from './PostsList';
import PostContent from './PostContent';


const PostsPageA = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useUser();
    //const [comments, setComments] = useState([]);
    // const [commentsOpen, setCommentsOpen] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState([]);
    // const user = useUser();


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
            setPosts(response.data);
        };
        fetchPosts();
        setIsLoading(false);
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Posts</h1>
                <div className="flex-container">
                    <Search features={[["title", "Title"], ["id", "Post Number"]]} list={posts} setFilteredList={setFilteredPosts} />
                </div>
            </div>
            <PostsList selectedPost={selectedPost} setSelectedPost={setSelectedPost} posts={posts} setPosts={setPosts} filteredPosts={filteredPosts}/>
            {/* {selectedPost &&<PostContent selectedPost={selectedPost}/>} */}

        </div>
    );
};

export default PostsPageA;
