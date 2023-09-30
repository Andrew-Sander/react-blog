import useFetch from "../useFetch";
import { Link } from 'react-router-dom';

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
        </div>
    )
}