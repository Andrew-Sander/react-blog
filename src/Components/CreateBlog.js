import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../useCurrentUser";

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const currentUser = useCurrentUser();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('https://lords-of-blogtown.onrender.com:8000/api/blogs/categories');
            const json = await response.json();
            setCategories(json);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if(currentUser && currentUser.username) {
            setAuthor(currentUser.username)
        }
    }, [currentUser]);

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    }

    const handleCategorySelected = (name) => {
        setMenuOpen(!menuOpen);
        setCategory(name);
    }
    const [categoryValidation, setCategoryValidation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const blog = { title, description, author, category };
        if (category === '') {
            setCategoryValidation('please choose a category');
            return;
        } else {
            fetch('https://lords-of-blogtown.onrender.com:8000/api/blogs/create', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
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

    return ( 
        <div className="create-blog">
            <h2>Start a blog</h2>
            { category ? (
                <button className="dropdown-button" onClick={handleMenuOpen}>{category} <i className="bi bi-caret-down-fill float-end"></i></button>
            ) : <button className="dropdown-button" onClick={handleMenuOpen}>Categories <i className="bi bi-caret-down-fill float-end"></i></button> }
            <div className="dropdown">
                { menuOpen ? (
                    <ul className="menu">
                        { categories.map((category1, index) => (
                            <li className="menu-item" key={index}>
                                <button onClick={() => handleCategorySelected(category1.name)}>{category1.name}</button>
                            </li>
                        ))}
                    </ul>
                ) : null}
            </div>
            <form onSubmit={handleSubmit}>
                <p className="category-validation">{categoryValidation}</p>
                <label className="form-label">Title:</label>
                <input className="form-control" type="text" required value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label className="form-label">Description:</label>
                <textarea className="form-control" required name="description-text" id="body-text" cols="30" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
                <br />
                { !isPending && <button className="post-button" type="submit" >Create</button> }
                { isPending && <button disabled type="submit" >Adding blog...</button> }
            </form>
        </div>
    );
}
 
export default CreateBlog;