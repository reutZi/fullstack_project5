import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import Search from './Search';
import { AddIcon, DeleteIcon, EditIcon, CommentIcon } from './Icons';
import { useNavigate } from 'react-router-dom';

import '../styles.css';

const PostsList = ({selectedPost, setSelectedPost, posts, setPosts, filteredPosts}) => {
    //const [posts, setPosts] = useState([]);
    //const [selectedPost, setSelectedPost] = useState(null);
    //const [comments, setComments] = useState([]);
    //const [filteredPosts, setFilteredPosts] = useState([]);
    const user = useUser();
    const navigate = useNavigate();


    const handleSelect = (post) => {
        navigate(`/posts/${post.id}/postContent`, { state: { post: post} });
    };



    // const handleSelect = async (post) => {
    //     setSelectedPost(post);
    //     // const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
    //     // setComments(response.data);
    //     // setCommentsOpen(false);
    // };

    const handleAdd = async () => {
        const title = prompt('Enter post title');
        const body = prompt('Enter post body');
        if (title && body) {
            const response = await axios.post('http://localhost:5000/posts', { title, body, userId: user.id });
            setPosts([...posts, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new post title', posts.find(post => post.id === id).title);
        const body = prompt('Enter new post body', posts.find(post => post.id === id).body);
        if (title && body) {
            const response = await axios.put(`http://localhost:5000/posts/${id}`, { ...posts.find(post => post.id === id), title, body });
            setPosts(posts.map(post => (post.id === id ? response.data : post)));
        }
    };



    return (
        <div className="container">

            <ul className="list">
                <button className="button" onClick={handleAdd}>
                    <AddIcon />
                    Add Post
                </button>
                {filteredPosts.map(post => (
                    <li key={post.id} className="list-item" >
                        <div onClick={() => handleSelect(post)}>
                            <strong>{post.id + '. ' + post.title}</strong>
                        </div>
                        <div>
                            <button className="icon-button" onClick={() => handleUpdate(post.id)}>
                                <EditIcon />
                            </button>
                            <button className="icon-button" onClick={() => handleDelete(post.id)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;
