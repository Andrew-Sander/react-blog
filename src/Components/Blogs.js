//import { useState, useEffect } from "react";
import useFetch from "../useFetch";

export default function Blogs({ user }) {
    const apiUrl = user ? `http://localhost:8000/api/blogs/me/${user.username}` : 'http://localhost:8000/api/blogs/';

    const { data: blogs, isPending, error } = useFetch(apiUrl);

    return (
        <div className="blog-list">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div>}
            { blogs && (
                <div>
                    { blogs.map((blog, index) => (
                    <div className="blog-preview" key={index}>
                        <p>{blog.category}</p>
                        <h2>{blog.title}</h2>
                        <article>{blog.details}</article>
                        <p>By {blog.author}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
    )
}