import axios from 'axios';
import { useUser } from '../contexts/AuthContext';
import { AddIcon, DeleteIcon, EditIcon} from './Icons';
import { useNavigate } from 'react-router-dom';

import '../styles.css';

const PostsList = ({posts, setPosts, filteredPosts}) => {

    const API_URL = 'http://localhost:5000/posts';
    const user = useUser();
    const navigate = useNavigate();
    const handleSelect = (post) => {

        navigate(`/users/${user.id}/posts/${post.id}/postContent`, { state: { post: post} });
    };


    const handleAdd = async () => {
        const title = prompt('Enter post title');
        const body = prompt('Enter post body');
        if (title && body) {
            try{
                const response = await axios.post(API_URL, { title, body, userId: user.id });
                setPosts([...posts, response.data]);
            }
            catch (error) {
                console.error('Error adding post:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try{
            const response = await axios.get(`http://localhost:5000/comments?postId=${id}`);
            const commentsToDelete = response.data;
            if(commentsToDelete.length > 0){
                const deletePromises = commentsToDelete.map(comment => {
                    return axios.delete(`http://localhost:5000/comments/${comment.id}`);
                });
                Promise.all(deletePromises)
                    .then(() => {
                        console.log('All comments from post 98 have been deleted.');
                    })
                    .catch(error => {
                        console.error('An error occurred while deleting the comments:', error);
                    });
        }
    } catch (error) {
        console.error('Error deleting comments:', error);
    }  
        await axios.delete(`http://localhost:5000/posts/${id}`);  
        setPosts(posts.filter(post => post.id !== id));
    };

    const handleUpdate = async (id) => {
        const title = prompt('Enter new post title', posts.find(post => post.id === id).title);
        const body = prompt('Enter new post body', posts.find(post => post.id === id).body);
        if (title && body) {
            try{
                const response = await axios.put(`http://localhost:5000/posts/${id}`, { ...posts.find(post => post.id === id), title, body });
            setPosts(posts.map(post => (post.id === id ? response.data : post)));
            }
            catch (error) {
                console.error('Error updating post:', error);
            }
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
