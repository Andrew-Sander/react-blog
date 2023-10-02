import useFetch from "../useFetch";
import { Link } from 'react-router-dom';

const Categories = () => {

    const { data: categories, isPending, error } = useFetch('http://localhost:8000/api/blogs/categories');

    return ( 
        <div className="categories-box">
            <h3>Browse by Category</h3>
            { isPending && ( <div>Loading categories...</div> )}
            { error && ( <div>{ error }</div> )}
            <ul>
                { categories && (
                    categories.map((category, index) => (
                        <li className="my-2" key={index}>
                            <Link to={`/categories/${category.name}`}>{category.name}</Link>
                        </li>
                    ))
                )}
            </ul>
            
        </div>
    );
}
 
export default Categories;