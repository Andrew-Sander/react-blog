import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import useCurrentUser from "../useCurrentUser";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const BlogDetails = () => {
    const { id } = useParams();
    const currentUser = useCurrentUser();
    const [currentUsername, setCurrentUsername] = useState('');

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const { data: posts, error, isPending } = useFetch('https://lords-of-blogtown.onrender.com/api/blogPosts/' + id);
    const { data: blog, blogError, blogIsPending } = useFetch('https://lords-of-blogtown.onrender.com/api/blogs/id/' + id);
    const [newPosts, setNewPosts] = useState ([]);
    const [selectedPostID, setSelectedPostID] = useState(0);

    useEffect(() => {
        posts && (setNewPosts(posts))
    }, [posts]);

    const onDelete = (deletedPost) => {
        setNewPosts(newPosts.filter(post => post.postID !== deletedPost.postID));
    }

    useEffect(() => {
        if (currentUser) {
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser])

    const showModalDelete = (id) => {
        setSelectedPostID(id);
        setIsOpenDelete(true);
    };

    const hideModalDelete = () => {
        setIsOpenDelete(false);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://lords-of-blogtown.onrender.com:8000/api/blogPosts/post/${selectedPostID}`);
            const postToDelete = await response.json();
    
            console.log("Deleting post:", postToDelete);
            
            const deleteResponse = await fetch('https://lords-of-blogtown.onrender.com:8000/api/blogPosts/delete', {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postToDelete)
            });
    
            if (!deleteResponse.ok) {
                throw new Error("Network response not okay");
            }
    
            onDelete(postToDelete);
            hideModalDelete();
            console.log('Blog deleted successfully');
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };
    

    return ( 
        <div>
            <div>
                { blogIsPending && <div>Loading...</div> }
                { blogError && <div>{ blogError }</div>}
                { blog && (
                    <div className="details">
                        { blog.map((blog, index) => (
                            <div key={index}>
                                {currentUsername === blog.author && (
                                    <div>
                                        <h3 className="d-inline-block me-3 mt-3">You own this blog</h3>
                                        <Link to={'/profile'}><strong>Edit or Make a Post</strong></Link> 
                                    </div>
                                )}
                                <div className="blogdetails-header">
                                    <h5 className="category"><Link to={`/categories/${blog.category}`}>{blog.category}</Link></h5>
                                    <h1>{blog.title}</h1>
                                    <p>By <Link to={`/publicprofile/${blog.author}`}>{blog.author}</Link> </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )} 
            </div>
            
            <div className="row">
                <div className="blog-details col-8">
                    { isPending && <div>Loading...</div> }
                    { error && <div>{ error }</div>}
                    { newPosts && newPosts.length > 0 ? (
                        <div>
                            { newPosts.map((post, index) => (
                                <div id={`${post.title}`} className="blogpost-preview" key={index}>
                                    <h2>{post.title}</h2>
                                    <article>{post.body}</article>
                                    <p>Posted {post.date}</p>
                                    {currentUsername === post.author && (
                                        <button onClick={() => showModalDelete(post.postID)}  className="delete-button">Delete Post</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : <p>This blog doesn't have any posts yet!</p>}
                </div>
                <div className="blog-details col-sm-4">
                    { blog && (
                        <div>
                            { blog.map((blog, index) => (
                                <div key={index}>
                                    <div  className="blogpost-preview">
                                        <h2>About:</h2>
                                        <article>{blog.description}</article>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{border: '1px solid #45C4B0'}} className="categories-box">
                        <h2>Posts:</h2>
                        <ul>
                            {newPosts && (
                                newPosts.map((post, index) => (
                                    <li key={index}>
                                        <a href={`#${post.title}`}>{post.title}</a>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal show={isOpenDelete} onHide={hideModalDelete}>
                <Modal.Body style={{border:"2px solid red", borderRadius:"8px"}}>
                    <br />
                    <h2>Are you sure you want to delete this blog?</h2>
                    <p>This is irreversible</p>
                    <br />
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                    <button className="float-end" onClick={hideModalDelete}>Cancel</button>
                </Modal.Body>
            </Modal>
        </div>
    );
}
 
export default BlogDetails;