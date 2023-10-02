import Blogs from "./Blogs";
import Categories from "./Categories";

const Home = () => {
    // const { data:blogs, isPending, error} = useFetch('http://localhost:8000/blogs');
    return ( 
        <div className="home">
            <h2>All Blogs</h2>
            <div className="row">
                <div className="col-md-7">
                    <Blogs />
                </div>
                <div className="col-md-5">
                    <Categories />
                </div>
            </div>
        </div>
     );
}
 
export default Home;