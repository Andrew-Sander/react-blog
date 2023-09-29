import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [blogPosts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setCurrentUser(user); 
            } catch (error) {
                console.error('Error fetching current user', error);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        if (currentUser && currentUser.username) {
            fetchData(currentUser.username);
        }
        console.log('useEffect ran')
    }, [currentUser]);

    const fetchData = async (username) => {
            const response = await fetch(`http://localhost:8000/api/blogPosts/me/${username}`);
            const json = await response.json();
            setPosts(json);
    }

    return ( 
        <div>
            <h2>Welcome {currentUser?.username}</h2>
            { blogPosts.map((blogPost) => (
                <div className="blog-preview" key={blogPost.postID}>
                <Link to={`/blogs/${blogPost.postID}`}>
                    <h2>{blogPost.title }</h2>
                    <p>{blogPost.body }</p>
                    <p>Written by { blogPost.author }</p>
                </Link>
                </div>
                ))}
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
        </div>
    );
}
 
export default Profile;