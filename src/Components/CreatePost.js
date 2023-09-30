import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../useCurrentUser";


const getDate = () => {
        const today = new Date();
        const month = today.getMonth()+1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${year}-${month}-${date}`;
}

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [date, setDate] = useState(getDate());
    const navigate = useNavigate();
    const currentUser = useCurrentUser();

    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState('');

    const [menuOpen, setMenuOpen] = useState(false);
    const [blogsLoaded, setBlogsLoaded] = useState(false);

    useEffect(() => {
        if(currentUser && currentUser.username) {
            setAuthor(currentUser.username)
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/blogs/me/${currentUser.username}`);
                const json = await response.json();
                setBlogs(json);
                setBlogsLoaded(true);
            } catch (error) {
                console.error("Error fetching blogs");
                setBlogsLoaded(true);
            }
            
        }
        fetchBlogs();
    }, [currentUser]);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    const handleCategorySelected = (name) => {
        setMenuOpen(!menuOpen);
        setSelectedBlog(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const blogPost = { title, body, author, date, selectedBlog };

        if (selectedBlog === '') {
            alert("Please choose a blog to post under, or make a new one.");
        } else {
            fetch('http://localhost:8000/api/blogPosts/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogPost)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            navigate('/profile');
        }).catch(error => {
            console.error(error);
            console.log(error);
        })
        }
        
    }

    if(!blogsLoaded) {
        return (<h1>Loading data...</h1>);
    }
    return ( 
        <div className="create-modal">
            <h2>Make a new post</h2>
            { selectedBlog ? (
                <button className="dropdown-button" onClick={handleMenuOpen}>{selectedBlog}</button>
            ) : <button className="dropdown-button" onClick={handleMenuOpen}>Your Blogs</button> }
            <div className="dropdown">
                { menuOpen ? (
                    <ul className="menu">
                        { blogs.map((selectedBlog, index) => (
                            <li className="menu-item" key={index}>
                                <button onClick={() => handleCategorySelected(selectedBlog.title)}>{selectedBlog.title}</button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <form onSubmit={handleSubmit}>
                <label className="form-label">Title:</label>
                <input className="form-control" type="text" required value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label className="form-label">Body:</label>
                <textarea className="form-control" required name="body-text" id="body-text" cols="30" rows="6" onChange={(e) => setBody(e.target.value)}></textarea>
                { !isPending && <button className="post-button" type="submit" >Post</button> }
                { isPending && <button disabled type="submit" >Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default CreatePost;