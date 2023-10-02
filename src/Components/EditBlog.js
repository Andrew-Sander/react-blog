import { useState, useEffect } from "react";
import useCurrentUser from "../useCurrentUser";
import useFetch from "../useFetch";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal } from "react-bootstrap";

const EditBlog = ({ id, onEdit, onDelete, hideModalEdit }) => {

    const { data: blog, blogError, blogIsPending } = useFetch('http://localhost:8000/api/blogs/id/' + id);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);

    const currentUser = useCurrentUser();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const [menuOpen, setMenuOpen] = useState(false);

    const [isOpenDelete, setIsOpenDelete] = useState(false);
    
    useEffect(() => {
        if (blog && blog.length > 0) {
            const firstBlog = blog[0];
            setTitle(firstBlog.title);
            setAuthor(firstBlog.author);
            setDescription(firstBlog.description);
            setCategory(firstBlog.category);
        }
    }, [blog]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('http://localhost:8000/api/blogs/categories');
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const blog = { id, title, description, author, category };
        if (category === '') {
            alert("Please choose a category");
        } else {
            fetch('http://localhost:8000/api/blogs/edit', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
            }).then(response => {
                if (!response.ok) {
                    throw new Error("Network response not okay");
                }
            }).then(() => {
                console.log('blog edited');
                setIsPending(false);
                hideModalEdit();
            }).catch(error => {
                console.error(error);
                console.log(error);
            })
        }
        onEdit(blog);
    }

    const handleDelete = () => {
        const blog = { id, title, description, author, category };

        fetch('http://localhost:8000/api/blogs/delete', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        }).then(() => {
            console.log('blog deleted');
            setIsPending(false);
            hideModalEdit();
        }).catch(error => {
            console.error(error);
            console.log(error);
        })
        onDelete(blog);
    }

    const showModalDelete = () => {
        setIsOpenDelete(true);
    };

    const hideModalDelete = () => {
        setIsOpenDelete(false);
    };

    return ( 
        <div className="create-modal">
            <h2>Edit blog</h2>
            { category ? (
                <button className="dropdown-button" onClick={handleMenuOpen}>{category}  <i className="bi bi-caret-down-fill float-end"></i> </button>
            ) : <button className="dropdown-button" onClick={handleMenuOpen}>Categories  <i className="bi bi-caret-down-fill float-end"></i></button> }
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
                {blogIsPending && (
                    <p>Loading data..</p>
                )}
                {blog && (
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Title:</label>
                        <input className="form-control" type="text" required value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                        <br />
                        <label className="form-label">Description:</label>
                        <textarea className="form-control" required name="description-text" id="body-text" cols="30" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        <br />
                        { !isPending && <button className="post-button" type="submit" >Save</button> }
                        { isPending && <button disabled type="submit" >Editing blog...</button> }
                    </form>
                )}
                <button className="delete-button" onClick={showModalDelete}>Delete Blog</button>
                <button className="float-end" onClick={hideModalEdit}>Cancel</button>
                <Modal show={isOpenDelete} onHide={hideModalDelete}>
                    <Modal.Header>
                        <h2>Are you sure you want to delete this blog?</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <br />
                        <p>This is irreversible</p>
                        <br />
                        <br />
                        <button className="delete-button" onClick={handleDelete}>Delete</button>
                        <button className="float-end" onClick={hideModalDelete}>Cancel</button>
                    </Modal.Body>
                </Modal>
                
        </div>
    );
}
 
export default EditBlog;