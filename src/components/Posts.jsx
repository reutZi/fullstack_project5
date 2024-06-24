import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import Search from './Search';
import { AddIcon, DeleteIcon, EditIcon, CommentIcon } from './Icons';
import '../styles.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const user = useUser();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
            setPosts(response.data);
        };
        fetchPosts();
        setIsLoading(false);
    }, []);

    const handleSelect = async (post) => {
        setSelectedPost(post);
        // const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
        // setComments(response.data);
        // setCommentsOpen(false);
    };

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

    const handleAddComment = async () => {
        const body = prompt('Enter comment');
        if (body) {
            const response = await axios.post('http://localhost:5000/comments', { body, postId: selectedPost.id, name: user.username, email: user.email, userID: user.id});
            setComments([...comments, response.data]);
        }
    };

    const viewComments = () => { setCommentsOpen(!commentsOpen) };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Posts</h1>
                <div className="flex-container">
                    <Search features={[["title", "Title"], ["id", "Post Number"]]} list={posts} setFilteredList={setFilteredPosts} />
                    <button className="button" onClick={handleAdd}>
                        <AddIcon />
                        Add Post
                    </button>
                </div>
            </div>
            <ul className="list">
                {filteredPosts.map(post => (
                    <li key={post.id} className="list-item" onClick={() => handleSelect(post)}>
                        <div>
                            <strong>{post.id +'. ' + post.title}</strong>
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
            {selectedPost && (
                <div>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.body}</p>
                    <button className="button" onClick={handleAddComment}>
                        <CommentIcon />
                        Add Comment
                    </button>
                    <h3 onClick={viewComments} style={{ cursor: 'pointer', marginTop: '20px' }}>
                        {commentsOpen ? "Comments:" : "View Comments"}
                    </h3>
                    {commentsOpen && (
                        <ul className="list">
                            {comments.map(com => (
                                <li key={com.id} className="list-item">
                                    <Comment comment={com} comments={comments} setComments={setComments} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default Posts;
