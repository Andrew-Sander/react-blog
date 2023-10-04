import { useEffect, useState } from "react";
import useFetch from "../useFetch";
import { Link } from 'react-router-dom';
import EditBlog from "./EditBlog";
import CreatePost from "./CreatePost";
import { Modal } from "react-bootstrap";

export default function Blogs({ user }) {
    const apiUrl = user ? `https://lords-of-blogtown.onrender.com:10000/api/blogs/me/${user.username}` : `https://lords-of-blogtown.onrender.com:10000/api/blogs/`;

    const { data: blogs, isPending, error } = useFetch(apiUrl);
    const [newBlogs, setNewBlogs] = useState();

    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    
    useEffect (() => {
        blogs && (setNewBlogs(blogs))
    }, [blogs])

    const handleEditBlog = (updatedBlog) => {
        const blogIndex = blogs.findIndex(blog => blog.id === updatedBlog.id)
        const updatedBlogs = [...blogs];
        updatedBlogs[blogIndex] = updatedBlog;
        setNewBlogs(updatedBlogs);
    }

    const onDelete = (deletedBlog) => {
        setNewBlogs(newBlogs.filter(blog => blog.id !== deletedBlog.id));
    }
    

    const showModalCreate = (id) => {
        setSelectedBlogId(id);
        setIsOpenCreate(true);
    };

    const hideModalCreate = () => {
        setIsOpenCreate(false);
    };

    const showModalEdit = (id) => {
        setSelectedBlogId(id);
        setIsOpenEdit(true);
    };

    const hideModalEdit = () => {
        setIsOpenEdit(false);
    };

    return (
        <div className="blog-list">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { newBlogs && user ? (
                <div>
                    { newBlogs.map((blog, index) => (
                        <div className="blog-preview" key={index}>
                            <Link to={`/blogs/${blog.id}`}>
                                <p>{blog.category}</p>
                                <h2>{blog.title}</h2>
                                <article>{blog.description}</article>
                            </Link>
                            <button onClick={() => showModalEdit(blog.id)}>Edit Blog</button>
                            <button style={{marginLeft: "10px"}} onClick={() => showModalCreate(blog.id)}>Add a post</button>
                        </div>
                    ))}
                </div>
            ) : newBlogs && (
                <div>
                    { newBlogs.map((blog, index) => (
                        <div className="blog-preview" key={index}>
                            <Link to={`/blogs/${blog.id}`}>
                                <p>{blog.category}</p>
                                <h2>{blog.title}</h2>
                                <article>{blog.description}</article>
                            </Link>
                            <p>By <Link className="author" to={`/publicprofile/${blog.author}`}>{blog.author}</Link></p>
                        </div>
                    ))}
                </div>
            )}
            <Modal show={isOpenEdit} onHide={hideModalEdit}>
                <Modal.Body>
                    <EditBlog id={selectedBlogId} onEdit={handleEditBlog} hideModalEdit={hideModalEdit} onDelete={onDelete}/>
                </Modal.Body>
            </Modal>
            <Modal show={isOpenCreate} onHide={hideModalCreate}>
                <Modal.Body>
                    <CreatePost id={selectedBlogId} hideModal={hideModalCreate} />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={hideModalCreate}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}