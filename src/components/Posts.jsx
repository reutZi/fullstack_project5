// src/components/Posts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const handleSelect = async (post) => {
        setSelectedPost(post);
        const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
        setComments(response.data);
    };

    const handleAdd = async () => {
        const title = prompt('Enter post title');
        const body = prompt('Enter post body');
        if (title && body) {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.post('http://localhost:5000/posts', { title, body, userId: user.id });
            setPosts([...posts, response.data]);
        }
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/posts/${id}`);
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new post title');
        const body = prompt('Enter new post body');
        if (title && body) {
            const response = await axios.put(`http://localhost:5000/posts/${id}`, { ...posts.find(post => post.id === id), title, body });
            setPosts(posts.map(post => (post.id === id ? response.data : post)));
        }
    };

    const handleAddComment = async () => {
        const body = prompt('Enter comment');
        if (body) {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.post('http://localhost:5000/comments', { body, postId: selectedPost.id, name: user.username, email: user.email });
            setComments([...comments, response.data]);
        }
    };

    const handleDeleteComment = async (id) => {
        await axios.delete(`http://localhost:5000/comments/${id}`);
        setComments(comments.filter(comment => comment.id !== id));
    };

    const handleUpdateComment = async (id) => {
        const body = prompt('Enter new comment body');
        if (body) {
            const response = await axios.put(`http://localhost:5000/comments/${id}`, { ...comments.find(comment => comment.id === id), body });
            setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
        }
    };

    const filteredPosts = posts.filter(post => post.title.includes(search));

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <button onClick={handleAdd}>Add Post</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts" />
            </div>
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id} onClick={() => handleSelect(post)}>
                        {post.title}
                        <button onClick={() => handleUpdate(post.id)}>Update</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedPost && (
                <div>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.body}</p>
                    <h3>Comments</h3>
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id}>
                                {comment.body}
                                <button onClick={() => handleUpdateComment(comment.id)}>Update</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
            )}
        </div>
    );
};

export default Posts;
