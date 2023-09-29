import { useState, useEffect } from "react";

export default function Blogs() {
    const [blogPosts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/blogPosts/');
            const json = await response.json();
            setPosts(json);
        }
        fetchData();
    }, []);

    return (
        <div className="blog-list">
            <h1>header</h1>
            <ul>
                { blogPosts.map((blogPost, index) => (
                    <div className="blog-preview" key={index}>
                        <h2>{blogPost.title}</h2>
                        <article>{blogPost.body}</article>
                        <p>By {blogPost.author}</p>
                    </div>
                ))}
            </ul>
        </div>
    )
}