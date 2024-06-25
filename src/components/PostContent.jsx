import { useLocation } from 'react-router-dom';
import { useUser } from '../contexts/AuthContext';
import '../styles.css';
import Comments from './Comments';
import { useNavigate } from 'react-router-dom';


const PostContent = () => {

    const user = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const  selectedPost = location.state.post;

    const handleClose = () => {
       navigate(`/users/${user.id}/posts`)
    };

    return (
        <div>
        <button className="button" style={{ marginTop: '20px' }} onClick={handleClose}>Back</button>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <Comments postId={selectedPost.id}/>
        </div>

    );
};

export default PostContent;
