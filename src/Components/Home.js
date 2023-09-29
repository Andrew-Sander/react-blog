import BlogList from "./BlogList";
import Blogs from "./Blogs";
import useFetch from "../useFetch";

const Home = () => {
    const { data:blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
    return ( 
        <div className="home">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All blogs" />}
            {/* {blogs && <BlogList blogs={blogs.filter((blog) => blog.author === 'andy')} title="Andy's blogs" />} */}
            <Blogs />
        </div>
     );
}
 
export default Home;