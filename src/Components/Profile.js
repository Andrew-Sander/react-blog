import Blogs from './Blogs';
import useCurrentUser from '../useCurrentUser';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {

    const [currentUsername, setCurrentUsername] = useState('');

    const currentUser = useCurrentUser();
    
    const [ about, setAbout ] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        if(currentUser && currentUser.username) {
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`http://localhost:8000/api/users/username/${currentUsername}`);
            const json = await response.json();
            setUser(json);
        }
        if (currentUsername) {
            fetchUser();
        }
    }, [currentUsername]);

    useEffect(() => {
        if(user) {
            setAbout(user.about);
        }
    }, [user]);

    const handleAboutSubmit = (e) => {
        e.preventDefault();
        console.log(currentUsername);
        const userToPost = { name:currentUsername, about };

        fetch('http://localhost:8000/api/users/update', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToPost)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        }).then(() => {
            console.log('about updated');
        }).catch(error => {
            console.error(error);
            console.log(error);
        })
    }

    const handleEdit = () => {
        document.getElementById('save-btn').style.display='inline-block';
        document.getElementById('edit-btn').style.display='none';
        document.getElementById('about-text').disabled=false;
    }
    const handleSave = () => {
        document.getElementById('edit-btn').style.display='inline-block';
        document.getElementById('save-btn').style.display='none';
        document.getElementById('about-text').disabled=true;
    }

    if (!currentUser) {
        return <p>Loading...</p>;
    }
    return ( 
        <div className='profile-page'>
            <div className='about-box'>
                <div style={{borderBottom: '1px solid #45C4B0', padding:'10px 0'}}>
                    <h2 >{currentUser?.username}'s Profile</h2>
                </div>
                <form style={{margin: '20px 0'}} onSubmit={handleAboutSubmit}>
                    <h4 className='d-inline-block'>About me:</h4>
                    <textarea disabled className="form-control" required name="about-text" id="about-text" cols="30" rows="5" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                    <button type='button' id='edit-btn' onClick={handleEdit}>Edit</button>
                    <button style={{display:"none"}} id='save-btn' type="submit" onClick={handleSave}>Save</button>
                </form>
            </div>
            <div>
                <div className='profile-blogs'>
                    <h2>My Blogs:</h2>
                    <Link to={'/create'}><h3 style={{textDecoration:"underline"}} className='mt-1 d-inline-block'>Start a new blog</h3></Link>
                    <Blogs user={currentUser}/>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;