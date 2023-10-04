import { useNavigate, Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Navbar = () => {
    const navigate = useNavigate();
    const { route, signOut } = useAuthenticator((context) => [
        context.route,
        context.signOut,
      ]);

    const logOut = () => {
        signOut();
        navigate('/');
    }

    return ( 
        <nav className="navbar">
            <Link to={'/'} style={{margin: 0, padding: 0}}><h1>Blogtown</h1></Link> 
            <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            {route !== 'authenticated' ? (
                <button onClick={() => navigate('/login')}>Login|Signup</button>
                ) : (
                <div className="signedInLinks">
                    <Link to='/profile'>My Profile</Link>
                    <button onClick={() => logOut()}>Logout</button>
                </div>
                )}
            </div>
        </nav>
    );
}
 
export default Navbar;