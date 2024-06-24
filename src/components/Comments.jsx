import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import Comment from './Comment';
import Search from './Search';
//import {CloseIcon} from './Icons';
import { AddIcon, DeleteIcon, EditIcon, CommentIcon} from './Icons';

import '../styles.css';

const Comments = ({postId}) => {

    const [comments, setComments] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const user = useUser();

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:5000/comments?postId=${postId}`);
            setComments(response.data);
        };
        fetchComments();
    }, []);

        // const response = await axios.get(`http://localhost:5000/comments?postId=${post.id}`);
        // setComments(response.data);
        // setCommentsOpen(false);


    const viewComments = () => { setCommentsOpen(true) };

    const handleClose = () => {
        setCommentsOpen(false);
        return null;
    }

    const handleAddComment = async () => {
        const body = prompt('Enter comment');
        if (body) {
            const response = await axios.post('http://localhost:5000/comments', { body, postId: postId, name: user.username, email: user.email, userID: user.id});
            setComments([...comments, response.data]);
        }
    };



    return (
        <div className="container">

            <button className="button" onClick={handleAddComment}>
                <CommentIcon />
                Add Comment
            </button>

            {!commentsOpen&&<h3 onClick={viewComments} style={{ cursor: 'pointer', marginTop: '20px' }}>View Comments</h3>}
            {commentsOpen &&
            <div>
            {/* <h3 onClick={handleClose} style={{ cursor: 'pointer', marginTop: '20px' }}>Hide Comments</h3> */}
            {comments==[]? <h3 onClick={handleClose}>No comments yet</h3> : <h3 onClick={handleClose} style={{ cursor: 'pointer', marginTop: '20px' }}>Comments:</h3>}
            <ul className="list">
                {comments.map(com => (
                    <li key={com.id} className="list-item">
                        <Comment comment={com} comments={comments} setComments={setComments} />
                    </li>
                ))}
            </ul>

            </div>}


            {/* {commentsOpen && <Comments comments={comments} setCommentsOpen={setCommentsOpen}/>} */}
{/*             

            <ul className="list">
                {comments.map(com => (
                    <li key={com.id} className="list-item">
                        <Comment comment={com} comments={comments} setComments={setComments} />
                    </li>
                ))}
            </ul> */}

        </div>
    );
};

export default Comments;
