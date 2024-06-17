// src/components/Posts.js
import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Comment from './Comment';
import { useForm } from 'react-hook-form';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [search, setSearch] = useState('');
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState('title');

    const { user } = useContext(AuthContext);



    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    const handleSelect = async (post) => {
        setSelectedPost(post);
        const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
        setComments(response.data);
        setCommentsOpen(false);
    };

    const handleAdd = async () => {
        const title = prompt('Enter post title');
        const body = prompt('Enter post body');
        if (title && body) {
            const response = await axios.post('http://localhost:5000/posts', { title, body, userId: user.id });
            setPosts([...posts, response.data]);
        }
    };

  const handleDeletePost = async (id) => {
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
            const response = await axios.post('http://localhost:5000/comments', { body, postId: selectedPost.id, name: user.username, email: user.email });
            setComments([...comments, response.data]);
        }
    };



    const viewComments = () => { setCommentsOpen(!commentsOpen) };

    const filteredPosts = posts.filter(post => search==='' || searchCriteria==="title"?  post.title.includes(search): post.id===search);

    return (
        <div>
            <h1>Posts</h1>
            <div>
                <button onClick={handleAdd}>Add Post</button>
                {/* <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts" /> */}
            </div>
            <div>
            <label>Search By:</label>

                <select onChange={(e) => setSearchCriteria(e.target.value)}>
                    {/* <option value="">Search by</option> */}
                    <option value="title">Title</option>
                    <option value="id">Post Number</option>
                </select>
                <input
                    type="text"
                    placeholder="Search term"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {/* <button onClick={handleSearch}>Search</button> */}
            </div>
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id} onClick={() => handleSelect(post)}>
                        <label>{post.id} </label>{post.title}

                        <button onClick={() => handleUpdate(post.id)}>Update</button>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {selectedPost && (
                <div>
                    <h2>{selectedPost.title}</h2>
                    <p>{selectedPost.body}</p>
                    <h3 onClick={viewComments}>{commentsOpen ? "Comments:" : "View Comments"}</h3>
                    {commentsOpen && <ul>
                        {comments.map(com => (
                            <li key={com.id}><Comment comment={com} comments={comments} setComments={setComments}/></li>
                        ))}
                    </ul>}
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
            )}
        </div>
    );
};

export default Posts;
