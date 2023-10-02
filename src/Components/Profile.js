import Blogs from './Blogs';
import useCurrentUser from '../useCurrentUser';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {

    const [currentUsername, setCurrentUsername] = useState('');

    const currentUser = useCurrentUser();
    
    const [ about, setAbout ] = useState('');
    const [user, setUser] = useState({});
    const [isEdit, setIsEdit] = useState(false);

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
        setIsEdit(false);
    }

    const handleEdit = () => {
        console.log('set is edit to true')
        setIsEdit(true);
    }

    if (!currentUser) {
        return <p>Loading...</p>;
    }
    return ( 
        <div>
            <div className='row'>
                <div className='col-sm-7'>
                    <h2>Welcome {currentUser?.username}</h2>
                    <Link to={'/create'}><h3 className='mt-4'>Start a new blog</h3></Link>
                    <Blogs user={currentUser}/>
                </div>
                <div className=' col-sm-5 categories-box'>
                    <h3>About me:</h3>
                    <form style={{margin: '20px 0'}} onSubmit={handleAboutSubmit}>
                        {isEdit && (
                            <div>
                                <textarea className="form-control" required name="description-text" id="body-text" cols="30" rows="5" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                                <br />
                                <button className='' type="submit" >Save</button>
                                <button disabled className='about-edit-btn  disabled'>Edit</button>
                            </div>
                        )}
                        {!isEdit && (
                            <div>
                                <textarea className="form-control" required name="description-text" id="body-text" cols="30" rows="5" value={about} disabled onChange={(e) => setAbout(e.target.value)}></textarea>
                                <br />
                                <button disabled className='disabled' >Save</button>
                                <button className='about-edit-btn' onClick={handleEdit}>Edit</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Profile;