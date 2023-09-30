import Blogs from './Blogs';
import useCurrentUser from '../useCurrentUser';

const Profile = () => {

    const currentUser = useCurrentUser();

    if (!currentUser) {
        return <p>Loading...</p>;
    }
    return ( 
        <div>
            <h2>Welcome {currentUser?.username}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
            <h3>My Blogs:</h3>
            <Blogs user={currentUser} />
        </div>
    );
}
 
export default Profile;