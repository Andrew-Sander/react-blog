import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import { Link } from 'react-router-dom';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: posts, error, isPending } = useFetch('http://localhost:8000/api/blogPosts/' + id);
    const { data: blog, blogError, blogIsPending } = useFetch('http://localhost:8000/api/blogs/id/' + id);
    const navigate = useNavigate();

    // if (posts === 0) {
    //     return <p>This blog doesn't have any posts yet!</p>
    // }
    console.log(posts);
    return ( 
        <div>
            <div>
                { blogIsPending && <div>Loading...</div> }
                { blogError && <div>{ blogError }</div>}
                { blog && (
                    <div>
                        { blog.map((blog, index) => (
                            <div key={index}>
                                <div className="blogpost-preview">
                                    <h5 className="category">{blog.category}</h5>
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
                    { posts && posts.length > 0 ? (
                        <div>
                            { posts.map((post, index) => (
                            <div id={`${post.title}`} className="blogpost-preview" key={index}>
                                <h2>{post.title}</h2>
                                <article>{post.body}</article>
                                <p>Posted {post.date}</p>
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
                                        <h2>About this blog</h2>
                                        <article>{blog.description}</article>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="blogpost-preview">
                        <h2>Posts</h2>
                        <ul>
                            {posts && (
                                posts.map((post, index) => (
                                    <li key={index}>
                                        <a href={`#${post.title}`}>{post.title}</a>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default BlogDetails;