import useFetch from "../useFetch";
import { Link, useParams } from 'react-router-dom';

const CategoriesPage = () => {

    const { category } = useParams();
    const { data:blogs, isPending, error } = useFetch('https://lords-of-blogtown.onrender.com/api/blogs/category/' + category);

    return ( 
        <div>
            <h1 className="d-inline-block">{category} Blogs</h1><Link className="float-end" to={'/'}><button>Back Home</button></Link> 
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
                    { blogs && blogs.length === 0 && (
                        <div>No blogs in this category yet...</div>
                    )}
                </div>
        </div>
     );
}
 
export default CategoriesPage;