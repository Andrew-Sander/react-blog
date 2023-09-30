import Blogs from "./Blogs";

const Home = () => {
    // const { data:blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
    return ( 
        <div className="home">
            <h2>All Blogs</h2>
            <Blogs />
        </div>
     );
}
 
export default Home;