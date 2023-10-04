import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const PublicProfile = () => {
    const { username } = useParams();
    const { data: blogs, error, isPending } = useFetch('https://lords-of-blogtown.onrender.com:8000/api/blogs/postsby/' + username);
    const { data: users, userError, userIsPending } = useFetch('https://lords-of-blogtown.onrender.com:8000/api/users/username/' + username);

    return ( 
        <div>
            <div className="row">
                <h2>{username}'s blogs</h2>
                <div className="col-7">
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
                <div className="col-5">
                    { userIsPending && <div>Loading...</div> }
                    { userError && <div>{ userError }</div>}
                    <div style={{border: '1px solid #45C4B0'}} className="categories-box">
                        <h3>About {username}</h3>
                        { users && (
                            <article>{users.about}</article>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PublicProfile;