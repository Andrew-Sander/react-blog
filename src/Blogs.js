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
        <div>
            <h1>header</h1>
            <ul>
                { blogPosts.map((blogPost, index) => (
                    <li key={index}>
                        <div>{blogPost.title}</div>
                        <div>{blogPost.body}</div>
                        <div>{blogPost.author}</div>
                    </li>
                ))}
            </ul>
        </div>
        
    )
}