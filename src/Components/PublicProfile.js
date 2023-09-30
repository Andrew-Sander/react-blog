import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const PublicProfile = () => {
    const { username } = useParams();
    const { data: blogs, error, isPending } = useFetch('http://localhost:8000/api/blogs/postsby/' + username);
    const navigate = useNavigate();

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
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default PublicProfile;