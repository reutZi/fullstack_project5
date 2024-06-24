import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import Search from './Search';
import { AddIcon, DeleteIcon, EditIcon, CommentIcon} from './Icons';
import '../styles.css';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';



const PostContent = () => {
    //const [comments, setComments] = useState([]);
    //const [commentsOpen, setCommentsOpen] = useState(false);
    //const user = useUser();
    const navigate = useNavigate();
    


    const location = useLocation();
    const  selectedPost = location.state.post;

    const handleClose = () => {
       navigate('/posts')
    };






    return (
        <div>
        <button className="button" onClick={handleClose}>Back</button>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <Comments postId={selectedPost.id}/>
            {/* <button className="button" onClick={handleAddComment}>
                <CommentIcon />
                Add Comment
            </button>
            {!commentsOpen&&<h3 onClick={viewComments} style={{ cursor: 'pointer', marginTop: '20px' }}>View Comments</h3>}
            {commentsOpen && <Comments comments={comments} setCommentsOpen={setCommentsOpen}/>} */}
        </div>

    );
};

export default PostContent;
