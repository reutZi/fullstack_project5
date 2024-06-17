import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('');
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:5000/posts?userId=${user.id}`);
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post('http://localhost:5000/posts', { ...newPost, userId: user.id });
    setPosts([...posts, response.data]);
    setNewPost({ title: '', body: '' });
  };

  const handleDeletePost = async (id) => {
    await axios.delete(`http://localhost:5000/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  };

  const handleUpdatePost = async (id, updatedPost) => {
    const response = await axios.put(`http://localhost:5000/posts/${id}`, updatedPost);
    setPosts(posts.map(post => (post.id === id ? response.data : post)));
  };

  const handleSelectPost = async (post) => {
    setSelectedPost(post);
    const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
    setComments(response.data);
  };

  const handleAddComment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.post('http://localhost:5000/comments', {
      postId: selectedPost.id,
      name: user.name,
      email: user.email,
      body: newComment
    });
    setComments([...comments, response.data]);
    setNewComment('');
  };

  const handleDeleteComment = async (id) => {
    await axios.delete(`http://localhost:5000/comments/${id}`);
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleUpdateComment = async (id, updatedComment) => {
    const response = await axios.put(`http://localhost:5000/comments/${id}`, updatedComment);
    setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
  };

  const filteredPosts = posts.filter(post => 
    post.title.includes(filter) || 
    post.id.toString() === filter
  );

  return (
    <div>
      <h1>Posts</h1>
      <input 
        type="text" 
        placeholder="Filter posts..." 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      <div>
        <input 
          type="text" 
          placeholder="Title" 
          value={newPost.title} 
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} 
        />
        <textarea 
          placeholder="Body" 
          value={newPost.body} 
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} 
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <ul>
        {filteredPosts.map(post => (
          <li key={post.id} onClick={() => handleSelectPost(post)}>
            <span>{post.title}</span>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            <button onClick={() => handleUpdatePost(post.id, { ...post, title: 'Updated Title' })}>Update</button>
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
                <p>{comment.body}</p>
                <p>By: {comment.name}</p>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                <button onClick={() => handleUpdateComment(comment.id, { ...comment, body: 'Updated Comment' })}>Update</button>
              </li>
            ))}
          </ul>
          <textarea 
            placeholder="Add a comment..." 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      )}
    </div>
  );
};

export default Posts;
